import { ISubscribeFunction } from '../../../../../../types/subscribe-function/subscribe-function.type';
import { reactiveTemplateString } from './reactive-template-string';
import { IKeyValueIterable } from '../../../../../../misc/helpers/to-key-value-iterable/key-value-iterable';
import { keyValueIterableLikeToKeyValueIterable } from '../../../../../../misc/helpers/to-key-value-iterable/key-value-iterable-like-to-key-value-iterable';

export interface IReactiveStringObjectParameters {
  [key: string]: ISubscribeFunction<any>;
}

export type IReactiveStringKeyValueParameters = IKeyValueIterable<string, ISubscribeFunction<any>>;

export type IReactiveStringParameters = IReactiveStringKeyValueParameters | IReactiveStringObjectParameters;


const VARIABLE_PATTERN: string = '{{(.*?)}}';
const TRANSLATE_VARIABLE_REGEXP: RegExp = new RegExp(VARIABLE_PATTERN, 'g');

/**
 * Creates a SubscribeFunction from a string template.
 *  - reactiveString('a{{source1}}b{{source2}}c')
 */
export function reactiveString(
  string: string,
  parameters: IReactiveStringParameters = [],
): ISubscribeFunction<string> {
  let match: RegExpExecArray | null;
  const _options: Map<string, ISubscribeFunction<any>> = new Map<string, ISubscribeFunction<any>>(keyValueIterableLikeToKeyValueIterable<string, ISubscribeFunction<any>>(parameters));
  const parts: string[] = [];
  const subscribeFunctions: ISubscribeFunction<any>[] = [];

  let index: number = 0;
  while ((match = TRANSLATE_VARIABLE_REGEXP.exec(string)) !== null) {
    parts.push(string.slice(index, match.index));
    const key: string = match[1].trim();
    if (_options.has(key)) {
      subscribeFunctions.push(_options.get(key) as ISubscribeFunction<any>);
    } else {
      throw new Error(`Missing parameter: '${ key }'`);
    }
    index = match.index + match[0].length;
  }
  parts.push(string.slice(index));
  // console.log(parts, subscribeFunctions);
  return reactiveTemplateString(parts, ...subscribeFunctions);
}
