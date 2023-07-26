import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { model } from "../../../model";

export class loginModel extends model {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  constructor(body: any) {
    super();
    const { email, password } = body;

    this.email = email;
    this.password = password;
  }
}
