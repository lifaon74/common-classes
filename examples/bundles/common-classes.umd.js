(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('common-classes', ['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['common-classes'] = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    /** PRIVATE CONTEXT **/
    var COLOR_PRIVATE_CONTEXT = Symbol('color-private-context');

    function GetOptionalOwnPropertyDescriptor(target, propertyKey) {
        return Object.getOwnPropertyDescriptor(target, propertyKey);
    }

    function DefineProperty(target, propertyKey, descriptor) {
        return Object.defineProperty(target, propertyKey, descriptor);
    }

    function CreatePrivateContext(_symbol, target, context) {
        DefineProperty(target, _symbol, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: context,
        });
        return context;
    }

    function GetOwnPropertySymbol(target) {
        return Object.getOwnPropertySymbols(target);
    }

    function GetOwnPropertyNames(target) {
        return Object.getOwnPropertyNames(target);
    }

    function GetOwnPropertyKeys(target) {
        return GetOwnPropertyNames(target)
            .concat(GetOwnPropertySymbol(target));
    }

    function* GetOwnPropertyDescriptors(target) {
        const keys = GetOwnPropertyKeys(target);
        for (let i = 0, l = keys.length; i < l; i++) {
            const key = keys[i];
            yield [key, GetOptionalOwnPropertyDescriptor(target, key), target];
        }
    }

    function GetPrototypeOf(target) {
        return Object.getPrototypeOf(target);
    }

    function HasProperty(target, propertyKey) {
        return propertyKey in target;
    }

    const INTERNAL_PROPERTY_NAME = new Set([
        '__defineGetter__',
        '__defineSetter__',
        '__lookupGetter__',
        '__lookupSetter__',
        '__proto__',
    ]);
    const RESERVED_PROPERTY_NAMES = new Set([
        'prototype',
        'constructor',
    ]);
    function IsReservedPropertyName(name) {
        return RESERVED_PROPERTY_NAMES.has(name)
            || INTERNAL_PROPERTY_NAME.has(name);
    }
    function IsNotReservedPropertyName(name) {
        return !IsReservedPropertyName(name);
    }

    function ExtractTraitOrImplementationOwnMethods(target, errorPrefix) {
        return Object.freeze(Array
            .from(GetOwnPropertyDescriptors(target))
            .filter(([propertyKey]) => IsNotReservedPropertyName(propertyKey))
            .map(([propertyKey, descriptor]) => {
            if (typeof descriptor.value === 'function') {
                return {
                    propertyKey,
                    descriptor,
                };
            }
            else {
                throw new TypeError(`${errorPrefix}: for property '${String(propertyKey)}' - only functions are accepted`);
            }
        }));
    }

    const GET_PROTOTYPE_OF_OBJECT = GetPrototypeOf(Object);
    const TRAITS = new WeakMap();
    function Trait() {
        return (target) => {
            if (typeof target === 'function') {
                if (TRAITS.has(target)) {
                    throw new Error(`@Trait<${target.name}>: already registered as a trait`);
                }
                else {
                    const parent = GetPrototypeOf(target);
                    if ((parent === GET_PROTOTYPE_OF_OBJECT)
                        || (parent === null)
                        || TRAITS.has(parent)) {
                        TRAITS.set(target, Object.freeze({
                            trait: target,
                            ownMethods: ExtractTraitOrImplementationOwnMethods(target.prototype, `@Trait<${target.name}>:`),
                            parent: TRAITS.get(parent),
                        }));
                    }
                    else {
                        throw new Error(`@Trait<${target.name}>: provided trait (class) must extends another trait or nothing`);
                    }
                }
            }
            else {
                throw new TypeError(`@Trait: expects a class`);
            }
        };
    }

    const IMPLEMENTATIONS = new WeakMap();
    function Impl() {
        return (target) => {
            if (typeof target === 'function') {
                if (IMPLEMENTATIONS.has(target)) {
                    throw new Error(`@Impl<${target.name}>: already registered as an implementation`);
                }
                else {
                    const trait = GetPrototypeOf(target);
                    if (TRAITS.has(trait)) {
                        IMPLEMENTATIONS.set(target, Object.freeze({
                            implementation: target,
                            ownMethods: ExtractTraitOrImplementationOwnMethods(target.prototype, `@Impl<${target.name}>:`),
                            forTrait: TRAITS.get(trait),
                        }));
                    }
                    else {
                        throw new Error(`@Impl<${target.name}>: the implementation is not extending a trait`);
                    }
                }
            }
            else {
                throw new TypeError(`@Impl: expects a class`);
            }
        };
    }

    function ImplementMethod(target, method, implementedProperties) {
        const propertyKey = method.propertyKey;
        if (!implementedProperties.has(propertyKey)) {
            if (HasProperty(target, propertyKey)
                && (target[propertyKey] !== Object.prototype[propertyKey])) {
                throw new Error(`The property '${String(propertyKey)}' is already defined`);
            }
            else {
                DefineProperty(target, propertyKey, method.descriptor);
                implementedProperties.add(propertyKey);
            }
        }
    }
    function ImplementTrait(target, trait, implementedProperties) {
        while (trait !== void 0) {
            const ownMethods = trait.ownMethods;
            for (let i = 0, l = ownMethods.length; i < l; i++) {
                ImplementMethod(target, ownMethods[i], implementedProperties);
            }
            trait = trait.parent;
        }
    }
    function ImplementTraitImplementationOwnMethods(target, traitImplementation, implementedProperties) {
        const ownMethods = traitImplementation.ownMethods;
        for (let i = 0, l = ownMethods.length; i < l; i++) {
            ImplementMethod(target, ownMethods[i], implementedProperties);
        }
    }
    function ImplementTraitImplementationMethods(target, traitImplementation) {
        const implementedProperties = new Set();
        ImplementTraitImplementationOwnMethods(target, traitImplementation, implementedProperties);
        ImplementTrait(target, traitImplementation.forTrait, implementedProperties);
    }
    const ANY_TO_IMPLEMENTATIONS_MAP = new WeakMap();
    function ImplementTraitImplementation(target, traitImplementation) {
        let implemented;
        if (ANY_TO_IMPLEMENTATIONS_MAP.has(target)) {
            implemented = ANY_TO_IMPLEMENTATIONS_MAP.get(target);
        }
        else {
            implemented = new Set();
            ANY_TO_IMPLEMENTATIONS_MAP.set(target, implemented);
        }
        if (implemented.has(traitImplementation)) {
            throw new Error(`Implementation already applied for this target`);
        }
        else {
            ImplementTraitImplementationMethods(target, traitImplementation);
            implemented.add(traitImplementation);
        }
    }
    function GenerateNotAndImplementationErrorMessage(traitImplementation) {
        return `'${traitImplementation.name}' is not an implementation. Did you forgot the decorator @Impl() ?`;
    }
    function GetImplementationDetailsOrThrow(traitImplementation) {
        if (IMPLEMENTATIONS.has(traitImplementation)) {
            return IMPLEMENTATIONS.get(traitImplementation);
        }
        else {
            throw new Error(GenerateNotAndImplementationErrorMessage(traitImplementation));
        }
    }
    function ApplyTraitImplementation(target, traitImplementation) {
        ImplementTraitImplementation(target, GetImplementationDetailsOrThrow(traitImplementation));
    }

    function AssembleTraitImplementations(traitImplementationsForPrototype, traitImplementationsForStaticClass = [], baseClass) {
        const _class = (baseClass === void 0)
            ? class Impl {
            }
            : class Impl extends baseClass {
            };
        for (let i = 0, l = traitImplementationsForPrototype.length; i < l; i++) {
            ApplyTraitImplementation(_class.prototype, traitImplementationsForPrototype[i]);
        }
        for (let i = 0, l = traitImplementationsForStaticClass.length; i < l; i++) {
            ApplyTraitImplementation(_class, traitImplementationsForStaticClass[i]);
        }
        return _class;
    }

    let TraitActivate = class TraitActivate {
    };
    TraitActivate = __decorate([
        Trait()
    ], TraitActivate);

    let TraitDeactivate = class TraitDeactivate {
    };
    TraitDeactivate = __decorate([
        Trait()
    ], TraitDeactivate);

    let TraitIsActivated = class TraitIsActivated {
    };
    TraitIsActivated = __decorate([
        Trait()
    ], TraitIsActivated);

    let TraitToggle = class TraitToggle {
    };
    TraitToggle = __decorate([
        Trait()
    ], TraitToggle);

    let TraitToggleUsingActivateAndDeactivate = class TraitToggleUsingActivateAndDeactivate extends TraitToggle {
        toggle(activate = !this.isActivated()) {
            if (activate) {
                return this.activate();
            }
            else {
                return this.deactivate();
            }
        }
    };
    TraitToggleUsingActivateAndDeactivate = __decorate([
        Trait()
    ], TraitToggleUsingActivateAndDeactivate);

    let TraitSqrt = class TraitSqrt {
    };
    TraitSqrt = __decorate([
        Trait()
    ], TraitSqrt);

    let TraitAdd = class TraitAdd {
    };
    TraitAdd = __decorate([
        Trait()
    ], TraitAdd);

    let TraitDivide = class TraitDivide {
    };
    TraitDivide = __decorate([
        Trait()
    ], TraitDivide);

    let TraitMultiply = class TraitMultiply {
    };
    TraitMultiply = __decorate([
        Trait()
    ], TraitMultiply);

    let TraitNegate = class TraitNegate {
    };
    TraitNegate = __decorate([
        Trait()
    ], TraitNegate);

    let TraitSubtract = class TraitSubtract {
    };
    TraitSubtract = __decorate([
        Trait()
    ], TraitSubtract);

    let TraitSubtractUsingAddAndNegate = class TraitSubtractUsingAddAndNegate extends TraitSubtract {
        subtract(value) {
            return this.add(value.negate());
        }
    };
    TraitSubtractUsingAddAndNegate = __decorate([
        Trait()
    ], TraitSubtractUsingAddAndNegate);

    var Ordering;
    (function (Ordering) {
        Ordering[Ordering["Less"] = -1] = "Less";
        Ordering[Ordering["Equal"] = 0] = "Equal";
        Ordering[Ordering["Greater"] = 1] = "Greater";
    })(Ordering || (Ordering = {}));

    let TraitCompare = class TraitCompare {
    };
    TraitCompare = __decorate([
        Trait()
    ], TraitCompare);

    let TraitEquals = class TraitEquals {
    };
    TraitEquals = __decorate([
        Trait()
    ], TraitEquals);

    let TraitEqualsUsingCompare = class TraitEqualsUsingCompare extends TraitEquals {
        compare(value) {
            return this.compare(value) === 0;
        }
    };
    TraitEqualsUsingCompare = __decorate([
        Trait()
    ], TraitEqualsUsingCompare);

    let TraitNotEquals = class TraitNotEquals {
    };
    TraitNotEquals = __decorate([
        Trait()
    ], TraitNotEquals);

    let TraitNotEqualsUsingEquals = class TraitNotEqualsUsingEquals extends TraitNotEquals {
        notEquals(value) {
            return !this.equals(value);
        }
    };
    TraitNotEqualsUsingEquals = __decorate([
        Trait()
    ], TraitNotEqualsUsingEquals);

    function EventListenerAwaitUntilNotDispatching(eventListener, onNotDispatching) {
        if (eventListener.isDispatching()) {
            setImmediate(() => EventListenerAwaitUntilNotDispatching(eventListener, onNotDispatching));
        }
        else {
            onNotDispatching();
        }
    }
    function EventListenerAwaitUntilNotDispatchingWithPromise(eventListener, onNotDispatching) {
        return new Promise((resolve, reject) => {
            EventListenerAwaitUntilNotDispatching(eventListener, () => {
                try {
                    resolve(onNotDispatching());
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }

    let TraitEventListenerDispatchQueued = class TraitEventListenerDispatchQueued {
    };
    TraitEventListenerDispatchQueued = __decorate([
        Trait()
    ], TraitEventListenerDispatchQueued);

    let TraitEventListenerDispatchQueuedEmulated = class TraitEventListenerDispatchQueuedEmulated extends TraitEventListenerDispatchQueued {
        dispatchQueued(key, value) {
            return EventListenerAwaitUntilNotDispatchingWithPromise(this, () => {
                this.dispatch(key, value);
            });
        }
    };
    TraitEventListenerDispatchQueuedEmulated = __decorate([
        Trait()
    ], TraitEventListenerDispatchQueuedEmulated);

    function QueueAsPromise(target, callback) {
        return new Promise((resolve, reject) => {
            target.queue(() => {
                try {
                    resolve(callback());
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }

    let TraitEventListenerDispatchQueuedUsingDispatchAndQueue = class TraitEventListenerDispatchQueuedUsingDispatchAndQueue extends TraitEventListenerDispatchQueued {
        dispatchQueued(key, value) {
            return QueueAsPromise(this, () => {
                this.dispatch(key, value);
            });
        }
    };
    TraitEventListenerDispatchQueuedUsingDispatchAndQueue = __decorate([
        Trait()
    ], TraitEventListenerDispatchQueuedUsingDispatchAndQueue);

    let TraitEventListenerDispatch = class TraitEventListenerDispatch {
    };
    TraitEventListenerDispatch = __decorate([
        Trait()
    ], TraitEventListenerDispatch);

    let TraitEventListenerIsDispatching = class TraitEventListenerIsDispatching {
    };
    TraitEventListenerIsDispatching = __decorate([
        Trait()
    ], TraitEventListenerIsDispatching);

    let TraitEventListenerOnQueued = class TraitEventListenerOnQueued {
    };
    TraitEventListenerOnQueued = __decorate([
        Trait()
    ], TraitEventListenerOnQueued);

    function EventListenerOnWithEmulatedQueuedUnsubscribe(target, key, callback) {
        let unsubscribePromise;
        const unsubscribe = target.on(key, (value) => {
            if (unsubscribePromise === void 0) {
                callback(value);
            }
        });
        return () => {
            if (unsubscribePromise === void 0) {
                unsubscribePromise = EventListenerAwaitUntilNotDispatchingWithPromise(target, unsubscribe);
            }
            return unsubscribePromise;
        };
    }

    let TraitEventListenerOnQueuedEmulated = class TraitEventListenerOnQueuedEmulated extends TraitEventListenerOnQueued {
        onQueued(key, callback) {
            return EventListenerAwaitUntilNotDispatchingWithPromise(this, () => {
                return EventListenerOnWithEmulatedQueuedUnsubscribe(this, key, callback);
            });
        }
    };
    TraitEventListenerOnQueuedEmulated = __decorate([
        Trait()
    ], TraitEventListenerOnQueuedEmulated);

    function EventListenerOnWithQueuedUnsubscribe(target, key, callback) {
        let unsubscribePromise;
        const unsubscribe = target.on(key, (value) => {
            if (unsubscribePromise === void 0) {
                callback(value);
            }
        });
        return () => {
            if (unsubscribePromise === void 0) {
                unsubscribePromise = QueueAsPromise(target, unsubscribe);
            }
            return unsubscribePromise;
        };
    }

    let TraitEventListenerOnQueuedUsingOnAndQueue = class TraitEventListenerOnQueuedUsingOnAndQueue {
        onQueued(key, callback) {
            return QueueAsPromise(this, () => {
                return EventListenerOnWithQueuedUnsubscribe(this, key, callback);
            });
        }
    };
    TraitEventListenerOnQueuedUsingOnAndQueue = __decorate([
        Trait()
    ], TraitEventListenerOnQueuedUsingOnAndQueue);

    let TraitEventListenerOn = class TraitEventListenerOn {
    };
    TraitEventListenerOn = __decorate([
        Trait()
    ], TraitEventListenerOn);

    let TraitEventListenerOnceQueued = class TraitEventListenerOnceQueued {
    };
    TraitEventListenerOnceQueued = __decorate([
        Trait()
    ], TraitEventListenerOnceQueued);

    function EventListenerOnceWithEmulatedQueuedUnsubscribe(target, key, callback) {
        let unsubscribePromise;
        const unsubscribe = target.on(key, (value) => {
            if (unsubscribePromise === void 0) {
                unsubscribeQueued();
                callback(value);
            }
        });
        const unsubscribeQueued = () => {
            if (unsubscribePromise === void 0) {
                unsubscribePromise = EventListenerAwaitUntilNotDispatchingWithPromise(target, unsubscribe);
            }
            return unsubscribePromise;
        };
        return unsubscribeQueued;
    }

    let TraitEventListenerOnceQueuedEmulated = class TraitEventListenerOnceQueuedEmulated extends TraitEventListenerOnceQueued {
        onceQueued(key, callback) {
            return EventListenerAwaitUntilNotDispatchingWithPromise(this, () => {
                return EventListenerOnceWithEmulatedQueuedUnsubscribe(this, key, callback);
            });
        }
    };
    TraitEventListenerOnceQueuedEmulated = __decorate([
        Trait()
    ], TraitEventListenerOnceQueuedEmulated);

    function EventListenerOnceWithQueuedUnsubscribe(target, key, callback) {
        let unsubscribePromise;
        const unsubscribe = target.on(key, (value) => {
            if (unsubscribePromise === void 0) {
                unsubscribeQueued();
                callback(value);
            }
        });
        const unsubscribeQueued = () => {
            if (unsubscribePromise === void 0) {
                unsubscribePromise = QueueAsPromise(target, unsubscribe);
            }
            return unsubscribePromise;
        };
        return unsubscribeQueued;
    }

    let TraitEventListenerOnceQueuedUsingOnAndQueue = class TraitEventListenerOnceQueuedUsingOnAndQueue {
        onceQueued(key, callback) {
            return QueueAsPromise(this, () => {
                return EventListenerOnceWithQueuedUnsubscribe(this, key, callback);
            });
        }
    };
    TraitEventListenerOnceQueuedUsingOnAndQueue = __decorate([
        Trait()
    ], TraitEventListenerOnceQueuedUsingOnAndQueue);

    let TraitEventListenerOnce = class TraitEventListenerOnce {
    };
    TraitEventListenerOnce = __decorate([
        Trait()
    ], TraitEventListenerOnce);

    let TraitEventListenerOnceUsingOn = class TraitEventListenerOnceUsingOn extends TraitEventListenerOnce {
        once(key, callback) {
            const unsubscribe = this.on(key, (value) => {
                unsubscribe();
                callback(value);
            });
            return unsubscribe;
        }
    };
    TraitEventListenerOnceUsingOn = __decorate([
        Trait()
    ], TraitEventListenerOnceUsingOn);

    let TraitIterable = class TraitIterable {
    };
    TraitIterable = __decorate([
        Trait()
    ], TraitIterable);

    let TraitIteratorAsIndexedPair = class TraitIteratorAsIndexedPair {
    };
    TraitIteratorAsIndexedPair = __decorate([
        Trait()
    ], TraitIteratorAsIndexedPair);

    let TraitIteratorDrop = class TraitIteratorDrop {
    };
    TraitIteratorDrop = __decorate([
        Trait()
    ], TraitIteratorDrop);

    let TraitIteratorFilter = class TraitIteratorFilter {
    };
    TraitIteratorFilter = __decorate([
        Trait()
    ], TraitIteratorFilter);

    let TraitIteratorMap = class TraitIteratorMap {
    };
    TraitIteratorMap = __decorate([
        Trait()
    ], TraitIteratorMap);

    let TraitIteratorNext = class TraitIteratorNext {
    };
    TraitIteratorNext = __decorate([
        Trait()
    ], TraitIteratorNext);

    const ALLOC = Symbol('alloc');
    let TraitAlloc = class TraitAlloc {
    };
    TraitAlloc = __decorate([
        Trait()
    ], TraitAlloc);

    let TraitAs = class TraitAs {
        as(castTo) {
            return castTo(this);
        }
    };
    TraitAs = __decorate([
        Trait()
    ], TraitAs);

    let TraitToString = class TraitToString {
    };
    TraitToString = __decorate([
        Trait()
    ], TraitToString);

    let TraitQueue = class TraitQueue {
    };
    TraitQueue = __decorate([
        Trait()
    ], TraitQueue);

    function QueueToPromise(target) {
        return new Promise((resolve) => {
            target.queue(resolve);
        });
    }

    let TraitGetQueue = class TraitGetQueue {
    };
    TraitGetQueue = __decorate([
        Trait()
    ], TraitGetQueue);

    let TraitGetQueueUsingQueue = class TraitGetQueueUsingQueue extends TraitGetQueue {
        getQueue() {
            return QueueToPromise(this);
        }
    };
    TraitGetQueueUsingQueue = __decorate([
        Trait()
    ], TraitGetQueueUsingQueue);

    let TraitEmit = class TraitEmit {
    };
    TraitEmit = __decorate([
        Trait()
    ], TraitEmit);

    var TraitColorGetRed = /** @class */ (function () {
        function TraitColorGetRed() {
        }
        TraitColorGetRed = __decorate([
            Trait()
        ], TraitColorGetRed);
        return TraitColorGetRed;
    }());
    //# sourceMappingURL=trait-color-get-red.js.map

    var ImplTraitGetRedForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitGetRedForColorStruct, _super);
        function ImplTraitGetRedForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitGetRedForColorStruct.prototype.getRed = function () {
            return this[COLOR_PRIVATE_CONTEXT].r;
        };
        ImplTraitGetRedForColorStruct = __decorate([
            Impl()
        ], ImplTraitGetRedForColorStruct);
        return ImplTraitGetRedForColorStruct;
    }(TraitColorGetRed));
    //# sourceMappingURL=color-struct-get-red-implementation.js.map

    var TraitColorGetAlpha = /** @class */ (function () {
        function TraitColorGetAlpha() {
        }
        TraitColorGetAlpha = __decorate([
            Trait()
        ], TraitColorGetAlpha);
        return TraitColorGetAlpha;
    }());
    //# sourceMappingURL=trait-color-get-alpha.js.map

    var ImplTraitGetAlphaForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitGetAlphaForColorStruct, _super);
        function ImplTraitGetAlphaForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitGetAlphaForColorStruct.prototype.getAlpha = function () {
            return this[COLOR_PRIVATE_CONTEXT].a;
        };
        ImplTraitGetAlphaForColorStruct = __decorate([
            Impl()
        ], ImplTraitGetAlphaForColorStruct);
        return ImplTraitGetAlphaForColorStruct;
    }(TraitColorGetAlpha));
    //# sourceMappingURL=color-struct-get-alpha-implementation.js.map

    var TraitColorGetBlue = /** @class */ (function () {
        function TraitColorGetBlue() {
        }
        TraitColorGetBlue = __decorate([
            Trait()
        ], TraitColorGetBlue);
        return TraitColorGetBlue;
    }());
    //# sourceMappingURL=trait-color-get-blue.js.map

    var ImplTraitGetBlueForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitGetBlueForColorStruct, _super);
        function ImplTraitGetBlueForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitGetBlueForColorStruct.prototype.getBlue = function () {
            return this[COLOR_PRIVATE_CONTEXT].b;
        };
        ImplTraitGetBlueForColorStruct = __decorate([
            Impl()
        ], ImplTraitGetBlueForColorStruct);
        return ImplTraitGetBlueForColorStruct;
    }(TraitColorGetBlue));
    //# sourceMappingURL=color-struct-get-blue-implementation.js.map

    var TraitColorGetGreen = /** @class */ (function () {
        function TraitColorGetGreen() {
        }
        TraitColorGetGreen = __decorate([
            Trait()
        ], TraitColorGetGreen);
        return TraitColorGetGreen;
    }());
    //# sourceMappingURL=trait-color-get-green.js.map

    var ImplTraitGetGreenForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitGetGreenForColorStruct, _super);
        function ImplTraitGetGreenForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitGetGreenForColorStruct.prototype.getGreen = function () {
            return this[COLOR_PRIVATE_CONTEXT].g;
        };
        ImplTraitGetGreenForColorStruct = __decorate([
            Impl()
        ], ImplTraitGetGreenForColorStruct);
        return ImplTraitGetGreenForColorStruct;
    }(TraitColorGetGreen));
    //# sourceMappingURL=color-struct-get-green-implementation.js.map

    var TraitColorSetAlpha = /** @class */ (function () {
        function TraitColorSetAlpha() {
        }
        TraitColorSetAlpha = __decorate([
            Trait()
        ], TraitColorSetAlpha);
        return TraitColorSetAlpha;
    }());
    //# sourceMappingURL=trait-color-set-alpha.js.map

    /**
     * Ensures that value is a number in the range [0, 1]
     */
    function NormalizeColorValue(value, name) {
        if (typeof value === 'number') {
            if ((0 <= value) && (value <= 1)) {
                return value;
            }
            else {
                throw new RangeError("Expected '" + name + "' in the range [0, 1]");
            }
        }
        else {
            throw new TypeError("Expected number as '" + name + "'");
        }
    }

    var ImplTraitSetAlphaForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitSetAlphaForColorStruct, _super);
        function ImplTraitSetAlphaForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitSetAlphaForColorStruct.prototype.setAlpha = function (value) {
            this[COLOR_PRIVATE_CONTEXT].a = NormalizeColorValue(value, 'a');
        };
        ImplTraitSetAlphaForColorStruct = __decorate([
            Impl()
        ], ImplTraitSetAlphaForColorStruct);
        return ImplTraitSetAlphaForColorStruct;
    }(TraitColorSetAlpha));
    //# sourceMappingURL=color-struct-set-alpha-implementation.js.map

    var TraitColorSetBlue = /** @class */ (function () {
        function TraitColorSetBlue() {
        }
        TraitColorSetBlue = __decorate([
            Trait()
        ], TraitColorSetBlue);
        return TraitColorSetBlue;
    }());
    //# sourceMappingURL=trait-color-set-blue.js.map

    var ImplTraitSetBlueForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitSetBlueForColorStruct, _super);
        function ImplTraitSetBlueForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitSetBlueForColorStruct.prototype.setBlue = function (value) {
            this[COLOR_PRIVATE_CONTEXT].b = NormalizeColorValue(value, 'b');
        };
        ImplTraitSetBlueForColorStruct = __decorate([
            Impl()
        ], ImplTraitSetBlueForColorStruct);
        return ImplTraitSetBlueForColorStruct;
    }(TraitColorSetBlue));
    //# sourceMappingURL=color-struct-set-blue-implementation.js.map

    var TraitColorSetGreen = /** @class */ (function () {
        function TraitColorSetGreen() {
        }
        TraitColorSetGreen = __decorate([
            Trait()
        ], TraitColorSetGreen);
        return TraitColorSetGreen;
    }());
    //# sourceMappingURL=trait-color-set-green.js.map

    var ImplTraitSetGreenForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitSetGreenForColorStruct, _super);
        function ImplTraitSetGreenForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitSetGreenForColorStruct.prototype.setGreen = function (value) {
            this[COLOR_PRIVATE_CONTEXT].g = NormalizeColorValue(value, 'g');
        };
        ImplTraitSetGreenForColorStruct = __decorate([
            Impl()
        ], ImplTraitSetGreenForColorStruct);
        return ImplTraitSetGreenForColorStruct;
    }(TraitColorSetGreen));
    //# sourceMappingURL=color-struct-set-green-implementation.js.map

    var TraitColorSetRed = /** @class */ (function () {
        function TraitColorSetRed() {
        }
        TraitColorSetRed = __decorate([
            Trait()
        ], TraitColorSetRed);
        return TraitColorSetRed;
    }());
    //# sourceMappingURL=trait-color-set-red.js.map

    var ImplTraitSetRedForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitSetRedForColorStruct, _super);
        function ImplTraitSetRedForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitSetRedForColorStruct.prototype.setRed = function (value) {
            this[COLOR_PRIVATE_CONTEXT].r = NormalizeColorValue(value, 'r');
        };
        ImplTraitSetRedForColorStruct = __decorate([
            Impl()
        ], ImplTraitSetRedForColorStruct);
        return ImplTraitSetRedForColorStruct;
    }(TraitColorSetRed));
    //# sourceMappingURL=color-struct-set-red-implementation.js.map

    var TraitColorEquals = /** @class */ (function (_super) {
        __extends(TraitColorEquals, _super);
        function TraitColorEquals() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorEquals = __decorate([
            Trait()
        ], TraitColorEquals);
        return TraitColorEquals;
    }(TraitEquals));
    //# sourceMappingURL=trait-color-equals.js.map

    var TraitColorEqualsUsingGetColors = /** @class */ (function (_super) {
        __extends(TraitColorEqualsUsingGetColors, _super);
        function TraitColorEqualsUsingGetColors() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorEqualsUsingGetColors.prototype.equals = function (color) {
            return (this.getRed() === color.getRed())
                && (this.getGreen() === color.getGreen())
                && (this.getBlue() === color.getBlue())
                && (this.getAlpha() === color.getAlpha());
        };
        TraitColorEqualsUsingGetColors = __decorate([
            Trait()
        ], TraitColorEqualsUsingGetColors);
        return TraitColorEqualsUsingGetColors;
    }(TraitColorEquals));
    //# sourceMappingURL=trait-color-equals-using-get-colors.js.map

    var ImplTraitEqualsForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitEqualsForColorStruct, _super);
        function ImplTraitEqualsForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitEqualsForColorStruct = __decorate([
            Impl()
        ], ImplTraitEqualsForColorStruct);
        return ImplTraitEqualsForColorStruct;
    }(TraitColorEqualsUsingGetColors));
    // @Impl()
    // export class ImplTraitEqualsForColorStruct<GSelf extends TGenericColorStruct> extends TraitEquals<GSelf, TGenericColorStruct> {
    //   equals(this: GSelf, color: TGenericColorStruct): boolean {
    //     const contextA: IColorPrivateContext = this[COLOR_PRIVATE_CONTEXT];
    //     const contextB: IColorPrivateContext = color[COLOR_PRIVATE_CONTEXT];
    //
    //     return (contextA.r === contextB.r)
    //       && (contextA.g === contextB.g)
    //       && (contextA.b === contextB.b)
    //       && (contextA.a === contextB.a);
    //   }
    // }
    //# sourceMappingURL=color-struct-equals-implementation.js.map

    var TraitColorToRGB = /** @class */ (function () {
        function TraitColorToRGB() {
        }
        TraitColorToRGB = __decorate([
            Trait()
        ], TraitColorToRGB);
        return TraitColorToRGB;
    }());
    //# sourceMappingURL=trait-color-to-rgb.js.map

    var TraitColorToRGBUsingGetColors = /** @class */ (function (_super) {
        __extends(TraitColorToRGBUsingGetColors, _super);
        function TraitColorToRGBUsingGetColors() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorToRGBUsingGetColors.prototype.toRGB = function (alpha) {
            if (alpha === void 0) { alpha = false; }
            return "rgb" + (alpha ? 'a' : '') + "(" + Math.round(this.getRed() * 255) + ", " + Math.round(this.getGreen() * 255) + ", " + Math.round(this.getBlue() * 255) + (alpha ? (', ' + this.getAlpha()) : '') + ")";
        };
        TraitColorToRGBUsingGetColors = __decorate([
            Trait()
        ], TraitColorToRGBUsingGetColors);
        return TraitColorToRGBUsingGetColors;
    }(TraitColorToRGB));
    //# sourceMappingURL=trait-color-to-rgb-using-get-colors.js.map

    var ImplTraitToRGBForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitToRGBForColorStruct, _super);
        function ImplTraitToRGBForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitToRGBForColorStruct = __decorate([
            Impl()
        ], ImplTraitToRGBForColorStruct);
        return ImplTraitToRGBForColorStruct;
    }(TraitColorToRGBUsingGetColors));
    //# sourceMappingURL=color-struct-to-rgb-implementation.js.map

    var TraitColorToRGBAUsingToRGB = /** @class */ (function () {
        function TraitColorToRGBAUsingToRGB() {
        }
        TraitColorToRGBAUsingToRGB.prototype.toRGBA = function () {
            return this.toRGB(true);
        };
        TraitColorToRGBAUsingToRGB = __decorate([
            Trait()
        ], TraitColorToRGBAUsingToRGB);
        return TraitColorToRGBAUsingToRGB;
    }());
    //# sourceMappingURL=trait-color-to-rgba-using-to-rgb.js.map

    var ImplTraitToRGBAForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitToRGBAForColorStruct, _super);
        function ImplTraitToRGBAForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitToRGBAForColorStruct = __decorate([
            Impl()
        ], ImplTraitToRGBAForColorStruct);
        return ImplTraitToRGBAForColorStruct;
    }(TraitColorToRGBAUsingToRGB));
    //# sourceMappingURL=color-struct-to-rgba-implementation.js.map

    var TraitColorToHSL = /** @class */ (function () {
        function TraitColorToHSL() {
        }
        TraitColorToHSL = __decorate([
            Trait()
        ], TraitColorToHSL);
        return TraitColorToHSL;
    }());
    //# sourceMappingURL=trait-color-to-hsl.js.map

    var TraitColorToHSLUsingToHSLAObject = /** @class */ (function (_super) {
        __extends(TraitColorToHSLUsingToHSLAObject, _super);
        function TraitColorToHSLUsingToHSLAObject() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorToHSLUsingToHSLAObject.prototype.toHSL = function (alpha) {
            if (alpha === void 0) { alpha = false; }
            var hsla = this.toHSLAObject();
            return "hsl" + (alpha ? 'a' : '') + "(" + hsla.h * 360 + ", " + hsla.s * 100 + "%, " + hsla.l * 100 + "%" + (alpha ? (', ' + hsla.a) : '') + ")";
        };
        TraitColorToHSLUsingToHSLAObject = __decorate([
            Trait()
        ], TraitColorToHSLUsingToHSLAObject);
        return TraitColorToHSLUsingToHSLAObject;
    }(TraitColorToHSL));
    //# sourceMappingURL=trait-color-to-hsl-using-to-hsla-object.js.map

    var ImplTraitToHSLForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitToHSLForColorStruct, _super);
        function ImplTraitToHSLForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitToHSLForColorStruct = __decorate([
            Impl()
        ], ImplTraitToHSLForColorStruct);
        return ImplTraitToHSLForColorStruct;
    }(TraitColorToHSLUsingToHSLAObject));
    //# sourceMappingURL=color-struct-to-hsl-implementation.js.map

    var TraitColorToHSLAUsingToHSL = /** @class */ (function () {
        function TraitColorToHSLAUsingToHSL() {
        }
        TraitColorToHSLAUsingToHSL.prototype.toHSLA = function () {
            return this.toHSL(true);
        };
        TraitColorToHSLAUsingToHSL = __decorate([
            Trait()
        ], TraitColorToHSLAUsingToHSL);
        return TraitColorToHSLAUsingToHSL;
    }());
    //# sourceMappingURL=trait-color-to-hsla-using-to-hsl.js.map

    var ImplTraitToHSLAForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitToHSLAForColorStruct, _super);
        function ImplTraitToHSLAForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitToHSLAForColorStruct = __decorate([
            Impl()
        ], ImplTraitToHSLAForColorStruct);
        return ImplTraitToHSLAForColorStruct;
    }(TraitColorToHSLAUsingToHSL));
    //# sourceMappingURL=color-struct-to-hsla-implementation.js.map

    var TraitColorToHSLAObject = /** @class */ (function () {
        function TraitColorToHSLAObject() {
        }
        TraitColorToHSLAObject = __decorate([
            Trait()
        ], TraitColorToHSLAObject);
        return TraitColorToHSLAObject;
    }());
    //# sourceMappingURL=trait-color-to-hsla-object.js.map

    var TraitColorToHSLAObjectUsingGetColors = /** @class */ (function (_super) {
        __extends(TraitColorToHSLAObjectUsingGetColors, _super);
        function TraitColorToHSLAObjectUsingGetColors() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorToHSLAObjectUsingGetColors.prototype.toHSLAObject = function () {
            var r = this.getRed();
            var g = this.getGreen();
            var b = this.getBlue();
            var a = this.getAlpha();
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var hslaObject = {
                h: 0,
                s: 0,
                l: (max + min) / 2,
                a: a
            };
            if (max === min) { // achromatic
                hslaObject.h = 0;
                hslaObject.s = 0;
            }
            else {
                var d = max - min;
                hslaObject.s = hslaObject.l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        hslaObject.h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        hslaObject.h = (b - r) / d + 2;
                        break;
                    case b:
                        hslaObject.h = (r - g) / d + 4;
                        break;
                }
                hslaObject.h /= 6;
            }
            return hslaObject;
        };
        TraitColorToHSLAObjectUsingGetColors = __decorate([
            Trait()
        ], TraitColorToHSLAObjectUsingGetColors);
        return TraitColorToHSLAObjectUsingGetColors;
    }(TraitColorToHSLAObject));
    //# sourceMappingURL=trait-color-to-hsla-object-using-get-colors.js.map

    var ImplTraitToHSLAObjectForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitToHSLAObjectForColorStruct, _super);
        function ImplTraitToHSLAObjectForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitToHSLAObjectForColorStruct = __decorate([
            Impl()
        ], ImplTraitToHSLAObjectForColorStruct);
        return ImplTraitToHSLAObjectForColorStruct;
    }(TraitColorToHSLAObjectUsingGetColors));
    //# sourceMappingURL=color-struct-to-hsla-object-implementation.js.map

    var TraitColorToString = /** @class */ (function (_super) {
        __extends(TraitColorToString, _super);
        function TraitColorToString() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorToString = __decorate([
            Trait()
        ], TraitColorToString);
        return TraitColorToString;
    }(TraitToString));
    //# sourceMappingURL=trait-color-to-string.js.map

    var TraitColorToStringUsingToRGB = /** @class */ (function (_super) {
        __extends(TraitColorToStringUsingToRGB, _super);
        function TraitColorToStringUsingToRGB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorToStringUsingToRGB.prototype.toString = function () {
            return this.toRGB(true);
        };
        TraitColorToStringUsingToRGB = __decorate([
            Trait()
        ], TraitColorToStringUsingToRGB);
        return TraitColorToStringUsingToRGB;
    }(TraitColorToString));
    //# sourceMappingURL=trait-color-to-string-using-to-rgb.js.map

    var ImplTraitToStringForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitToStringForColorStruct, _super);
        function ImplTraitToStringForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitToStringForColorStruct = __decorate([
            Impl()
        ], ImplTraitToStringForColorStruct);
        return ImplTraitToStringForColorStruct;
    }(TraitColorToStringUsingToRGB));
    //# sourceMappingURL=color-struct-to-string-implementation.js.map

    var TraitColorToHex = /** @class */ (function () {
        function TraitColorToHex() {
        }
        TraitColorToHex = __decorate([
            Trait()
        ], TraitColorToHex);
        return TraitColorToHex;
    }());
    //# sourceMappingURL=trait-color-to-hex.js.map

    function NumberToHex(value, digits) {
        if (digits === void 0) { digits = 2; }
        return value.toString(16).padStart(digits, '0');
    }

    var TraitColorToHexUsingGetColors = /** @class */ (function (_super) {
        __extends(TraitColorToHexUsingGetColors, _super);
        function TraitColorToHexUsingGetColors() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorToHexUsingGetColors.prototype.toHex = function (alpha) {
            if (alpha === void 0) { alpha = false; }
            return "#" + NumberToHex(Math.round(this.getRed() * 255), 2) + NumberToHex(Math.round(this.getGreen() * 255), 2) + NumberToHex(Math.round(this.getBlue() * 255), 2) + (alpha ? NumberToHex(Math.round(this.getAlpha() * 255), 2) : '');
        };
        TraitColorToHexUsingGetColors = __decorate([
            Trait()
        ], TraitColorToHexUsingGetColors);
        return TraitColorToHexUsingGetColors;
    }(TraitColorToHex));
    //# sourceMappingURL=trait-color-to-hex-using-get-colors.js.map

    var ImplTraitToHexForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitToHexForColorStruct, _super);
        function ImplTraitToHexForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitToHexForColorStruct = __decorate([
            Impl()
        ], ImplTraitToHexForColorStruct);
        return ImplTraitToHexForColorStruct;
    }(TraitColorToHexUsingGetColors));
    //# sourceMappingURL=color-struct-to-hex-implementation.js.map

    var TraitColorAlloc = /** @class */ (function (_super) {
        __extends(TraitColorAlloc, _super);
        function TraitColorAlloc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorAlloc = __decorate([
            Trait()
        ], TraitColorAlloc);
        return TraitColorAlloc;
    }(TraitAlloc));
    //# sourceMappingURL=trait-color-alloc.js.map

    var ImplTraitAllocForColorClass = /** @class */ (function (_super) {
        __extends(ImplTraitAllocForColorClass, _super);
        function ImplTraitAllocForColorClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitAllocForColorClass.prototype[ALLOC] = function (r, g, b, a) {
            return new Color(r, g, b, a);
        };
        ImplTraitAllocForColorClass = __decorate([
            Impl()
        ], ImplTraitAllocForColorClass);
        return ImplTraitAllocForColorClass;
    }(TraitColorAlloc));
    //# sourceMappingURL=color-class-alloc-implementation.js.map

    // // https://www.w3schools.com/sass/sass_functions_color.asp#:~:text=Sass%20Get%20Color%20Functions&text=Returns%20the%20blue%20value%20of,number%20between%200%20and%20255.&text=Returns%20the%20hue%20of%20color%20as%20a%20number%20between%200deg%20and%20255deg.&text=Returns%20the%20HSL%20saturation%20of,between%200%25%20and%20100%25.&text=Returns%20the%20HSL%20lightness%20of,between%200%25%20and%20100%25.
    var TraitColorMix = /** @class */ (function () {
        function TraitColorMix() {
        }
        TraitColorMix = __decorate([
            Trait()
        ], TraitColorMix);
        return TraitColorMix;
    }());
    //# sourceMappingURL=trait-color-mix.js.map

    var TraitColorMixUsingGetColorsAndAlloc = /** @class */ (function (_super) {
        __extends(TraitColorMixUsingGetColorsAndAlloc, _super);
        function TraitColorMixUsingGetColorsAndAlloc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorMixUsingGetColorsAndAlloc.prototype.mix = function (color, proportion) {
            if ((0 <= proportion) && (proportion <= 1)) {
                var _proportion = 1 - proportion;
                return this[ALLOC](((this.getRed() * _proportion) + (color.getRed() * proportion)), ((this.getGreen() * _proportion) + (color.getGreen() * proportion)), ((this.getBlue() * _proportion) + (color.getBlue() * proportion)), ((this.getAlpha() * _proportion) + (color.getAlpha() * proportion)));
            }
            else {
                throw new RangeError("Expected 'proportion' in the range [0, 1]");
            }
        };
        TraitColorMixUsingGetColorsAndAlloc = __decorate([
            Trait()
        ], TraitColorMixUsingGetColorsAndAlloc);
        return TraitColorMixUsingGetColorsAndAlloc;
    }(TraitColorMix));
    //# sourceMappingURL=trait-color-mix-using-get-colors-and-alloc.js.map

    var ImplTraitMixForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitMixForColorStruct, _super);
        function ImplTraitMixForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitMixForColorStruct = __decorate([
            Impl()
        ], ImplTraitMixForColorStruct);
        return ImplTraitMixForColorStruct;
    }(TraitColorMixUsingGetColorsAndAlloc));
    //# sourceMappingURL=color-struct-mix-implementation.js.map

    var TraitColorParseRGB = /** @class */ (function () {
        function TraitColorParseRGB() {
        }
        TraitColorParseRGB = __decorate([
            Trait()
        ], TraitColorParseRGB);
        return TraitColorParseRGB;
    }());
    //# sourceMappingURL=trait-color-parse-rgb.js.map

    /**
     * Converts a string (looking like a number) into a real number.
     * INFO: percents are allowed
     */
    function ParseNumberLikeValue(input, min, max) {
        input = input.trim();
        var number = parseFloat(input);
        if (Number.isNaN(number)) {
            throw new Error("Invalid number: " + input);
        }
        else {
            if (input.endsWith('%')) {
                number *= max / 100;
            }
            if ((min <= number) && (number <= max)) {
                return number;
            }
            else {
                throw new RangeError("Invalid range [" + min + "-" + max + "] for number " + number);
            }
        }
    }

    var NUMBER_PATTERN = '\\s*(\\d+(?:\\.\\d+)?%?)\\s*';
    var RGBA_REGEXP = new RegExp("rgb(a)?\\(" + NUMBER_PATTERN + "," + NUMBER_PATTERN + "," + NUMBER_PATTERN + "(?:," + NUMBER_PATTERN + ")?\\)");
    var TraitColorParseRGBUsingAlloc = /** @class */ (function (_super) {
        __extends(TraitColorParseRGBUsingAlloc, _super);
        function TraitColorParseRGBUsingAlloc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorParseRGBUsingAlloc.prototype.parseRGB = function (input) {
            RGBA_REGEXP.lastIndex = 0;
            var match = RGBA_REGEXP.exec(input);
            if ((match !== null) && (typeof match[1] === typeof match[5])) { // check if 3 params for rgb and 4 for rgba
                return this[ALLOC](ParseNumberLikeValue(match[2], 0, 255) / 255, ParseNumberLikeValue(match[3], 0, 255) / 255, ParseNumberLikeValue(match[4], 0, 255) / 255, (match[5] === void 0)
                    ? 1
                    : ParseNumberLikeValue(match[5], 0, 1));
            }
            else {
                throw new Error("Invalid rgb(a) color: " + input);
            }
        };
        TraitColorParseRGBUsingAlloc = __decorate([
            Trait()
        ], TraitColorParseRGBUsingAlloc);
        return TraitColorParseRGBUsingAlloc;
    }(TraitColorParseRGB));
    //# sourceMappingURL=trait-color-parse-rgb-using-alloc.js.map

    var ImplTraitParseRGBForColorClass = /** @class */ (function (_super) {
        __extends(ImplTraitParseRGBForColorClass, _super);
        function ImplTraitParseRGBForColorClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitParseRGBForColorClass = __decorate([
            Impl()
        ], ImplTraitParseRGBForColorClass);
        return ImplTraitParseRGBForColorClass;
    }(TraitColorParseRGBUsingAlloc));
    //# sourceMappingURL=color-class-parse-rgb-implementation.js.map

    var TraitColorParse = /** @class */ (function () {
        function TraitColorParse() {
        }
        TraitColorParse = __decorate([
            Trait()
        ], TraitColorParse);
        return TraitColorParse;
    }());
    //# sourceMappingURL=trait-color-parse.js.map

    var TraitColorParseUsingParseRGB = /** @class */ (function (_super) {
        __extends(TraitColorParseUsingParseRGB, _super);
        function TraitColorParseUsingParseRGB() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorParseUsingParseRGB.prototype.parse = function (input) {
            var element = document.createElement('div');
            element.style.setProperty('color', input);
            if (element.style.getPropertyValue('color')) {
                document.body.appendChild(element);
                var style = window.getComputedStyle(element);
                var rgbColor = style.color;
                document.body.removeChild(element);
                return this.parseRGB(rgbColor);
            }
            else {
                return null;
            }
        };
        TraitColorParseUsingParseRGB = __decorate([
            Trait()
        ], TraitColorParseUsingParseRGB);
        return TraitColorParseUsingParseRGB;
    }(TraitColorParse));
    //# sourceMappingURL=trait-color-parse-using-parse-rgb.js.map

    var ImplTraitParseForColorClass = /** @class */ (function (_super) {
        __extends(ImplTraitParseForColorClass, _super);
        function ImplTraitParseForColorClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitParseForColorClass = __decorate([
            Impl()
        ], ImplTraitParseForColorClass);
        return ImplTraitParseForColorClass;
    }(TraitColorParseUsingParseRGB));
    //# sourceMappingURL=color-class-parse-implementation.js.map

    var TraitColorGrayscale = /** @class */ (function () {
        function TraitColorGrayscale() {
        }
        TraitColorGrayscale = __decorate([
            Trait()
        ], TraitColorGrayscale);
        return TraitColorGrayscale;
    }());
    //# sourceMappingURL=trait-color-grayscale.js.map

    var TraitColorGrayscaleUsingGetColorsAndAlloc = /** @class */ (function (_super) {
        __extends(TraitColorGrayscaleUsingGetColorsAndAlloc, _super);
        function TraitColorGrayscaleUsingGetColorsAndAlloc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorGrayscaleUsingGetColorsAndAlloc.prototype.grayscale = function (mode) {
            if (mode === void 0) { mode = 'luminosity'; }
            var c;
            switch (mode) {
                case 'average':
                    c = (this.getRed() + this.getGreen() + this.getBlue()) / 3;
                    break;
                case 'lightness':
                    c = (Math.max(this.getRed(), this.getGreen(), this.getBlue()) + Math.min(this.getRed(), this.getGreen(), this.getBlue())) / 2;
                    break;
                case 'luminosity':
                    c = 0.21 * this.getRed() + 0.72 * this.getGreen() + 0.07 * this.getBlue();
                    break;
                default:
                    throw new TypeError("Unexpected grayscale's mode: '" + mode + "'");
            }
            return this[ALLOC](c, c, c, this.getAlpha());
        };
        TraitColorGrayscaleUsingGetColorsAndAlloc = __decorate([
            Trait()
        ], TraitColorGrayscaleUsingGetColorsAndAlloc);
        return TraitColorGrayscaleUsingGetColorsAndAlloc;
    }(TraitColorGrayscale));
    //# sourceMappingURL=trait-color-grayscale-using-get-colors-and-alloc.js.map

    var ImplTraitGrayscaleForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitGrayscaleForColorStruct, _super);
        function ImplTraitGrayscaleForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitGrayscaleForColorStruct = __decorate([
            Impl()
        ], ImplTraitGrayscaleForColorStruct);
        return ImplTraitGrayscaleForColorStruct;
    }(TraitColorGrayscaleUsingGetColorsAndAlloc));
    //# sourceMappingURL=color-struct-grayscale-implementation.js.map

    var TraitColorFromHSLAObject = /** @class */ (function () {
        function TraitColorFromHSLAObject() {
        }
        TraitColorFromHSLAObject = __decorate([
            Trait()
        ], TraitColorFromHSLAObject);
        return TraitColorFromHSLAObject;
    }());
    //# sourceMappingURL=trait-color-from-hsla-object.js.map

    function HueToRGB(p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    var TraitColorFromHSLAObjectUsingAlloc = /** @class */ (function (_super) {
        __extends(TraitColorFromHSLAObjectUsingAlloc, _super);
        function TraitColorFromHSLAObjectUsingAlloc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorFromHSLAObjectUsingAlloc.prototype.fromHSLAObject = function (hslaObject) {
            var r, g, b;
            if (hslaObject.s === 0) {
                r = g = b = hslaObject.l; // achromatic
            }
            else {
                var q = hslaObject.l < 0.5 ? hslaObject.l * (1 + hslaObject.s) : hslaObject.l + hslaObject.s - hslaObject.l * hslaObject.s;
                var p = 2 * hslaObject.l - q;
                r = HueToRGB(p, q, hslaObject.h + 1 / 3);
                g = HueToRGB(p, q, hslaObject.h);
                b = HueToRGB(p, q, hslaObject.h - 1 / 3);
            }
            return this[ALLOC](r, g, b, hslaObject.a ? (hslaObject.a) : 1);
        };
        TraitColorFromHSLAObjectUsingAlloc = __decorate([
            Trait()
        ], TraitColorFromHSLAObjectUsingAlloc);
        return TraitColorFromHSLAObjectUsingAlloc;
    }(TraitColorFromHSLAObject));
    //# sourceMappingURL=trait-color-from-hsla-object-using-alloc.js.map

    var ImplTraitFromHSLAObjectForColorClass = /** @class */ (function (_super) {
        __extends(ImplTraitFromHSLAObjectForColorClass, _super);
        function ImplTraitFromHSLAObjectForColorClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitFromHSLAObjectForColorClass = __decorate([
            Impl()
        ], ImplTraitFromHSLAObjectForColorClass);
        return ImplTraitFromHSLAObjectForColorClass;
    }(TraitColorFromHSLAObjectUsingAlloc));
    //# sourceMappingURL=color-class-from-hsla-object-implementation.js.map

    var TraitColorInvert = /** @class */ (function () {
        function TraitColorInvert() {
        }
        TraitColorInvert = __decorate([
            Trait()
        ], TraitColorInvert);
        return TraitColorInvert;
    }());
    //# sourceMappingURL=trait-color-invert.js.map

    var TraitColorInvertUsingGetColorsAndAlloc = /** @class */ (function (_super) {
        __extends(TraitColorInvertUsingGetColorsAndAlloc, _super);
        function TraitColorInvertUsingGetColorsAndAlloc() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorInvertUsingGetColorsAndAlloc.prototype.invert = function (amount) {
            if (amount === void 0) { amount = 1; }
            if ((0 <= amount) && (amount <= 1)) {
                return this[ALLOC](amount * (1 - this.getRed()) + (1 - amount) * this.getRed(), amount * (1 - this.getGreen()) + (1 - amount) * this.getGreen(), amount * (1 - this.getBlue()) + (1 - amount) * this.getBlue(), this.getAlpha());
            }
            else {
                throw new RangeError("Expected 'amount' in the range [0, 1]");
            }
        };
        TraitColorInvertUsingGetColorsAndAlloc = __decorate([
            Trait()
        ], TraitColorInvertUsingGetColorsAndAlloc);
        return TraitColorInvertUsingGetColorsAndAlloc;
    }(TraitColorInvert));
    //# sourceMappingURL=trait-color-invert-using-get-colors-and-alloc.js.map

    var ImplTraitInvertForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitInvertForColorStruct, _super);
        function ImplTraitInvertForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitInvertForColorStruct = __decorate([
            Impl()
        ], ImplTraitInvertForColorStruct);
        return ImplTraitInvertForColorStruct;
    }(TraitColorInvertUsingGetColorsAndAlloc));
    //# sourceMappingURL=color-struct-invert-implementation.js.map

    var TraitColorLighten = /** @class */ (function () {
        function TraitColorLighten() {
        }
        TraitColorLighten = __decorate([
            Trait()
        ], TraitColorLighten);
        return TraitColorLighten;
    }());
    //# sourceMappingURL=trait-color-lighten.js.map

    var TraitColorLightenUsingToAndFromHSLAObject = /** @class */ (function (_super) {
        __extends(TraitColorLightenUsingToAndFromHSLAObject, _super);
        function TraitColorLightenUsingToAndFromHSLAObject() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorLightenUsingToAndFromHSLAObject.prototype.lighten = function (amount) {
            var hsla = this.toHSLAObject();
            hsla.l = Math.max(0, Math.min(1, hsla.l + amount));
            return this.constructor.fromHSLAObject(hsla);
            /*return CallTargetTraitMethodOrDefaultImplementation<TraitColorFromHSLAObject<any, GReturn>, 'fromHSLAObject'>(
              this.constructor,
              TraitColorFromHSLAObject,
              'fromHSLAObject',
              [hsla],
              TraitColorFromHSLAObjectUsingAlloc,
            );
             */
        };
        TraitColorLightenUsingToAndFromHSLAObject = __decorate([
            Trait()
        ], TraitColorLightenUsingToAndFromHSLAObject);
        return TraitColorLightenUsingToAndFromHSLAObject;
    }(TraitColorLighten));
    //# sourceMappingURL=trait-color-lighten-using-to-and-from-hsla-object.js.map

    var ImplTraitLightenForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitLightenForColorStruct, _super);
        function ImplTraitLightenForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitLightenForColorStruct = __decorate([
            Impl()
        ], ImplTraitLightenForColorStruct);
        return ImplTraitLightenForColorStruct;
    }(TraitColorLightenUsingToAndFromHSLAObject));
    //# sourceMappingURL=color-struct-lighten-implementation.js.map

    var TraitColorDarken = /** @class */ (function () {
        function TraitColorDarken() {
        }
        TraitColorDarken = __decorate([
            Trait()
        ], TraitColorDarken);
        return TraitColorDarken;
    }());
    //# sourceMappingURL=trait-color-darken.js.map

    var TraitColorDarkenUsingLighten = /** @class */ (function (_super) {
        __extends(TraitColorDarkenUsingLighten, _super);
        function TraitColorDarkenUsingLighten() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TraitColorDarkenUsingLighten.prototype.darken = function (amount) {
            return this.lighten(-amount);
        };
        TraitColorDarkenUsingLighten = __decorate([
            Trait()
        ], TraitColorDarkenUsingLighten);
        return TraitColorDarkenUsingLighten;
    }(TraitColorDarken));
    //# sourceMappingURL=trait-color-darken-using-lighten.js.map

    var ImplTraitDarkenForColorStruct = /** @class */ (function (_super) {
        __extends(ImplTraitDarkenForColorStruct, _super);
        function ImplTraitDarkenForColorStruct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ImplTraitDarkenForColorStruct = __decorate([
            Impl()
        ], ImplTraitDarkenForColorStruct);
        return ImplTraitDarkenForColorStruct;
    }(TraitColorDarkenUsingLighten));
    //# sourceMappingURL=color-struct-lighten-implementation.js.map

    /** CONSTRUCTOR **/
    function ConstructColor(instance, r, g, b, a) {
        // INFO private properties are ~3 times slower to assign
        CreatePrivateContext(COLOR_PRIVATE_CONTEXT, instance, {
            r: NormalizeColorValue(r, 'r'),
            g: NormalizeColorValue(g, 'g'),
            b: NormalizeColorValue(b, 'b'),
            a: NormalizeColorValue(a, 'a'),
        });
    }
    var ColorImplementations = [
        // alloc
        ImplTraitAllocForColorClass,
        // colors
        // r
        ImplTraitGetRedForColorStruct,
        ImplTraitSetRedForColorStruct,
        // g
        ImplTraitGetGreenForColorStruct,
        ImplTraitSetGreenForColorStruct,
        // b
        ImplTraitGetBlueForColorStruct,
        ImplTraitSetBlueForColorStruct,
        // a
        ImplTraitGetAlphaForColorStruct,
        ImplTraitSetAlphaForColorStruct,
        // comparison
        ImplTraitEqualsForColorStruct,
        // operations
        ImplTraitMixForColorStruct,
        ImplTraitGrayscaleForColorStruct,
        ImplTraitInvertForColorStruct,
        ImplTraitLightenForColorStruct,
        ImplTraitDarkenForColorStruct,
        // to
        // rgb
        ImplTraitToRGBForColorStruct,
        ImplTraitToRGBAForColorStruct,
        // hsl
        ImplTraitToHSLForColorStruct,
        ImplTraitToHSLAForColorStruct,
        ImplTraitToHSLAObjectForColorStruct,
        // to - others
        ImplTraitToHexForColorStruct,
        ImplTraitToStringForColorStruct,
    ];
    var ColorConstructorImplementations = [
        // alloc
        ImplTraitAllocForColorClass,
        // parse
        ImplTraitParseRGBForColorClass,
        ImplTraitParseForColorClass,
        // from
        ImplTraitFromHSLAObjectForColorClass,
    ];
    var ColorImplementationsConstructor = AssembleTraitImplementations(ColorImplementations, ColorConstructorImplementations);
    var Color = /** @class */ (function (_super) {
        __extends(Color, _super);
        function Color(r, g, b, a) {
            var _this = _super.call(this) || this;
            ConstructColor(_this, r, g, b, a);
            return _this;
        }
        Object.defineProperty(Color.prototype, "r", {
            get: function () {
                return this.getRed();
            },
            set: function (value) {
                this.setRed(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            get: function () {
                return this.getGreen();
            },
            set: function (value) {
                this.setGreen(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            get: function () {
                return this.getBlue();
            },
            set: function (value) {
                this.setBlue(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "a", {
            get: function () {
                return this.getAlpha();
            },
            set: function (value) {
                this.setAlpha(value);
            },
            enumerable: false,
            configurable: true
        });
        return Color;
    }(ColorImplementationsConstructor));
    //# sourceMappingURL=color-class.js.map

    exports.Color = Color;
    exports.ColorConstructorImplementations = ColorConstructorImplementations;
    exports.ColorImplementations = ColorImplementations;
    exports.ConstructColor = ConstructColor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=common-classes.umd.js.map