// Types
import IType from "../interface/type";

function isType(object: any, properties: string[]): object is IType {
  for (let property of properties) {
    if (!Object.prototype.hasOwnProperty.call(object, property)) {
      return false;
    }
  }
  return true;
}

export { isType };
