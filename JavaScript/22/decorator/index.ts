// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

function ClassD2(constructor: Function) {
  console.log("Class Decorator", constructor);
}

/**
 * Class Decorator
 */
function ClassD(options?: any): ClassDecorator {
  return (constructor: Function) => {
    console.log("Class Decorator", options, constructor);
  };
}

/**
 * Method Decorator
 */
function MethodD(options?: any): MethodDecorator {
  return (
    target: Object,
    key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    console.log("Method Decorator", options, target, key, descriptor);

    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(original);
      const result = original.apply(this, args);
      return result;
    };

    return descriptor;
  };
}

/**
 * Property Decorator
 */
function PropertyD(options?: any): PropertyDecorator {
  return (target: any, key: string | symbol) => {
    console.log("Property Decorator", options, target, key);

    let val = target[key];

    const getter = () => {
      console.log("Property Decorator getter");
      return val;
    };
    const setter = (next: any) => {
      console.log("Property Decorator setter");
      val = `add: ${next}`;
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

/**
 * Parameter Decorator
 */
function ParameterD(options?: any): ParameterDecorator {
  return (target: Object, key: string | symbol, index: number) => {
    console.log("Parameter Decorator", options, target, key, index);
  };
}

@ClassD()
@ClassD2
class SampleDecorator {
  names: string[] = [];
  #age: number = 0;
  #age2: number = 0;

  @PropertyD()
  name = "test";

  @MethodD()
  addName(@ParameterD() name: string): void {
    this.names.push(name);
  }

  getAge(): number {
    return this.#age;
  }
}

const sample = new SampleDecorator();

console.log(sample.name);
sample.name = "123";
console.log(sample.name);

sample.addName("test");
