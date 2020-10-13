const rawToTask = new WeakMap();
const rawToObservers = new WeakMap();
const rawToProxy = new WeakMap();
const proxyToRaw = new WeakMap();
let currentObserver = null;

function observer(fn) {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

function setObserver(raw, p) {
  if (isFunction(currentObserver)) {
    const observers = rawToObservers.get(raw);
    if (observers) {
      if (!observers.includes(currentObserver)) {
        observers.push(currentObserver);
      }
    } else {
      rawToObservers.set(raw, [currentObserver]);
    }
  }
}

function observable(raw) {
  const proxy = new Proxy(raw, {
    get(target, p) {
      setObserver(raw, p);
      if (isObject(target[p]) && !proxyToRaw.has(target[p])) {
        if (rawToProxy.has(target[p])) {
          return rawToProxy.get(target[p]);
        }
        return observable(target[p]);
      }
      return target[p];
    },
    set(target, p, value) {
      target[p] = value;
      if (Array.isArray(target)) {
        if (p === "length") {
          effect(target, p);
        }
      } else {
        effect(target, p);
      }
      return true;
    }
  });
  rawToProxy.set(raw, proxy);
  proxyToRaw.set(proxy, raw);
  return proxy;
}

function effect(target, p) {
  const observers = rawToObservers.get(target);
  if (observers) {
    // Promise.resolve().then(() => observers.forEach(observer => observer()));
    Promise.resolve()
      .then(() => {
        const isTask = !rawToTask.has(target);
        if (isTask) {
          rawToTask.set(target, observers);
        }
        return isTask;
      })
      .then((isTask) => {
        if (isTask) {
          rawToTask.get(target).forEach(observer => observer());
        }
      })
      .finally(() => rawToTask.delete(target));
  }
}

function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

function isFunction(fn) {
  return typeof fn === "function";
}


function start() {
  const data = observable({a: 1, b: 2});
  observer(() => {
    console.log(data.a, data.b);
  });

  data.a = '123';
  data.b = '456';
}

start();
