function cachingDecorator(func) {
  let cacheParams = [];
  let cacheResult = null;

  return function (...params) {
    if (compareParams(cacheParams, params)) {
      return cacheResult;
    }

    cacheParams = params;
    cacheResult = func(...params);
    return cacheResult;
  };
}

const watch = {};
const computed = {};
const methods = {};

const talker = {
  set: function (obj, prop, value) {
    const oldValue = obj[prop];
    obj[prop] = value;
    if (watch[prop]) watch[prop](value, oldValue);
    return true
  },
  get: function (obj, prop) {
    const computedValue = typeof computed[prop] === 'function' ? computed[prop]() : null;
    const methodFunc = typeof methods[prop] === 'function' ? methods[prop] : null;
    const res = computedValue || methodFunc;
    if (res) {
      return res;
    }
    return obj[prop];
  },
};

export const vue3 = (options) => {
  const vm = new Proxy({}, talker);

  if (options.data) {
    for (const prop in options.data) {
      vm[prop] = options.data[prop];
    }
  }

  if (options.watch) {
    for (const prop in options.watch) {
      watch[prop] = options.watch[prop].bind(vm);
    }
  }

  if (options.computed) {
    for (const prop in options.computed) {
      computed[prop] = options.computed[prop].bind(vm);
    }
  }

  if (options.methods) {
    for (const prop in options.methods) {
      methods[prop] = options.methods[prop].bind(vm);
    }
  }

  if (typeof options.created === 'function') options.created.call(vm);

  return vm;
};
