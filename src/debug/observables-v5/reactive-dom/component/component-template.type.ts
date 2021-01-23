
export interface IComponentTemplate<GData extends object> {
  (data: GData): Promise<DocumentFragment> | DocumentFragment;
}



