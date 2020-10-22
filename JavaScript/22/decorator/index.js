// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _age, _age2;
function ClassD2(constructor) {
    console.log("Class Decorator", constructor);
}
/**
 * Class Decorator
 */
function ClassD(options) {
    return (constructor) => {
        console.log("Class Decorator", options, constructor);
    };
}
/**
 * Method Decorator
 */
function MethodD(options) {
    return (target, key, descriptor) => {
        console.log("Method Decorator", options, target, key, descriptor);
        const original = descriptor.value;
        descriptor.value = function (...args) {
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
function PropertyD(options) {
    return (target, key) => {
        console.log("Property Decorator", options, target, key);
        let val = target[key];
        const getter = () => {
            console.log("Property Decorator getter");
            return val;
        };
        const setter = (next) => {
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
function ParameterD(options) {
    return (target, key, index) => {
        console.log("Parameter Decorator", options, target, key, index);
    };
}
let SampleDecorator = class SampleDecorator {
    constructor() {
        this.names = [];
        _age.set(this, 0);
        _age2.set(this, 0);
        this.name = "test";
    }
    addName(name) {
        this.names.push(name);
    }
    getAge() {
        return __classPrivateFieldGet(this, _age);
    }
};
_age = new WeakMap(), _age2 = new WeakMap();
__decorate([
    PropertyD()
], SampleDecorator.prototype, "name", void 0);
__decorate([
    MethodD(),
    __param(0, ParameterD())
], SampleDecorator.prototype, "addName", null);
SampleDecorator = __decorate([
    ClassD(),
    ClassD2
], SampleDecorator);
const sample = new SampleDecorator();
console.log(sample.name);
sample.name = "123";
console.log(sample.name);
sample.addName("test");
