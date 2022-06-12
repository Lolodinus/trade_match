interface IItemBase {
  title: string;
  price: number;
  imgUrl?: string;
  type: string;
}

interface IItem extends IItemBase {
  readonly id: string;
  child?: IItemBase;
  parent?: IItemBase;
}

export { IItemBase, IItem };
