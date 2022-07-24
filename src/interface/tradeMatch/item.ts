interface IItemBase {
	title: string;
	price: number;
	imgUrl?: string;
	type: string;
}

interface IItem extends IItemBase {
	readonly id: string;
	child?: string;
	parent?: string;
}

interface ITraderItem extends IItem {
	traderPrice: number;
}

export { IItemBase, IItem, ITraderItem };
