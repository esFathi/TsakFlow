// Auth feature module.
// Wires auth controller, use-cases, strategies (JWT/local) and guards.

import {
 Module
} from '@nestjs/common';

import {
 JwtModule
} from '@nestjs/jwt';

import {
 AuthController
}
from './presentation/controllers/auth.controller';

import {
 RegisterUseCase
}
from './application/use-cases/register.use-case';

import {
 BcryptPasswordHasherService
}
from './infrastructure/services/bcrypt-password-hasher.service';

import {
 JwtTokenService
}
from './infrastructure/services/jwt-token.service';

import {
 JwtStrategy
}
from './infrastructure/strategies/jwt.strategy';

import {
 UsersModule
}
from '../users/users.module';

import {
 INJECTION_TOKENS
}
from '../../core/constants/injection-tokens';

@Module({

 imports:[
   JwtModule,
   UsersModule
 ],

 controllers:[
   AuthController
 ],

 providers:[

   RegisterUseCase,

   JwtStrategy,

   {

      provide:
      INJECTION_TOKENS.PASSWORD_HASHER,

      useClass:
      BcryptPasswordHasherService

   },

   {

      provide:
      INJECTION_TOKENS.TOKEN_SERVICE,

      useClass:
      JwtTokenService

   }

 ]

})
export class AuthModule{}