import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import integrationConfig from '../config/integration.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class VkCallbackGuard implements CanActivate {
  private readonly logger = new Logger(VkCallbackGuard.name);

  constructor(
    @Inject(integrationConfig.KEY)
    private config: ConfigType<typeof integrationConfig>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const sameSecret = request.body.secret === this.config.vkCbSecret;

    this.logger.log(`controller ${request.path} result ${sameSecret}`);

    return sameSecret;
  }
}
