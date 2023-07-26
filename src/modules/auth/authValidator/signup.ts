import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { model } from "../../../model";

export class signupModel extends model {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsOptional()
  @IsString()
  public password: string;

  @IsOptional()
  @IsString()
  public fullName: string;

  @IsOptional()
  @IsString()
  public mobile_no: string;


  constructor(body: any) {
    super();
    const {
      email,
      password,
      fullName,
      mobile_no,
    } = body;
    this.email = email;
    this.password = password;
    this.fullName = fullName;
    this.mobile_no = mobile_no;
  }
}
