import * as RateLimiter from 'rate-limiter-flexible';
import * as redis from 'redis';
import * as moment from 'moment';
import { Response, Request } from 'express';
import { HttpStatus, Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import cacheConfig from 'src/config/cache.config';

@Injectable()
export class FetchLimiter implements NestMiddleware {
  limiter: RateLimiter.RateLimiterRedis;
  constructor(
    @Inject(cacheConfig.KEY)
    private config: ConfigType<typeof cacheConfig>,
  ) {
    const connection: redis.ClientOpts = config.uri
      ? { url: config.uri }
      : {
          host: config.host,
          port: Number(config.port),
          db: config.db,
        };

    this.limiter = new RateLimiter.RateLimiterRedis({
      storeClient: redis.createClient({
        enable_offline_queue: false,
        ...connection,
      }),
      points: 4, // Number of points
      duration: 1, // Per second(s)
      keyPrefix: 'rlflx', // must be unique for limiters with different purpose
    });
  }

  async use(req: Request, res: Response, next: () => void) {
    try {
      await this.limiter.consume(req.ip);
      next();
    } catch (rateLimiterRes) {
      const error = `You've made too many attempts in a short period of time, please try again at ${moment()
        .add(rateLimiterRes.msBeforeNext, 'milliseconds')
        .format()}`;
      return res.status(HttpStatus.TOO_MANY_REQUESTS).send({ error });
    }
  }
}
