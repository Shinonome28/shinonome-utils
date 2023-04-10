export default function getAllAccessToOneValueObject(value) {
  return new Proxy(
    {},
    {
      get(target, name, reciever) {
        return value;
      },
    }
  );
}
