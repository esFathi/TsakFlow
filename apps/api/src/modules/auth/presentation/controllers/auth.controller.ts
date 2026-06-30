// HTTP controller for auth: register, login, refresh, and logout endpoints.

import {
 Body,
 Controller,
 HttpCode,
 HttpStatus,
 Post
} from '@nestjs/common';

import { RegisterDto }
from '../../application/dtos/register.dto';

import { RegisterUseCase }
from '../../application/use-cases/register.use-case';

@Controller('auth')
export class AuthController {

 constructor(

   private readonly registerUseCase:
   RegisterUseCase

 ){}

 @Post('register')
 @HttpCode(HttpStatus.CREATED)
 async register(

   @Body()
   dto:RegisterDto

 ){

   return this.registerUseCase.execute(
      dto
   );

 }

}