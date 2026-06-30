// Use-case: register a new user (hash password, persist, return tokens).

import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { UserRepository }
from '../../../users/domain/repositories/user.repository';
import { PasswordHasherPort }
from '../ports/password-hasher.port';
import { TokenServicePort }
from '../ports/token-service.port';
import { User }
from '../../../users/domain/entities/user.entity';
import {
 ConflictException
} from '@nestjs/common';

@Injectable()
export class RegisterUseCase {

 constructor(
   private readonly userRepository:UserRepository,
   private readonly passwordHasher:PasswordHasherPort,
   private readonly tokenService:TokenServicePort,
 ){}

 async execute(
   dto:RegisterDto
 ){

   const existingUser=
   await this.userRepository.findByEmail(
     dto.email
   );

   if(existingUser){

      throw new ConflictException(
        'Email already exists'
      );

   }

   const passwordHash=
   await this.passwordHasher.hash(
     dto.password
   );

   const user=
   User.create({

      email:dto.email,
      fullName:dto.fullName,
      passwordHash

   });

   const tokens=
   await this.tokenService.generateTokens({

      sub:user.id,
      email:user.email,
      role:user.role

   });

   const hashedRefreshToken=
   await this.passwordHasher.hash(
      tokens.refreshToken
   );

   user.updateRefreshToken(
      hashedRefreshToken
   );

   await this.userRepository.save(
      user
   );

   return {

      accessToken:
      tokens.accessToken,

      refreshToken:
      tokens.refreshToken

   };

 }

}