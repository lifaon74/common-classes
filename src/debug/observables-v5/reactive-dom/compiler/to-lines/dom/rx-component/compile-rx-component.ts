import { createSimpleIteratorCompiler, ISimpleIteratorCompiler } from '../../helpers/create-simple-iterator-compiler';
import { compileRXTemplate } from './compilers/rx-template/compile-rx-template';
import { compileRXInjectTemplate } from './compilers/rx-inject-template/compile-rx-inject-template';
import { compileRXIf } from './compilers/rx-if/compile-rx-if';
import { compileRXForLoop } from './compilers/rx-for-loop/compile-rx-for-loop';
import { compileRXContainer } from './compilers/rx-container/compile-rx-container';

export interface IRXComponentCompiler extends ISimpleIteratorCompiler<Element> {
}

export const DEFAULT_RX_COMPONENT_COMPILERS: IRXComponentCompiler[] = [
  compileRXTemplate,
  compileRXIf,
  compileRXForLoop,
  compileRXContainer,
  compileRXInjectTemplate,
];

export const compileRXComponent = createSimpleIteratorCompiler<Element>(DEFAULT_RX_COMPONENT_COMPILERS);
