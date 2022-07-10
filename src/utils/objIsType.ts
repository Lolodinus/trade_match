// Types
import IType from "../interface/tradeMatch/type";
import { IItem, IUser } from "../interface/tradeMatch";
import { imgExtantion } from "../interface/other/other";

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

function isUser(object: any, properties: string[]): object is IUser {
  for (let property of properties) {
    if (!Object.prototype.hasOwnProperty.call(object, property)) {
      return false;
    }
  }
  return true;
}

function isError(something: any): something is Error {
  return something.message;
}

function isImgExt(ext: any): ext is imgExtantion {
	return ext;
}

export { isType, isItem, isUser, isError, isImgExt };
