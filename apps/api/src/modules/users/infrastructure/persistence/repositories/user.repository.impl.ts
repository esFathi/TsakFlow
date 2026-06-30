// Concrete repository for User.
// Implements the domain repository interface using the persistence layer (ORM).

import {
 Injectable
} from '@nestjs/common';
import {
 InjectRepository
} from '@nestjs/typeorm';
import {
 Repository
} from 'typeorm';
import { UserRepository }
from '../../../domain/repositories/user.repository';
import { User }
from '../../../domain/entities/user.entity';
import { UserOrmEntity }
from '../entities/user.orm-entity';
import { UserPersistenceMapper }
from '../../mappers/user.persistence-mapper';

@Injectable()
export class UserRepositoryImpl
implements UserRepository {

 constructor(

   @InjectRepository(
      UserOrmEntity
   )
   private readonly repository:
   Repository<UserOrmEntity>

 ){}

 async save(
   user:User
 ):Promise<User>{

   const orm=
   UserPersistenceMapper.toOrm(
      user
   );

   const saved=
   await this.repository.save(
      orm
   );

   return UserPersistenceMapper
   .toDomain(saved);

 }

 async findByEmail(
   email:string
 ){

   const user=
   await this.repository.findOne({

      where:{email}

   });

   if(!user)
      return null;

   return UserPersistenceMapper
   .toDomain(user);

 }

 async findById(id:string){

    const user=
    await this.repository.findOne({

       where:{id}

    });

    if(!user)
      return null;

    return UserPersistenceMapper
    .toDomain(user);

 }

 async update(
   user:User
 ){

    await this.repository.save(

      UserPersistenceMapper
      .toOrm(user)

    );

 }

}