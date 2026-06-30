// Port: password hashing contract (hash + compare).
// Implemented in the infrastructure layer.

export interface PasswordHasherPort {

 hash(
   value:string
 ):Promise<string>;

 compare(
   plain:string,
   hashed:string
 ):Promise<boolean>;

}