import { registerAs } from '@nestjs/config';

export default registerAs('integration', () => ({
  vkServiceKey: process.env.VK_SERVICE_KEY,
  vkSecretKey: process.env.VK_SECRET_KEY,
  sentryDNS: process.env.SENTRY_DNS,
  vkConfirmCode: process.env.VK_CONFIRM_CODE,
  vkCbSecret: process.env.VK_CB_SECRET,
  splashAccessKey: process.env.SPLASH_ACCESS_KEY,
  splashSecretKey: process.env.SPLASH_SECRET_KEY,
  ibmSecretKey: process.env.IBM_SECRET_KEY,
}));
