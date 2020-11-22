import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsBigInt(validationOptions: ValidationOptions = {}) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsBigInt',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: propertyName + ' invalid int8',
      },
      validator: {
        validate(value: any) {
          try {
            BigInt(value);
            return true;
          } catch {
            return false;
          }
        },
      },
    });
  };
}
