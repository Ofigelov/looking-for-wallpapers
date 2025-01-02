import { computed, makeObservable } from "mobx";

type InfiniteStatusesContainer = {
  isLoading: boolean;
  isEndReached: boolean;
  fetchMore: () => void;
};

export abstract class InfiniteStatusesStore {
  constructor(private readonly _container: InfiniteStatusesContainer) {
    makeObservable(this, { isLoading: computed, isEndReached: computed });
  }

  public get isLoading() {
    return this._container.isLoading;
  }

  public get isEndReached() {
    return this._container.isEndReached;
  }

  public fetchMore = () => {
    this._container.fetchMore();
  };
}
