import { SimpleBehaviorSubject } from "simple-behavior-subject";
import { SimpleBehaviorSubjectI } from "simple-behavior-subject/dist/index.types";

 

export function transformToDynamicType<T>(obj: T): {
  [K in keyof T]: T[K] extends object | undefined
    ? ReturnType<typeof transformToDynamicType<T[K]>>
    : SimpleBehaviorSubject<T[K]>;
} & SimpleBehaviorSubjectI<T> {
  const result: any = obj;
  return result;
}

export type ErrorGetStoreT = "Please specify the store type. getStore<MyType>";
export type ErrorSetStoreT = "Please specify the store type. setStore<MyType>";
