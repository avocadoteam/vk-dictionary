import { Module, CacheModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

const redisConnection = CacheModule.registerAsync({
  useFactory: async (configService: ConfigService) =>
    !configService.get<string>('cache.uri')
      ? {
          ttl: configService.get<number>('cache.ttl'),
          max: configService.get<number>('cache.maxItems'),
          store: redisStore,
          host: configService.get<string>('cache.host'),
          port: configService.get<number>('cache.port'),
          db: configService.get<number>('cache.db'),
        }
      : { url: configService.get<string>('cache.uri'), store: redisStore },
  inject: [ConfigService],
});

@Module({
  imports: [redisConnection],
  exports: [redisConnection],
})
export class RedisCacheModule {}
