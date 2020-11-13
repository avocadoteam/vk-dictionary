import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'src/config/db.config';
import cacheConfig from 'src/config/cache.config';
import coreConfig from 'src/config/core.config';
import integrationConfig from 'src/config/integration.config';
import { FetchLimiter } from './interceptors/rate-limiter';
import { ScheduleModule } from '@nestjs/schedule';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, cacheConfig, coreConfig, integrationConfig],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     ...(configService.get<string>('database.psqlUrl')
    //       ? {
    //           url: configService.get<string>('database.psqlUrl'),
    //         }
    //       : {
    //           host: configService.get<string>('database.host'),
    //           port: configService.get<number>('database.port'),
    //           username: configService.get<string>('database.username'),
    //           password: configService.get<string>('database.password'),
    //           database: configService.get<string>('database.dbName'),
    //         }),
    //     entities: [__dirname + '/db/tables/*{.ts,.js}'],
    //     migrations: [__dirname + '/db/migrations/*{.ts,.js}'],
    //     synchronize: false,
    //     migrationsRun: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    EventsModule
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FetchLimiter).forRoutes(AppController);
  }
}
