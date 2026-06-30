// Guard protecting routes with the JWT strategy (skips routes marked @Public).

import {
 Injectable
} from '@nestjs/common';

import {
 AuthGuard
} from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard
extends AuthGuard(
  'jwt'
){}