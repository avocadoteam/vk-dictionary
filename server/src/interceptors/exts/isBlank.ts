import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotBlank(validationOptions: ValidationOptions = {}) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotBlank',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        ...validationOptions,
        message: propertyName + ' should not be empty',
      },
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.trim().length > 0; // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
