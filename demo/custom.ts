

import StoreLite from "../src/index";
const simpleStore = new StoreLite();

type UserDataT = { name: string; address: { city: string; cp: number } };

const defaultData: UserDataT = {
  name: "David",
  address: { city: "Madrid", cp: 28007 },
};

const defaultMock: UserDataT = {
  name: "Nombre",
  address: { city: "Ciudad", cp: 0 },
};

simpleStore.setStore<UserDataT>("userData", defaultMock);

const userData = simpleStore.getStore<UserDataT>("userData");
userData;
userData.update(defaultData);
console.log(userData.getValue());
simpleStore.deleteStore("userData");

userData.subscribe((data: UserDataT) => {
  console.log("[Subscription STORE] data:", data);
});

userData.name.subscribe((data: string) => {
  console.log("[Subscription NAME] data:", data);
});
userData.address.subscribe((data: { city: string; cp: number }) => {
  console.log("[Subscription ADDESS] data:", data);
});
userData.address.city.subscribe((data: string) => {
  console.log("[Subscription ADRESS CITY] data:", data);
});
userData.address.cp.subscribe((data: number) => {
  console.log("[Subscription ADRESS CP] data:", data);
});
window["changeAll"] = () => {
  userData.update({ address: { city: "aaa", cp: 290 }, name: "XXX" });
};

window["changeName"] = () => {
  userData.name.update("AAAA");
};

window["changeAdress"] = () => {
  userData.address.update({ city: "TTT", cp: 1 });
};

window["changeCity"] = () => {
  userData.address.city.update("PPP");
};

window["changeCp"] = () => {
  userData.address.cp.update(77);
};




