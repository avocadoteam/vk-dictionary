import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import * as qs from 'querystring';
import * as crypto from 'crypto';
import integrationConfig from '../config/integration.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class SignGuard implements CanActivate {
  private readonly logger = new Logger(SignGuard.name);

  constructor(
    @Inject(integrationConfig.KEY)
    private config: ConfigType<typeof integrationConfig>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const ordered: { [key: string]: any } = {};
    Object.keys(request.query)
      .sort()
      .forEach((key) => {
        if (key.slice(0, 3) === 'vk_') {
          ordered[key] = request.query[key];
        }
      });

    const stringParams = qs.stringify(ordered);
    const paramsHash = crypto
      .createHmac('sha256', this.config.vkSecretKey ?? '')
      .update(stringParams)
      .digest()
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=$/, '');

    const signed = paramsHash === request.query.sign;
    this.logger.log(`controller ${request.path} result ${signed}`);

    return signed;
  }
}
