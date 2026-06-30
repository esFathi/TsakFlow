// Repository interface (port) for User.
// Declares the persistence operations the domain needs
// (findById, save, delete, ...). Implemented in the infrastructure layer.

import { User } from '../entities/user.entity';

export interface UserRepository {
  save(user: User): Promise<User>;

  findByEmail(
    email: string,
  ): Promise<User | null>;

  findById(
    id: string,
  ): Promise<User | null>;

  update(user: User): Promise<void>;
}