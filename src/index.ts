 
import { OrderUIT, eventInstance } from "./core/classes/events";
import { Utils } from "./core/classes/utils";
import {
  ErrorGetStoreT,
  ErrorSetStoreT,
  transformToDynamicType,
} from "./core/types/dynamic-types.function";
import {SimpleBehaviorSubject} from 'simple-behavior-subject'
let isParentStore = true; //TODO: Buscar otro metodo para localizar el store padre e inicializar la extensión

export default class SimpleStore extends SimpleBehaviorSubject<Object> {
  [key: string]: any;

  constructor(store: any = {}) {
    super({});

    if (isParentStore) {
      eventInstance.sendEventUI(OrderUIT.create, {});
      this.subscribe((data) => {
        eventInstance.sendEventUI(OrderUIT.create, data);
      });
      isParentStore = false;
    }
    for (const [key, value] of Object.entries(store)) {
      this.setStore(key, value);
    }
  }

  /**
   *## Summary
The `setStore` method is used to create and set a new store in the `SimpleStore` class. It takes the name of the store and the initial data as input. If the store already exists, an error is thrown. If the initial data is a sub-store, a new instance of `SimpleStore` is created. Otherwise, a new instance of `Data` is created. The method also subscribes to changes in the store's value and updates the `SimpleStore` instance with the new store data.

## Example Usage
```javascript
const store = new SimpleStore();
const myStore = store.setStore<{data:string}>('myStore', { data: 'example' });
console.log(myStore.getValue()); // Output: { myStore: { data: 'example' } }
```

## Code Analysis
### Inputs
- `name` (string): The name of the store to be created and set.
- `storeData` (T): The initial data for the store.
___
### Flow
1. Check if a store with the given name already exists in the `SimpleStore` instance.
2. If the store exists, throw an error indicating that the store cannot be created again.
3. If the initial data is a sub-store, create a new instance of `SimpleStore` with the initial data.
4. If the initial data is not a sub-store, create a new instance of `Data` with the initial data.
5. Subscribe to changes in the value of the new store and update the `SimpleStore` instance with the new store data.
6. Return the newly created store.
___
### Outputs
- The newly created store is returned, either as an instance of `SimpleStore` or `Data`.
___

   *
   * @template T
   * @param {string} name
   * @param {T} storeData
   * @returns {*}  {(SimpleStore | Data<T>)}
   * @memberof SimpleStore
   */
  setStore<T = ErrorSetStoreT>(
    name: string,
    storeData: T
  ): SimpleStore | SimpleBehaviorSubject<T> {
    if (this[name]) {
      throw new Error(
        `No puedes volver a crear una store. ${name} ya está creada con estos datos:\n ${JSON.stringify(
          this.getValue()
        )}`
      );
    } else {
      if (Utils.isASubStore(storeData)) {
        this[name] = new SimpleStore(storeData);
      } else {
        this[name] = new SimpleBehaviorSubject(storeData);
      }

      this[name].subscribe((val: any) => {
        this.update({ ...this.getValue(), [name]: val });
      });

      this.update({ ...this.getValue(), [name]: storeData });
    }
    return this[name];
  }
  /**
   * ## Summary
The `getStore` method is used to retrieve a store from the `SimpleStore` class. It takes the name of the store as input and returns the store if it exists. If the store does not exist, it throws an error.

## Example Usage
```javascript
const store = new SimpleStore();
store.setStore<{data:string}>('myStore', { data: 'example' });
const myStore = store.getStore<{data:string}>("myStore");
console.log(myStore.getValue()); // Output: { data: 'example' }
```

## Code Analysis
### Inputs
- `name` (string): The name of the store to retrieve.
___
### Flow
1. Get the store with the given name from the `SimpleStore` instance.
2. If the store does not exist, throw an error.
3. Return the store.
___
### Outputs
- The retrieved store is returned.
___

   *
   * @template T
   * @param {string} name
   * @returns {*}  {ReturnType<typeof transformToDynamicType}
   * @memberof SimpleStore
   */
  getStore<T = ErrorGetStoreT>(
    name: string
  ): ReturnType<typeof transformToDynamicType<T>> {
    const store = this[name] as ReturnType<typeof transformToDynamicType<T>>;
    if (!store) {
      throw new Error(`Store '${name}' does not exist.`);
    }
    return store;
  }

  /**
## Summary
The `deleteStore` method is used to delete a store from the `SimpleStore` class. It takes the name of the store as input, checks if the store exists, and deletes it. It then updates the value of the `SimpleStore` instance with the updated store data.

## Example Usage
```javascript
const store = new SimpleStore();
store.setStore<{data:string}>('myStore', { data: 'example' });
store.deleteStore('myStore');
console.log(store.getValue()); // Output: {}
```

## Code Analysis
### Inputs
- `store` (string): The name of the store to be deleted.
___
### Flow
1. Get the store with the given name from the `SimpleStore` instance using the `getStore` method.
2. If the store does not exist, throw an error.
3. Delete the store from the `SimpleStore` instance using the `delete` keyword.
4. Update the value of the `SimpleStore` instance with the updated store data using the `update` method.
___
### Outputs
- None. The store is deleted from the `SimpleStore` instance.
___


   *
   * @template T
   * @param {string} name
   * @returns {*}  {void}
   * @memberof SimpleStore
   */
  deleteStore(store: string): void {
    this.getStore(store);
    this[store].update(undefined);
    this.update(this.getValue());
  }

  toJson() {
    return this.getValue();
  }
}
