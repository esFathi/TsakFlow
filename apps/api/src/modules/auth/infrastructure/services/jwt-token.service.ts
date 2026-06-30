// Infrastructure implementation of the token-service port (sign/verify JWTs).

import {
 Injectable
} from '@nestjs/common';
import {
 JwtService
} from '@nestjs/jwt';
import {
 TokenPayload,
 AuthTokens,
 TokenServicePort
}
from '../../application/ports/token-service.port';

@Injectable()
export class JwtTokenService
implements TokenServicePort {

 constructor(

 private readonly jwt:
 JwtService

 ){}

 async generateTokens(
   payload:TokenPayload
 ):Promise<AuthTokens>{

   const accessToken=
   await this.jwt.signAsync(

      payload,

      {
        expiresIn:'15m'
      }

   );

   const refreshToken=
   await this.jwt.signAsync(

      payload,

      {
         expiresIn:'7d'
      }

   );

   return {

      accessToken,
      refreshToken

   };

 }

}