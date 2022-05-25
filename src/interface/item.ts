interface IItem {
  readonly id: string;
  gameItemId?: string;
  title: string;
  position?: number;
  match?: IItem;
}

export { IItem };
