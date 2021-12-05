import { Employee } from "../employee/employee";
import { Role } from "./role";

export class User {
    id: number;
    username: string;
    email: string ;
	password: number ;
	roles: Role ;
	employee: Employee ;
  }
  