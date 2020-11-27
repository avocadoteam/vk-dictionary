import * as sentry from '@sentry/node';

export const errMap = (error: any) => {
  const message = JSON.stringify(error, [
    'message',
    'arguments',
    'type',
    'name',
    'error_type',
    'error_data',
    'statusCode',
    'stack',
  ]);

  sentry.captureEvent({
    message,
    level: sentry.Severity.Error,
  });

  return message;
};
