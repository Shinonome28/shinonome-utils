// not testted
export default function getAccessValueReplaceObject(obj, replaceConfig) {
  return new Proxy(obj, {
    get(target, name, reciever) {
      const inTarget = Reflect.get(target, name, reciever);
      for (let config of replaceConfig) {
        if (config.predicate) {
          if (config.predicate(inTarget)) return config.replacement;
        } else {
          if (inTarget === config.value) return config.replacement;
        }
      }
      return inTarget;
    },
  });
}
