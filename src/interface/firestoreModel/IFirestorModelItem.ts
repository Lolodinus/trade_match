interface IFirestorModelItem {
  title: string;
  price: number;
  imgUrl?: string;
  type: {
    id: string;
    value: string;
  };
  child?: IFirestorModelItem;
  parent?: IFirestorModelItem;
}

interface IFirestorUpdateModelItem {
  title?: string;
  price?: number;
  imgUrl?: string;
  type?: {
    id: string;
    value: string;
  };
  child?: IFirestorModelItem;
  parent?: IFirestorModelItem;
}

export { IFirestorModelItem, IFirestorUpdateModelItem };
