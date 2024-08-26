import Store from 'electron-store';

const schema = {
  firstRun: {
    type: 'boolean',
    default: true,
  },
};

export abstract class StoreService {
  private static instance: StoreService;
  private store: Store;

  // Private constructor to prevent direct instantiation
  protected constructor() {
    this.store = new Store({ schema });
  }

  // Static method to get the single instance of StoreService
  public static getInstance(): StoreService {
    if (!StoreService.instance) {
      StoreService.instance = new (class extends StoreService {})();
    }
    return StoreService.instance;
  }

  // Method to get the store instance
  getStore() {
    return this.store;
  }
}
