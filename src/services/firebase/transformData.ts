import { isType } from "../../utils/objIsType";

// Types
import IType from "../../interface/type";

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

export { transformDataToType };
