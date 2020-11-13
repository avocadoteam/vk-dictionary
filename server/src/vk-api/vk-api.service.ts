import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { vkApiV } from 'src/constants';
import { buildQueryString } from 'src/utils/api';
import { errMap } from 'src/utils/errors';

@Injectable()
export class VkApiService {
  private readonly logger = new Logger(VkApiService.name);
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  async updateWithAvatars(userIds: number[]) {
    if (!userIds.length) {
      return [];
    }
    try {
      const ids = userIds.join(',');
      const result = await this.httpService
        .post(
          `https://api.vk.com/method/users.get${buildQueryString([
            { user_ids: `${ids}` },
            { fields: 'photo_100' },
            {
              access_token: this.configService.get<string>(
                'integration.vkServiceKey',
                '',
              ),
            },
            { v: vkApiV },
            { lang: 'ru' },
          ])}`,
        )
        .toPromise();

      if (result.data.error) {
        this.logger.log(
          `updateWithAvatars failed ${result.data.error?.error_msg}`,
        );
        return [];
      }
      if (result.data.response && result.data.response.error) {
        this.logger.log(
          `updateWithAvatars failed ${result.data.response?.error}`,
        );
        return [];
      }

      const avatars: {
        id: number;
        photo_100: string;
        first_name: string;
        last_name: string;
      }[] = result.data.response;

      const updatedUsers: {
        userId: number;
        avatar: string;
        name: string;
        firstName: string;
        lastName: string;
      }[] = avatars.map((a) => ({
        userId: a.id,
        avatar: a.photo_100,
        name: `${a.first_name || ''} ${a.last_name || ''}`,
        firstName: a.first_name || '',
        lastName: a.first_name || '',
      }));

      this.logger.log(`updateWithAvatars done`);
      return updatedUsers;
    } catch (error) {
      this.logger.log(`updateWithAvatars error`);
      this.logger.error(errMap(error));
      return [];
    }
  }

  async sendPushNotification(userIds: number[]) {
    if (!userIds.length) {
      return;
    }
    try {
      const result = await this.httpService
        .post(
          `https://api.vk.com/method/notifications.sendMessage${buildQueryString(
            [
              { user_ids: userIds.join(',') },
              { message: 'Kek' }, //notificationMessage },
              {
                access_token: this.configService.get<string>(
                  'integration.vkServiceKey',
                  '',
                ),
              },
              { v: vkApiV },
            ],
          )}`,
        )
        .toPromise();

      if (result.data.error) {
        this.logger.log(`notification failed ${result.data.error?.error_msg}`);
      }
      if (result.data.response[0] && result.data.response[0].error) {
        this.logger.log(
          `notification failed ${result.data.response[0]?.error}`,
        );
      }

      this.logger.log(`notification sent`);
    } catch (error) {
      this.logger.log(`notification error`);
      this.logger.error(errMap(error));
    }
  }
}
