// User feature module.
// Wires together the controller, use-cases, and repository binding
// (domain repository interface -> infrastructure implementation).

import {
 Module
} from '@nestjs/common';

import {
 TypeOrmModule
} from '@nestjs/typeorm';

import { UserOrmEntity }
from './infrastructure/persistence/entities/user.orm-entity';

import { UserRepositoryImpl }
from './infrastructure/persistence/repositories/user.repository.impl';

import {
 INJECTION_TOKENS
}
from '../../core/constants/injection-tokens';

@Module({

 imports:[

   TypeOrmModule.forFeature([
      UserOrmEntity
   ])

 ],

 providers:[

   {

    provide:
    INJECTION_TOKENS.USER_REPOSITORY,

    useClass:
    UserRepositoryImpl

   }

 ],

 exports:[
   INJECTION_TOKENS.USER_REPOSITORY
 ]

})
export class UsersModule{}