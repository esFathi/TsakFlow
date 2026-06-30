// Infrastructure mapper for User.
// Converts between User domain entities and ORM/persistence models.

import { User } from '../../domain/entities/user.entity';
import { UserOrmEntity }
from '../persistence/entities/user.orm-entity';

export class UserPersistenceMapper {

 static toOrm(
   domain:User
 ):UserOrmEntity{

   const orm=
   new UserOrmEntity();

   orm.id=domain.id;
   orm.email=domain.email;
   orm.passwordHash=
   domain.passwordHash;

   orm.role=domain.role;

   orm.hashedRefreshToken=
   domain.hashedRefreshToken;

   return orm;

 }

 static toDomain(
 orm:UserOrmEntity
):User{

 return User.restore({

   id:orm.id,
   email:orm.email,
   fullName:orm.fullName,
   passwordHash:orm.passwordHash,
   role:orm.role,
   hashedRefreshToken:
   orm.hashedRefreshToken,
   createdAt:orm.createdAt,
   updatedAt:orm.updatedAt
 });

}

}