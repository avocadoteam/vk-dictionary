import { registerAs } from '@nestjs/config';

export default registerAs('core', () => ({
  port: process.env.PORT || 3000,
  devMode: process.env.NODE_ENV !== 'production',
}));
