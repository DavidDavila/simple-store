// Generated by CodiumAI

import StoreLite from ".";
 

describe("StoreLite", () => {
  let store!: StoreLite; // Declara store en un ámbito más amplio
  type MyTypeT = {
    data: string;
    level1: {
      level2: { level3: { data: number }; data: number };
      data: number;
    };
  };
  const storeName = "myStore";
  const defaultValue: MyTypeT = {
    data: "example",
    level1: { level2: { level3: { data: 3 }, data: 2 }, data: 1 },
  };
  const updatedValue: MyTypeT = {
    data: "updated",
    level1: { level2: { level3: { data: 4 }, data: 5 }, data: 6 },
  };

  beforeEach(() => {
    store = new StoreLite(); // Inicializa store aquí
  });
  // Tests that a new instance of StoreLite is created with no arguments
  it("should create a new instance of StoreLite with no arguments", () => {
    expect(store).toBeInstanceOf(StoreLite);
  });
  // Tests that a new instance of StoreLite is created with an object argument and the initial value of the StoreLite instance is set to that object
  it("should set the initial value of the StoreLite instance to the object argument", () => {
    const store2 = new StoreLite(defaultValue);
    expect(store2.getValue()).toEqual(defaultValue);
  });
  // Tests that a new store is created and set using the setStore method
  it("should create and set a new store using the setStore method", () => {
    store.setStore<MyTypeT>(storeName, defaultValue);
    expect(store.getValue()).toEqual({ myStore: defaultValue });
  });

  // Tests that an existing store is retrieved using the getStore method
  it("should retrieve an existing store using the getStore method", () => {
    store.setStore<MyTypeT>(storeName, defaultValue);
    const myStore = store.getStore<MyTypeT>(storeName);
    expect(myStore.getValue()).toEqual(defaultValue);
  });

  // Tests that a store's value is updated using the update method
  it("should update a store's value using the update method", () => {
    store.setStore<MyTypeT>(storeName, defaultValue);
    const myStore = store.getStore<MyTypeT>(storeName);
    myStore.update(updatedValue);
    expect(myStore.getValue()).toEqual(updatedValue);
  });

  // Tests that an existing store is deleted using the deleteStore method
  it("should delete an existing store using the deleteStore method", () => {
    store.setStore<MyTypeT>(storeName, defaultValue);
    const userData = store.getStore<MyTypeT>(storeName);
    store.deleteStore(storeName);
    expect(userData.getValue()).toEqual(undefined);
  });

  // Tests that an error is thrown when creating a store with the same name as an existing store
  it("should throw an error when creating a store with the same name as an existing store", () => {
    store.setStore<MyTypeT>(storeName, defaultValue);
    expect(() => {
      store.setStore<MyTypeT>(storeName, updatedValue);
    }).toThrowError(
      `No puedes volver a crear una store. myStore ya está creada con estos datos:\n {\"myStore\":{\"data\":\"example\",\"level1\":{\"level2\":{\"level3\":{\"data\":3},\"data\":2},\"data\":1}}}`
    );
  });

  // Tests that an error is thrown when retrieving a non-existent store using the getStore method
  it("should throw an error when retrieving a non-existent store using the getStore method", () => {
    expect(() => {
      store.getStore<MyTypeT>("nonExistentStore");
    }).toThrowError("Store 'nonExistentStore' does not exist.");
  });

  // Tests that an error is thrown when deleting a non-existent store using the deleteStore method
  it("should throw an error when deleting a non-existent store using the deleteStore method", () => {
    expect(() => {
      store.deleteStore("nonExistentStore");
    }).toThrowError("Store 'nonExistentStore' does not exist.");
  });

  // Tests that subscribing to a store's value changes triggers the subscribed function
  it("should trigger the subscribed function when a store's value changes", () => {
    store.setStore<MyTypeT>(storeName, defaultValue);
    const myStore = store.getStore<MyTypeT>(storeName);
    const mockSubscriber = jest.fn();
    myStore.subscribe(mockSubscriber);
    myStore.update(updatedValue);
    expect(mockSubscriber).toHaveBeenCalledWith(updatedValue);
  });

  // Tests that a store is deleted from the StoreLite instance when the deleteStore method is called
  it("should delete a store when deleteStore method is called", () => {
    store.setStore<MyTypeT>(storeName, defaultValue);
    expect(store.getValue()).toEqual({ myStore: defaultValue });

    store.deleteStore(storeName);
    expect(store.getValue()).toEqual({ myStore: undefined });
  });

  // Tests that creating a store with the same name as an existing store throws an error
  it("should throw an error when creating a store with the same name as an existing store", () => {
    store.setStore<MyTypeT>(storeName, defaultValue);
    expect(() => {
      store.setStore<MyTypeT>(storeName, defaultValue);
    }).toThrowError(
      `No puedes volver a crear una store. myStore ya está creada con estos datos:\n {\"myStore\":{\"data\":\"example\",\"level1\":{\"level2\":{\"level3\":{\"data\":3},\"data\":2},\"data\":1}}}`
    );
  });

  // Tests that retrieving a non-existent store with the getStore method throws an error
  it("should throw an error when retrieving a non-existent store", () => {
    expect(() => {
      store.getStore<MyTypeT>("nonExistentStore");
    }).toThrowError("Store 'nonExistentStore' does not exist.");
  });

  // Test that calling the deleteStore method with the name of a non-existent store throws an error
  it("should throw an error when deleting a non-existent store", () => {
    expect(() => {
      store.deleteStore("nonExistentStore");
    }).toThrowError("Store 'nonExistentStore' does not exist.");
  });

  // Test that calling the toJson method on an instance of StoreLite returns the current value of the instance
  it("should return the current value of the StoreLite instance when calling toJson method", () => {
    const data = { key: "value" };
    store.update(data);
    expect(store.toJson()).toEqual(data);
  });

  it("should return the current value of the StoreLite instance when update a nested data", () => {
    store.setStore<MyTypeT>(storeName, defaultValue);
    const myStore = store.getStore<MyTypeT>(storeName);
    const newValue: number = 77;
    const mockSubscriber = jest.fn();
    myStore.level1.level2.level3.data.subscribe(mockSubscriber);
    myStore.level1.level2.level3.data.update(77);

    expect(mockSubscriber).toHaveBeenCalledWith(newValue);

    expect(myStore.level1.level2.level3.data.getValue()).toEqual(newValue);
  });
});
