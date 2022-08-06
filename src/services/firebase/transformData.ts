import { isType, isItem, isTrader } from "../../utils/objIsType";

// Types
import IType from "../../interface/tradeMatch/type";
import { IItem, ITrader } from "../../interface/tradeMatch";

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
			if (item.child) transformItem.child = item.child;
			if (item.parent) transformItem.parent = item.parent;
			items.push(transformItem);
		}
	}
	return items;
}

function transformDataToTrader(data: any[]): ITrader[] {
	const traders: ITrader[] = [];
	for (let trader of data) {
		if (isTrader(trader, ["id", "name", "imgUrl", "type"])) {
			const transformTrader: ITrader = {
				id: trader.id,
				name: trader.name,
				imgUrl: trader.imgUrl,
				type: trader.type
			};
			traders.push(transformTrader);
		}
	}
	return traders;
}

export { transformDataToType, transformDataToItem, transformDataToTrader };
