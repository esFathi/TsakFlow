import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";

import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", "../../.env"],
      load: [appConfig, databaseConfig, jwtConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "postgres" as const,
          host: config.get<string>("DB_HOST"),
          port: Number(config.get<string>("DB_PORT")),
          username: config.get<string>("DB_USERNAME"),
          password: config.get<string>("DB_PASSWORD"),
          database: config.get<string>("DB_NAME"),
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),

    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
