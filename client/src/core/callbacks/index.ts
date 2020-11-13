import { clientPerformCallback } from 'core/socket/callbacks';

export const client = clientPerformCallback((m) => ({
  payment_complete: m<() => void>(),
}));
