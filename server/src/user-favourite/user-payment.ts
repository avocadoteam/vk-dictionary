import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import integrationConfig from 'src/config/integration.config';

@Injectable()
export class UserPaymentService {
  private readonly logger = new Logger(UserPaymentService.name);
  constructor(
    private readonly httpService: HttpService,
    @Inject(integrationConfig.KEY)
    private readonly config: ConfigType<typeof integrationConfig>,
  ) {}

  async hasUserAvocadoPlus(vkUserId: string) {
    try {
      const { data } = await this.httpService
        .get(`https://vk.app-dich.com/public-api/donut/${vkUserId}`, {
          headers: {
            authorization: this.config.avoToken,
          },
        })
        .toPromise();

      return !!data?.data?.vkUserId;
    } catch (error) {
      this.logger.log(`hasUserAvocadoPlus error`);
      console.error(error);
      return false;
    }
  }
}
