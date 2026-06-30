// Input DTO for registration (email, password, name) with validation rules.

import {
 IsEmail,
 IsString,
 MinLength,
 MaxLength,
 Matches
} from 'class-validator';

export class RegisterDto {

 @IsEmail()
 email!:string;

 @IsString()
 @MinLength(3)
 @MaxLength(100)
 fullName!:string;

 @IsString()
 @MinLength(8)
 @Matches(
   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
   {
     message:
     'Password too weak'
   }
 )
 password!:string;

}