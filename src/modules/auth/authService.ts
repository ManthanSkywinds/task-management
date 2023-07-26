import { log } from "../../../logger";
import { Bcrypt } from "../../Utils/bcrypt";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { loginModel } from "./authValidator/login";
import { signupModel } from "./authValidator/signup";
import * as l10n from "jm-ez-l10n";
import JWT from "../../Utils/jwt";
import user from "../../model/user.schema";

export class AuthService {
  public log = log.getLogger();
  public bcrypt = new Bcrypt();
  public JWT = new JWT();

  public createNewUser = async (
    createUser: signupModel
  ): Promise<ResponseBuilder> => {
    this.log.info(createUser);
    let hashPassword: string;
    if (createUser.password) {
      hashPassword = await this.bcrypt.getHashedPassword(createUser.password);
    }
    const updateduserObj = {
      ...createUser,
      password: createUser.password ? hashPassword : null,
      email: createUser.email.toLowerCase(),
      mobile_no: createUser.mobile_no,
    };
    const userObj = new user(updateduserObj);
    await userObj.save();
    return ResponseBuilder.data({},l10n.t("USER_CREATED_SUCCESS"));
  };

  public getUser = async (newUser: loginModel) => {
    const { email } = newUser;
    return await user.findOne({ email });
  };

  public login = async (user: loginModel): Promise<ResponseBuilder> => {
    const { password } = user;
    const userDetails: any = await this.getUser(user);
    if (userDetails) {
      const validPassword = await this.bcrypt.comparePassword(
        password,
        userDetails.password
      );
      if (validPassword) {
        const payload = {
          user_id: userDetails._id,
          account_type: 'user',
        };
        const access_token = this.JWT.signJWT(payload);
        return ResponseBuilder.data(
          { data: { access_token, account_type: userDetails.account_type } },
          l10n.t("LOGIN_SUCCESSFULL")
        );
      } else {
        return ResponseBuilder.badRequest(l10n.t("INVALID_CREDENTIAL"));
      }
    } else {
      return ResponseBuilder.badRequest(l10n.t("INVALID_CREDENTIAL"));
    }
  };

  public isUserExists = async (newUser: signupModel): Promise<boolean> => {
    const result = await user.exists({
      email: newUser.email,
    });
    return result && result._id;
  };

}
