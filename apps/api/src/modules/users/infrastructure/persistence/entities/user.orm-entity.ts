// Persistence (ORM) model for User.
// Maps the User to a database table/schema. Kept separate from the domain entity.

import {
 Entity,
 Column,
 PrimaryColumn,
 CreateDateColumn,
 UpdateDateColumn,
 Index
} from 'typeorm';

import { UserRole } from '../../../domain/entities/user.entity';

@Entity('users')
export class UserOrmEntity {

 @PrimaryColumn('uuid')
 id!:string;

 @Index({unique:true})
 @Column()
 email!:string;

 @Column()
 fullName!:string;

 @Column()
 passwordHash!:string;

 @Column({
   type:'enum',
   enum:UserRole,
   default:UserRole.USER
 })
 role!:UserRole;

 @Column({
   nullable:true
 })
 hashedRefreshToken?:string;

 @CreateDateColumn()
 createdAt!:Date;

 @UpdateDateColumn()
 updatedAt!:Date;

}