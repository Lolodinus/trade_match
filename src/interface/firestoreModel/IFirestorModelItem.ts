interface IFirestorModelItem {
  title: string;
  price: number;
  imgUrl?: string;
  type: string;
  child?: IFirestorModelItem;
  parent?: IFirestorModelItem;
  random: {
    0: number,
    1: number,
    2: number
  };
}

interface IFirestorUpdateModelItem {
  title?: string;
  price?: number;
  imgUrl?: string;
  type?: string;
  child?: IFirestorModelItem;
  parent?: IFirestorModelItem;
  random?: {
    0: number,
    1: number,
    2: number
  };
}

export { IFirestorModelItem, IFirestorUpdateModelItem };
