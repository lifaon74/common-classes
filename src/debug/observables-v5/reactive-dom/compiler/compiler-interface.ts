export type ILines = string[];

export type ICompilerReturn = ILines | null;

/*--*/

export interface IInjectLines {
  (lines: ILines): ILines;
}

export type IInjectCompilerReturn = IInjectLines | null;


