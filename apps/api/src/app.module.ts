import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
 imports:[
   ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[
        '.env',
        '../../.env'
      ],
      load:[
        appConfig,
        databaseConfig,
        jwtConfig
      ]
   }),

   TypeOrmModule.forRoot({

      type:'postgres',

      host:process.env.DB_HOST,

      port:Number(
        process.env.DB_PORT
      ),

      username:
      process.env.DB_USERNAME,

      password:
      process.env.DB_PASSWORD,

      database:
      process.env.DB_NAME,

      autoLoadEntities:true,

      synchronize:true
   }),

   UsersModule,
   AuthModule
 ]
})
export class AppModule{}