// Types
import IType from "../interface/type";
import { IItem } from "../interface/tradeMatch";

function isType(object: any, properties: string[]): object is IType {
  for (let property of properties) {
    if (!Object.prototype.hasOwnProperty.call(object, property)) {
      return false;
    }
  }
  return true;
}

function isItem(object: any, properties: string[]): object is IItem {
  for (let property of properties) {
    if (!Object.prototype.hasOwnProperty.call(object, property)) {
      return false;
    }
  }
  return true;
}

export { isType, isItem };
