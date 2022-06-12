import { isType, isItem } from "../../utils/objIsType";

// Types
import IType from "../../interface/type";
import { IItem } from "../../interface/tradeMatch";

function transformDataToType(data: any[]): IType[] {
  const types: IType[] = [];
  for (let item of data) {
    if (isType(item, ["id", "value"])) {
      types.push({
        id: item.id,
        value: item.value
      });
    }
  }
  return types;
}

function transformDataToItem(data: any[]): IItem[] {
  const items: IItem[] = [];
  for (let item of data) {
    if (isItem(item, ["id", "title", "price", "type"])) {
      const transformItem: IItem = {
        id: item.id,
        title: item.title,
        price: item.price,
        type: item.type
      };
      if (item.imgUrl) transformItem.imgUrl = item.imgUrl;
      items.push(transformItem);
    }
  }
  return items;
}

export { transformDataToType, transformDataToItem };
