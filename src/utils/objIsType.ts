// Types
import { IItem, IUser, ITrader, IType } from "../interface/tradeMatch";
import { imgExtantion } from "./getExtention";


function isType(object: any, properties: Array<keyof IType>): object is IType {
  for (let property of properties) {
    if (!Object.prototype.hasOwnProperty.call(object, property)) {
      return false;
    }
  }
  return true;
}

function isItem(object: any, properties: Array<keyof IItem>): object is IItem {
  for (let property of properties) {
    if (!Object.prototype.hasOwnProperty.call(object, property)) {
      return false;
    }
  }
  return true;
}

function isTrader(object: any, properties: Array<keyof ITrader>): object is ITrader {
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

function isFile(obj: any): obj is File {
  return obj.size !== undefined || obj.type !== undefined;
}


export { isType, isItem, isTrader, isUser, isError, isImgExt, isFile };
