import { SimpleBehaviorSubject } from "simple-behavior-subject";

 

export class Utils {
  static isASubStore(value: any): boolean {
    return (
      value instanceof Object &&
      !(value instanceof Array) &&
      !(value instanceof SimpleBehaviorSubject)
    );
  }
}
