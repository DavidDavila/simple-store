# SimpleStore

SimpleStore es una clase de Store simple que se puede usar para almacenar datos. La clase SimpleStore se basa en la clase RxJS BehaviorSubject, lo que significa que los datos en la Store son observables. Esto le permite suscribirse a cambios en los datos de la Store. Además, esta hecho en base al Objeto Proxy de JavaScript, con lo que se consigue que las definiciones de las propiedades son totalmente dinámicas.

## Instalación

Para instalar SimpleStore, puede usar el siguiente comando:

```shell
npm install simple-store
```

## Uso

Para usar SimpleStore, primero debe crear una nueva instancia de la clase SimpleStore. Puede hacer esto usando el siguiente código:

```typescript
const SimpleStore = new SimpleStore();
```

### Metodos

- setStore(name: string, data: Store) >>> Genera una nueva Store
- getStore(name: string) >>> Recupera una Store, por el indentificador (el nombre)
- toJson(data: Store) >>> Hace la conversion de una Store a Json

Una vez que haya creado una nueva instancia de la clase SimpleStore, se puede manipular los datos en la Store.

### Importante

Es importante tener en cuenta que el tipado de como se quiere que sea la Store, es algo necesario para hacer un software, más limpio, escalable y entendible. Se ha habilitado que se pueda hacer Stores no tipadas, pero no debería ser la regla a seguir para las implementaciones correctas de la herramienta.

El tipado además agrega una ventaja y es la facilicitaciones de ayudas de código de los IDE como VSCode.

#### Tipado

```typescript
type Driver = {
 name: string;
 age: number;
 number: number;
 team: { name: string; teamPrincipal: string };
};

SimpleStore.setStore<Driver>('Alo14', {
 name: 'Fernando Alonso Diaz',
 age: 42,
 number: 14,
 team: {
  name: 'Aston Martin',
  teamPrincipal: 'Mike Crack',
 },
});
const data = SimpleStore.getStore<Driver>('myStore');
console.log(data.name); // IDE reconoce que propiedades implementa y el tipo de ellas
```

#### Sin tipado

```typescript
SimpleStore.setStore<any>('Alo14', {
 name: 'Fernando Alonso Diaz',
 age: 42,
 number: 14,
 team: {
  name: 'Aston Martin',
  teamPrincipal: 'Mike Crack',
 },
});
const data = SimpleStore.getStore<any>('myStore');
console.log(data.name); // IDE NO reconoce que propiedades implementa, lo trata como any
```

#### Tipado que puede sufrir cambios en una única pantalla

Si nos vemos en la necesidad de que una interfaz, que hayamos definido para una pantalla o un caso concreto, extienda de otra, podemos usar el operador & y extender la interfaz, aunque es recomendable para mejorar la legibilidad hacerlo en la definicion de un nuevo tipo o interfaz, o bien implementarlo en la interfaz matriz con el operador ?, para indicar que puede ser un valor nulo.
Ejemplo:

```typescript
type Driver = {
 name: string;
 age: number;
 number: number;
 team: { name: string; teamPrincipal: string };
};

type DriverWithTeamExtended = Driver & { team: { country: string } };

SimpleStore.setStore<DriverWithTeamExtended>('Alo14', {
 name: 'Fernando Alonso Diaz',
 age: 42,
 number: 14,
 team: {
  name: 'Aston Martin',
  teamPrincipal: 'Mike Crack',
  country: 'England',
 },
});
const data = SimpleStore.getStore<DriverWithTeamExtended>('myStore');
console.log(data.team.country);
```

Otra forma sería mas directa, pero empeora la legibilidad, aunque es totalmente funcional:

```typescript
type Driver = {
 name: string;
 age: number;
 number: number;
 team: { name: string; teamPrincipal: string };
};

SimpleStore.setStore<Driver & { team: { country: string } }>('Alo14', {
 name: 'Fernando Alonso Diaz',
 age: 42,
 number: 14,
 team: {
  name: 'Aston Martin',
  teamPrincipal: 'Mike Crack',
  country: 'England',
 },
});
const data = SimpleStore.getStore<Driver & { team: { country: string } }>('myStore');
console.log(data.team.country);
```

## Observables

SimpleStore, cuando devuelve los datos de una Store, devuelve o bien Store que contienen sub-stores, o cuando ya es un dato real almacenado, lo que devuelve es una instancia de rxjs, BehavieurSubject, por lo que los datos representan observables donde nos podemos subscribirnos en diferentes lugares de la app.

```typescript
type Driver = {
  name: string;
  age: number;
  number: number;
  team: { name: string; teamPrincipal: string };
};

SimpleStore.setStore<Driver>("Alo14", {
  name: "Fernando Alonso Diaz",
  age: 42,
  number: 14,
  team: {
    name: "Aston Martin",
    teamPrincipal: "Mike Crack",
  },
});
const data = SimpleStore.getStore<Driver>("Alo14");
console.log(data.name.subscribe( (value) => {...} ));
console.log(data.team.name( (value) => {...} ));
```

## Actualizacion

Para la actualización de datos en las Store, se hace uso del método heredado por el objecto Store "update()".

El flujo de este método reside en que el padre puede actualizar sus propiedades y los Stores hijos. Por lo que para el ejemplo de Driver, si quisieramos actualizar, la edad del piloto y el nombre del equipo del piloto se haría de la siguiente forma.

```typescript
type Driver = {
  name: string;
  age: number;
  number: number;
  team: { name: string; teamPrincipal: string };
};

SimpleStore.setStore<Driver>("Alo14", {
  name: "Fernando Alonso Diaz",
  age: 41,
  number: 14,
  team: {
    name: "Aston Martin",
    teamPrincipal: "Mike Crack",
  },
});

const data = SimpleStore.getStore<Driver>("Alo14");

// Actualizacion

data.update('age', 42);
data.update('team', {
 name: "Aston Martin F1 Team"
});
// ó
data.team.update('name', "Aston Martin F1 Team");
```

## Eliminar Store

Para la eliminación de una Store, se hace uso del método "deleteStore()".
El método eliminará por completo el Store identificado por su nombre

```typescript
type Driver = {
  name: string;
  age: number;
  number: number;
  team: { name: string; teamPrincipal: string };
};

SimpleStore.setStore<Driver>("Alo14", {
  name: "Fernando Alonso Diaz",
  age: 41,
  number: 14,
  team: {
    name: "Aston Martin",
    teamPrincipal: "Mike Crack",
  },
});

SimpleStore.deleteStore("Alo14");
```
