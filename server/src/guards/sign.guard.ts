import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';
import coreConfig from 'src/config/core.config';
import integrationConfig from '../config/integration.config';
import { isSignValid } from './operations';

@Injectable()
export class SignGuard implements CanActivate {
  private readonly logger = new Logger(SignGuard.name);

  constructor(
    @Inject(integrationConfig.KEY)
    private config: ConfigType<typeof integrationConfig>,
    @Inject(coreConfig.KEY)
    private common: ConfigType<typeof coreConfig>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const signed = isSignValid(request.query, this.config.vkSecretKey ?? '');
    this.logger.log(`controller ${request.path} result ${signed}`);

    return this.common.devMode || signed;
  }
}
