import { ICustomElementOptions } from './custom-element/custom-element-functions';
import { IComponentTemplate } from './component-template.type';

export interface IComponentOptions<GData extends object> extends ICustomElementOptions {
  template?: IComponentTemplate<GData>;
  // style?: TNativePromiseLikeOrValue<IStyle>;
  // host?: IHostBinding<any>[];
}
