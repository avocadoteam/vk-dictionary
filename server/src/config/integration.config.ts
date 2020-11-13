import { registerAs } from '@nestjs/config';

export default registerAs('integration', () => ({
  vkServiceKey: process.env.VK_SERVICE_KEY,
  vkSecretKey: process.env.VK_SECRET_KEY,
  sentryDNS: process.env.SENTRY_DNS,
  vkConfirmCode: process.env.VK_CONFIRM_CODE,
  vkCbSecret: process.env.VK_CB_SECRET,
}));
