import { makeAutoObservable } from "mobx";

export class SelectedItemStore<TItem extends object> {
  constructor() {
    makeAutoObservable(this);
  }

  public selectedItem: TItem | null = null;

  public select = (item: TItem) => {
    this.selectedItem = item;
  };

  public unselect = () => {
    this.selectedItem = null;
  };

  public get isSelected() {
    return Boolean(this.selectedItem);
  }
}

export const createSelectedItemStore = <TItem extends object>() =>
  new SelectedItemStore<TItem>();
