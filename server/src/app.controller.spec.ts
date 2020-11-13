import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule } from '@nestjs/config';
import integrationConfig from './config/integration.config';

const mockQ =
  '?vk_access_token_settings=&vk_app_id=7511650&vk_are_notifications_enabled=1&vk_is_app_user=1&vk_is_favorite=0&vk_language=en&vk_platform=mobile_iphone&vk_ref=super_app&vk_user_id=11437372&sign=AbJvMKh6cNRWaJyjATasbTWimqJWzfyDAbIdLz3lEr8';

describe('get root file in AppController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [integrationConfig],
          isGlobal: true,
        }),
      ],
      controllers: [AppController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`should return a js entrypoint`, async () => {
    const response = await request(app.getHttpServer())
      .get(`/${mockQ}`)
      .expect(HttpStatus.OK);

    expect(response.header['content-type']).toEqual('text/html; charset=UTF-8');
  });

  it(`should not allow to get a js entrypoint`, async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.FORBIDDEN);
  });

  afterAll(async () => {
    await app.close();
  });
});
