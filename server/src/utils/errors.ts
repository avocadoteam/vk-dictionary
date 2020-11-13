export const errMap = (error: any) =>
  JSON.stringify(error, [
    'message',
    'arguments',
    'type',
    'name',
    'error_type',
    'error_data',
    'statusCode',
    'stack',
  ]);
