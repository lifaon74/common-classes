export function createIsNodeAChildOfError(
  childName: string,
  parentName: string,
): Error {
  return new Error(`${ childName } is not a child of ${ parentName }`);
}




