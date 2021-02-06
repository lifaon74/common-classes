import { IHTMLTemplate } from '../../../light-dom/template/template.type';
import { compileReactiveHTMLAsComponentTemplate } from '../compile/compile-reactive-html-as-component-template';
import { createNetworkErrorFromResponse } from '../../../../misc/errors/network-error/create-network-error';


export function loadAndCompileReactiveHTMLAsComponentTemplate<GData extends object>(
  path: string,
  constantsToImport?: object,
  dataName?: string,
): Promise<IHTMLTemplate<GData>> {
  return fetch(path)
    .then((response: Response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw createNetworkErrorFromResponse(response);
      }
    })
    .then((content: string) => {
      return compileReactiveHTMLAsComponentTemplate(content, constantsToImport, dataName);
    });
}
