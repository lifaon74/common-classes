(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('common-classes', ['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['common-classes'] = {}));
}(this, (function (exports) { 'use strict';

    /** PRIVATE CONTEXT **/
    const COLOR_PRIVATE_CONTEXT = Symbol('color-private-context');

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

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
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

    let TraitColorGetRed = class TraitColorGetRed {
    };
    TraitColorGetRed = __decorate([
        Trait()
    ], TraitColorGetRed);
    //# sourceMappingURL=trait-color-get-red.js.map

    let ImplTraitGetRedForColorStruct = class ImplTraitGetRedForColorStruct extends TraitColorGetRed {
        getRed() {
            return this[COLOR_PRIVATE_CONTEXT].r;
        }
    };
    ImplTraitGetRedForColorStruct = __decorate([
        Impl()
    ], ImplTraitGetRedForColorStruct);
    //# sourceMappingURL=color-struct-get-red-implementation.js.map

    let TraitColorGetAlpha = class TraitColorGetAlpha {
    };
    TraitColorGetAlpha = __decorate([
        Trait()
    ], TraitColorGetAlpha);
    //# sourceMappingURL=trait-color-get-alpha.js.map

    let ImplTraitGetAlphaForColorStruct = class ImplTraitGetAlphaForColorStruct extends TraitColorGetAlpha {
        getAlpha() {
            return this[COLOR_PRIVATE_CONTEXT].a;
        }
    };
    ImplTraitGetAlphaForColorStruct = __decorate([
        Impl()
    ], ImplTraitGetAlphaForColorStruct);
    //# sourceMappingURL=color-struct-get-alpha-implementation.js.map

    let TraitColorGetBlue = class TraitColorGetBlue {
    };
    TraitColorGetBlue = __decorate([
        Trait()
    ], TraitColorGetBlue);
    //# sourceMappingURL=trait-color-get-blue.js.map

    let ImplTraitGetBlueForColorStruct = class ImplTraitGetBlueForColorStruct extends TraitColorGetBlue {
        getBlue() {
            return this[COLOR_PRIVATE_CONTEXT].b;
        }
    };
    ImplTraitGetBlueForColorStruct = __decorate([
        Impl()
    ], ImplTraitGetBlueForColorStruct);
    //# sourceMappingURL=color-struct-get-blue-implementation.js.map

    let TraitColorGetGreen = class TraitColorGetGreen {
    };
    TraitColorGetGreen = __decorate([
        Trait()
    ], TraitColorGetGreen);
    //# sourceMappingURL=trait-color-get-green.js.map

    let ImplTraitGetGreenForColorStruct = class ImplTraitGetGreenForColorStruct extends TraitColorGetGreen {
        getGreen() {
            return this[COLOR_PRIVATE_CONTEXT].g;
        }
    };
    ImplTraitGetGreenForColorStruct = __decorate([
        Impl()
    ], ImplTraitGetGreenForColorStruct);
    //# sourceMappingURL=color-struct-get-green-implementation.js.map

    let TraitColorSetAlpha = class TraitColorSetAlpha {
    };
    TraitColorSetAlpha = __decorate([
        Trait()
    ], TraitColorSetAlpha);
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
                throw new RangeError(`Expected '${name}' in the range [0, 1]`);
            }
        }
        else {
            throw new TypeError(`Expected number as '${name}'`);
        }
    }

    let ImplTraitSetAlphaForColorStruct = class ImplTraitSetAlphaForColorStruct extends TraitColorSetAlpha {
        setAlpha(value) {
            this[COLOR_PRIVATE_CONTEXT].a = NormalizeColorValue(value, 'a');
        }
    };
    ImplTraitSetAlphaForColorStruct = __decorate([
        Impl()
    ], ImplTraitSetAlphaForColorStruct);
    //# sourceMappingURL=color-struct-set-alpha-implementation.js.map

    let TraitColorSetBlue = class TraitColorSetBlue {
    };
    TraitColorSetBlue = __decorate([
        Trait()
    ], TraitColorSetBlue);
    //# sourceMappingURL=trait-color-set-blue.js.map

    let ImplTraitSetBlueForColorStruct = class ImplTraitSetBlueForColorStruct extends TraitColorSetBlue {
        setBlue(value) {
            this[COLOR_PRIVATE_CONTEXT].b = NormalizeColorValue(value, 'b');
        }
    };
    ImplTraitSetBlueForColorStruct = __decorate([
        Impl()
    ], ImplTraitSetBlueForColorStruct);
    //# sourceMappingURL=color-struct-set-blue-implementation.js.map

    let TraitColorSetGreen = class TraitColorSetGreen {
    };
    TraitColorSetGreen = __decorate([
        Trait()
    ], TraitColorSetGreen);
    //# sourceMappingURL=trait-color-set-green.js.map

    let ImplTraitSetGreenForColorStruct = class ImplTraitSetGreenForColorStruct extends TraitColorSetGreen {
        setGreen(value) {
            this[COLOR_PRIVATE_CONTEXT].g = NormalizeColorValue(value, 'g');
        }
    };
    ImplTraitSetGreenForColorStruct = __decorate([
        Impl()
    ], ImplTraitSetGreenForColorStruct);
    //# sourceMappingURL=color-struct-set-green-implementation.js.map

    let TraitColorSetRed = class TraitColorSetRed {
    };
    TraitColorSetRed = __decorate([
        Trait()
    ], TraitColorSetRed);
    //# sourceMappingURL=trait-color-set-red.js.map

    let ImplTraitSetRedForColorStruct = class ImplTraitSetRedForColorStruct extends TraitColorSetRed {
        setRed(value) {
            this[COLOR_PRIVATE_CONTEXT].r = NormalizeColorValue(value, 'r');
        }
    };
    ImplTraitSetRedForColorStruct = __decorate([
        Impl()
    ], ImplTraitSetRedForColorStruct);
    //# sourceMappingURL=color-struct-set-red-implementation.js.map

    let TraitColorEquals = class TraitColorEquals extends TraitEquals {
    };
    TraitColorEquals = __decorate([
        Trait()
    ], TraitColorEquals);
    //# sourceMappingURL=trait-color-equals.js.map

    let TraitColorEqualsUsingGetColors = class TraitColorEqualsUsingGetColors extends TraitColorEquals {
        equals(color) {
            return (this.getRed() === color.getRed())
                && (this.getGreen() === color.getGreen())
                && (this.getBlue() === color.getBlue())
                && (this.getAlpha() === color.getAlpha());
        }
    };
    TraitColorEqualsUsingGetColors = __decorate([
        Trait()
    ], TraitColorEqualsUsingGetColors);
    //# sourceMappingURL=trait-color-equals-using-get-colors.js.map

    let ImplTraitEqualsForColorStruct = class ImplTraitEqualsForColorStruct extends TraitColorEqualsUsingGetColors {
    };
    ImplTraitEqualsForColorStruct = __decorate([
        Impl()
    ], ImplTraitEqualsForColorStruct);
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

    let TraitColorToRGB = class TraitColorToRGB {
    };
    TraitColorToRGB = __decorate([
        Trait()
    ], TraitColorToRGB);
    //# sourceMappingURL=trait-color-to-rgb.js.map

    let TraitColorToRGBUsingGetColors = class TraitColorToRGBUsingGetColors extends TraitColorToRGB {
        toRGB(alpha = false) {
            return `rgb${alpha ? 'a' : ''}(${Math.round(this.getRed() * 255)}, ${Math.round(this.getGreen() * 255)}, ${Math.round(this.getBlue() * 255)}${alpha ? (', ' + this.getAlpha()) : ''})`;
        }
    };
    TraitColorToRGBUsingGetColors = __decorate([
        Trait()
    ], TraitColorToRGBUsingGetColors);
    //# sourceMappingURL=trait-color-to-rgb-using-get-colors.js.map

    let ImplTraitToRGBForColorStruct = class ImplTraitToRGBForColorStruct extends TraitColorToRGBUsingGetColors {
    };
    ImplTraitToRGBForColorStruct = __decorate([
        Impl()
    ], ImplTraitToRGBForColorStruct);
    //# sourceMappingURL=color-struct-to-rgb-implementation.js.map

    let TraitColorToRGBAUsingToRGB = class TraitColorToRGBAUsingToRGB {
        toRGBA() {
            return this.toRGB(true);
        }
    };
    TraitColorToRGBAUsingToRGB = __decorate([
        Trait()
    ], TraitColorToRGBAUsingToRGB);
    //# sourceMappingURL=trait-color-to-rgba-using-to-rgb.js.map

    let ImplTraitToRGBAForColorStruct = class ImplTraitToRGBAForColorStruct extends TraitColorToRGBAUsingToRGB {
    };
    ImplTraitToRGBAForColorStruct = __decorate([
        Impl()
    ], ImplTraitToRGBAForColorStruct);
    //# sourceMappingURL=color-struct-to-rgba-implementation.js.map

    let TraitColorToHSL = class TraitColorToHSL {
    };
    TraitColorToHSL = __decorate([
        Trait()
    ], TraitColorToHSL);
    //# sourceMappingURL=trait-color-to-hsl.js.map

    let TraitColorToHSLUsingToHSLAObject = class TraitColorToHSLUsingToHSLAObject extends TraitColorToHSL {
        toHSL(alpha = false) {
            const hsla = this.toHSLAObject();
            return `hsl${alpha ? 'a' : ''}(${hsla.h * 360}, ${hsla.s * 100}%, ${hsla.l * 100}%${alpha ? (', ' + hsla.a) : ''})`;
        }
    };
    TraitColorToHSLUsingToHSLAObject = __decorate([
        Trait()
    ], TraitColorToHSLUsingToHSLAObject);
    //# sourceMappingURL=trait-color-to-hsl-using-to-hsla-object.js.map

    let ImplTraitToHSLForColorStruct = class ImplTraitToHSLForColorStruct extends TraitColorToHSLUsingToHSLAObject {
    };
    ImplTraitToHSLForColorStruct = __decorate([
        Impl()
    ], ImplTraitToHSLForColorStruct);
    //# sourceMappingURL=color-struct-to-hsl-implementation.js.map

    let TraitColorToHSLAUsingToHSL = class TraitColorToHSLAUsingToHSL {
        toHSLA() {
            return this.toHSL(true);
        }
    };
    TraitColorToHSLAUsingToHSL = __decorate([
        Trait()
    ], TraitColorToHSLAUsingToHSL);
    //# sourceMappingURL=trait-color-to-hsla-using-to-hsl.js.map

    let ImplTraitToHSLAForColorStruct = class ImplTraitToHSLAForColorStruct extends TraitColorToHSLAUsingToHSL {
    };
    ImplTraitToHSLAForColorStruct = __decorate([
        Impl()
    ], ImplTraitToHSLAForColorStruct);
    //# sourceMappingURL=color-struct-to-hsla-implementation.js.map

    let TraitColorToHSLAObject = class TraitColorToHSLAObject {
    };
    TraitColorToHSLAObject = __decorate([
        Trait()
    ], TraitColorToHSLAObject);
    //# sourceMappingURL=trait-color-to-hsla-object.js.map

    let TraitColorToHSLAObjectUsingGetColors = class TraitColorToHSLAObjectUsingGetColors extends TraitColorToHSLAObject {
        toHSLAObject() {
            const r = this.getRed();
            const g = this.getGreen();
            const b = this.getBlue();
            const a = this.getAlpha();
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const hslaObject = {
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
                const d = max - min;
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
        }
    };
    TraitColorToHSLAObjectUsingGetColors = __decorate([
        Trait()
    ], TraitColorToHSLAObjectUsingGetColors);
    //# sourceMappingURL=trait-color-to-hsla-object-using-get-colors.js.map

    let ImplTraitToHSLAObjectForColorStruct = class ImplTraitToHSLAObjectForColorStruct extends TraitColorToHSLAObjectUsingGetColors {
    };
    ImplTraitToHSLAObjectForColorStruct = __decorate([
        Impl()
    ], ImplTraitToHSLAObjectForColorStruct);
    //# sourceMappingURL=color-struct-to-hsla-object-implementation.js.map

    let TraitColorToString = class TraitColorToString extends TraitToString {
    };
    TraitColorToString = __decorate([
        Trait()
    ], TraitColorToString);
    //# sourceMappingURL=trait-color-to-string.js.map

    let TraitColorToStringUsingToRGB = class TraitColorToStringUsingToRGB extends TraitColorToString {
        toString() {
            return this.toRGB(true);
        }
    };
    TraitColorToStringUsingToRGB = __decorate([
        Trait()
    ], TraitColorToStringUsingToRGB);
    //# sourceMappingURL=trait-color-to-string-using-to-rgb.js.map

    let ImplTraitToStringForColorStruct = class ImplTraitToStringForColorStruct extends TraitColorToStringUsingToRGB {
    };
    ImplTraitToStringForColorStruct = __decorate([
        Impl()
    ], ImplTraitToStringForColorStruct);
    //# sourceMappingURL=color-struct-to-string-implementation.js.map

    let TraitColorToHex = class TraitColorToHex {
    };
    TraitColorToHex = __decorate([
        Trait()
    ], TraitColorToHex);
    //# sourceMappingURL=trait-color-to-hex.js.map

    function NumberToHex(value, digits = 2) {
        return value.toString(16).padStart(digits, '0');
    }

    let TraitColorToHexUsingGetColors = class TraitColorToHexUsingGetColors extends TraitColorToHex {
        toHex(alpha = false) {
            return `#${NumberToHex(Math.round(this.getRed() * 255), 2)}${NumberToHex(Math.round(this.getGreen() * 255), 2)}${NumberToHex(Math.round(this.getBlue() * 255), 2)}${(alpha ? NumberToHex(Math.round(this.getAlpha() * 255), 2) : '')}`;
        }
    };
    TraitColorToHexUsingGetColors = __decorate([
        Trait()
    ], TraitColorToHexUsingGetColors);
    //# sourceMappingURL=trait-color-to-hex-using-get-colors.js.map

    let ImplTraitToHexForColorStruct = class ImplTraitToHexForColorStruct extends TraitColorToHexUsingGetColors {
    };
    ImplTraitToHexForColorStruct = __decorate([
        Impl()
    ], ImplTraitToHexForColorStruct);
    //# sourceMappingURL=color-struct-to-hex-implementation.js.map

    let TraitColorAlloc = class TraitColorAlloc extends TraitAlloc {
    };
    TraitColorAlloc = __decorate([
        Trait()
    ], TraitColorAlloc);
    //# sourceMappingURL=trait-color-alloc.js.map

    let ImplTraitAllocForColorClass = class ImplTraitAllocForColorClass extends TraitColorAlloc {
        [ALLOC](r, g, b, a) {
            return new Color(r, g, b, a);
        }
    };
    ImplTraitAllocForColorClass = __decorate([
        Impl()
    ], ImplTraitAllocForColorClass);
    //# sourceMappingURL=color-class-alloc-implementation.js.map

    // // https://www.w3schools.com/sass/sass_functions_color.asp#:~:text=Sass%20Get%20Color%20Functions&text=Returns%20the%20blue%20value%20of,number%20between%200%20and%20255.&text=Returns%20the%20hue%20of%20color%20as%20a%20number%20between%200deg%20and%20255deg.&text=Returns%20the%20HSL%20saturation%20of,between%200%25%20and%20100%25.&text=Returns%20the%20HSL%20lightness%20of,between%200%25%20and%20100%25.
    let TraitColorMix = class TraitColorMix {
    };
    TraitColorMix = __decorate([
        Trait()
    ], TraitColorMix);
    //# sourceMappingURL=trait-color-mix.js.map

    let TraitColorMixUsingGetColorsAndAlloc = class TraitColorMixUsingGetColorsAndAlloc extends TraitColorMix {
        mix(color, proportion) {
            if ((0 <= proportion) && (proportion <= 1)) {
                const _proportion = 1 - proportion;
                return this[ALLOC](((this.getRed() * _proportion) + (color.getRed() * proportion)), ((this.getGreen() * _proportion) + (color.getGreen() * proportion)), ((this.getBlue() * _proportion) + (color.getBlue() * proportion)), ((this.getAlpha() * _proportion) + (color.getAlpha() * proportion)));
            }
            else {
                throw new RangeError(`Expected 'proportion' in the range [0, 1]`);
            }
        }
    };
    TraitColorMixUsingGetColorsAndAlloc = __decorate([
        Trait()
    ], TraitColorMixUsingGetColorsAndAlloc);
    //# sourceMappingURL=trait-color-mix-using-get-colors-and-alloc.js.map

    let ImplTraitMixForColorStruct = class ImplTraitMixForColorStruct extends TraitColorMixUsingGetColorsAndAlloc {
    };
    ImplTraitMixForColorStruct = __decorate([
        Impl()
    ], ImplTraitMixForColorStruct);
    //# sourceMappingURL=color-struct-mix-implementation.js.map

    let TraitColorParseRGB = class TraitColorParseRGB {
    };
    TraitColorParseRGB = __decorate([
        Trait()
    ], TraitColorParseRGB);
    //# sourceMappingURL=trait-color-parse-rgb.js.map

    /**
     * Converts a string (looking like a number) into a real number.
     * INFO: percents are allowed
     */
    function ParseNumberLikeValue(input, min, max) {
        input = input.trim();
        let number = parseFloat(input);
        if (Number.isNaN(number)) {
            throw new Error(`Invalid number: ${input}`);
        }
        else {
            if (input.endsWith('%')) {
                number *= max / 100;
            }
            if ((min <= number) && (number <= max)) {
                return number;
            }
            else {
                throw new RangeError(`Invalid range [${min}-${max}] for number ${number}`);
            }
        }
    }

    const NUMBER_PATTERN = '\\s*(\\d+(?:\\.\\d+)?%?)\\s*';
    const RGBA_REGEXP = new RegExp(`rgb(a)?\\(${NUMBER_PATTERN},${NUMBER_PATTERN},${NUMBER_PATTERN}(?:,${NUMBER_PATTERN})?\\)`);
    let TraitColorParseRGBUsingAlloc = class TraitColorParseRGBUsingAlloc extends TraitColorParseRGB {
        parseRGB(input) {
            RGBA_REGEXP.lastIndex = 0;
            const match = RGBA_REGEXP.exec(input);
            if ((match !== null) && (typeof match[1] === typeof match[5])) { // check if 3 params for rgb and 4 for rgba
                return this[ALLOC](ParseNumberLikeValue(match[2], 0, 255) / 255, ParseNumberLikeValue(match[3], 0, 255) / 255, ParseNumberLikeValue(match[4], 0, 255) / 255, (match[5] === void 0)
                    ? 1
                    : ParseNumberLikeValue(match[5], 0, 1));
            }
            else {
                throw new Error(`Invalid rgb(a) color: ${input}`);
            }
        }
    };
    TraitColorParseRGBUsingAlloc = __decorate([
        Trait()
    ], TraitColorParseRGBUsingAlloc);
    //# sourceMappingURL=trait-color-parse-rgb-using-alloc.js.map

    let ImplTraitParseRGBForColorClass = class ImplTraitParseRGBForColorClass extends TraitColorParseRGBUsingAlloc {
    };
    ImplTraitParseRGBForColorClass = __decorate([
        Impl()
    ], ImplTraitParseRGBForColorClass);
    //# sourceMappingURL=color-class-parse-rgb-implementation.js.map

    let TraitColorParse = class TraitColorParse {
    };
    TraitColorParse = __decorate([
        Trait()
    ], TraitColorParse);
    //# sourceMappingURL=trait-color-parse.js.map

    let TraitColorParseUsingParseRGB = class TraitColorParseUsingParseRGB extends TraitColorParse {
        parse(input) {
            const element = document.createElement('div');
            element.style.setProperty('color', input);
            if (element.style.getPropertyValue('color')) {
                document.body.appendChild(element);
                const style = window.getComputedStyle(element);
                const rgbColor = style.color;
                document.body.removeChild(element);
                return this.parseRGB(rgbColor);
            }
            else {
                return null;
            }
        }
    };
    TraitColorParseUsingParseRGB = __decorate([
        Trait()
    ], TraitColorParseUsingParseRGB);
    //# sourceMappingURL=trait-color-parse-using-parse-rgb.js.map

    let ImplTraitParseForColorClass = class ImplTraitParseForColorClass extends TraitColorParseUsingParseRGB {
    };
    ImplTraitParseForColorClass = __decorate([
        Impl()
    ], ImplTraitParseForColorClass);
    //# sourceMappingURL=color-class-parse-implementation.js.map

    let TraitColorGrayscale = class TraitColorGrayscale {
    };
    TraitColorGrayscale = __decorate([
        Trait()
    ], TraitColorGrayscale);
    //# sourceMappingURL=trait-color-grayscale.js.map

    let TraitColorGrayscaleUsingGetColorsAndAlloc = class TraitColorGrayscaleUsingGetColorsAndAlloc extends TraitColorGrayscale {
        grayscale(mode = 'luminosity') {
            let c;
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
                    throw new TypeError(`Unexpected grayscale's mode: '${mode}'`);
            }
            return this[ALLOC](c, c, c, this.getAlpha());
        }
    };
    TraitColorGrayscaleUsingGetColorsAndAlloc = __decorate([
        Trait()
    ], TraitColorGrayscaleUsingGetColorsAndAlloc);
    //# sourceMappingURL=trait-color-grayscale-using-get-colors-and-alloc.js.map

    let ImplTraitGrayscaleForColorStruct = class ImplTraitGrayscaleForColorStruct extends TraitColorGrayscaleUsingGetColorsAndAlloc {
    };
    ImplTraitGrayscaleForColorStruct = __decorate([
        Impl()
    ], ImplTraitGrayscaleForColorStruct);
    //# sourceMappingURL=color-struct-grayscale-implementation.js.map

    let TraitColorFromHSLAObject = class TraitColorFromHSLAObject {
    };
    TraitColorFromHSLAObject = __decorate([
        Trait()
    ], TraitColorFromHSLAObject);
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
    let TraitColorFromHSLAObjectUsingAlloc = class TraitColorFromHSLAObjectUsingAlloc extends TraitColorFromHSLAObject {
        fromHSLAObject(hslaObject) {
            let r, g, b;
            if (hslaObject.s === 0) {
                r = g = b = hslaObject.l; // achromatic
            }
            else {
                const q = hslaObject.l < 0.5 ? hslaObject.l * (1 + hslaObject.s) : hslaObject.l + hslaObject.s - hslaObject.l * hslaObject.s;
                const p = 2 * hslaObject.l - q;
                r = HueToRGB(p, q, hslaObject.h + 1 / 3);
                g = HueToRGB(p, q, hslaObject.h);
                b = HueToRGB(p, q, hslaObject.h - 1 / 3);
            }
            return this[ALLOC](r, g, b, hslaObject.a ? (hslaObject.a) : 1);
        }
    };
    TraitColorFromHSLAObjectUsingAlloc = __decorate([
        Trait()
    ], TraitColorFromHSLAObjectUsingAlloc);
    //# sourceMappingURL=trait-color-from-hsla-object-using-alloc.js.map

    let ImplTraitFromHSLAObjectForColorClass = class ImplTraitFromHSLAObjectForColorClass extends TraitColorFromHSLAObjectUsingAlloc {
    };
    ImplTraitFromHSLAObjectForColorClass = __decorate([
        Impl()
    ], ImplTraitFromHSLAObjectForColorClass);
    //# sourceMappingURL=color-class-from-hsla-object-implementation.js.map

    let TraitColorInvert = class TraitColorInvert {
    };
    TraitColorInvert = __decorate([
        Trait()
    ], TraitColorInvert);
    //# sourceMappingURL=trait-color-invert.js.map

    let TraitColorInvertUsingGetColorsAndAlloc = class TraitColorInvertUsingGetColorsAndAlloc extends TraitColorInvert {
        invert(amount = 1) {
            if ((0 <= amount) && (amount <= 1)) {
                return this[ALLOC](amount * (1 - this.getRed()) + (1 - amount) * this.getRed(), amount * (1 - this.getGreen()) + (1 - amount) * this.getGreen(), amount * (1 - this.getBlue()) + (1 - amount) * this.getBlue(), this.getAlpha());
            }
            else {
                throw new RangeError(`Expected 'amount' in the range [0, 1]`);
            }
        }
    };
    TraitColorInvertUsingGetColorsAndAlloc = __decorate([
        Trait()
    ], TraitColorInvertUsingGetColorsAndAlloc);
    //# sourceMappingURL=trait-color-invert-using-get-colors-and-alloc.js.map

    let ImplTraitInvertForColorStruct = class ImplTraitInvertForColorStruct extends TraitColorInvertUsingGetColorsAndAlloc {
    };
    ImplTraitInvertForColorStruct = __decorate([
        Impl()
    ], ImplTraitInvertForColorStruct);
    //# sourceMappingURL=color-struct-invert-implementation.js.map

    let TraitColorLighten = class TraitColorLighten {
    };
    TraitColorLighten = __decorate([
        Trait()
    ], TraitColorLighten);
    //# sourceMappingURL=trait-color-lighten.js.map

    let TraitColorLightenUsingToAndFromHSLAObject = class TraitColorLightenUsingToAndFromHSLAObject extends TraitColorLighten {
        lighten(amount) {
            const hsla = this.toHSLAObject();
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
        }
    };
    TraitColorLightenUsingToAndFromHSLAObject = __decorate([
        Trait()
    ], TraitColorLightenUsingToAndFromHSLAObject);
    //# sourceMappingURL=trait-color-lighten-using-to-and-from-hsla-object.js.map

    let ImplTraitLightenForColorStruct = class ImplTraitLightenForColorStruct extends TraitColorLightenUsingToAndFromHSLAObject {
    };
    ImplTraitLightenForColorStruct = __decorate([
        Impl()
    ], ImplTraitLightenForColorStruct);
    //# sourceMappingURL=color-struct-lighten-implementation.js.map

    let TraitColorDarken = class TraitColorDarken {
    };
    TraitColorDarken = __decorate([
        Trait()
    ], TraitColorDarken);
    //# sourceMappingURL=trait-color-darken.js.map

    let TraitColorDarkenUsingLighten = class TraitColorDarkenUsingLighten extends TraitColorDarken {
        darken(amount) {
            return this.lighten(-amount);
        }
    };
    TraitColorDarkenUsingLighten = __decorate([
        Trait()
    ], TraitColorDarkenUsingLighten);
    //# sourceMappingURL=trait-color-darken-using-lighten.js.map

    let ImplTraitDarkenForColorStruct = class ImplTraitDarkenForColorStruct extends TraitColorDarkenUsingLighten {
    };
    ImplTraitDarkenForColorStruct = __decorate([
        Impl()
    ], ImplTraitDarkenForColorStruct);
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
    const ColorImplementations = [
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
    const ColorConstructorImplementations = [
        // alloc
        ImplTraitAllocForColorClass,
        // parse
        ImplTraitParseRGBForColorClass,
        ImplTraitParseForColorClass,
        // from
        ImplTraitFromHSLAObjectForColorClass,
    ];
    const ColorImplementationsConstructor = AssembleTraitImplementations(ColorImplementations, ColorConstructorImplementations);
    class Color extends ColorImplementationsConstructor {
        constructor(r, g, b, a) {
            super();
            ConstructColor(this, r, g, b, a);
        }
        get r() {
            return this.getRed();
        }
        set r(value) {
            this.setRed(value);
        }
        get g() {
            return this.getGreen();
        }
        set g(value) {
            this.setGreen(value);
        }
        get b() {
            return this.getBlue();
        }
        set b(value) {
            this.setBlue(value);
        }
        get a() {
            return this.getAlpha();
        }
        set a(value) {
            this.setAlpha(value);
        }
    }

    exports.Color = Color;
    exports.ColorConstructorImplementations = ColorConstructorImplementations;
    exports.ColorImplementations = ColorImplementations;
    exports.ConstructColor = ConstructColor;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=common-classes.esnext.umd.js.map