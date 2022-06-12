interface IFirestorModelItem {
  title: string;
  price: number;
  imgUrl?: string;
  type: string;
  child?: IFirestorModelItem;
  parent?: IFirestorModelItem;
}

interface IFirestorUpdateModelItem {
  title?: string;
  price?: number;
  imgUrl?: string;
  type?: string;
  child?: IFirestorModelItem;
  parent?: IFirestorModelItem;
}

export { IFirestorModelItem, IFirestorUpdateModelItem };
