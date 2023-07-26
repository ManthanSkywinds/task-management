import { Request, Response } from "express";
import * as l10n from "jm-ez-l10n";
import { AuthService } from "./authService";
import { CONSTANCE } from "../../config/constance";
import { log } from "../../../logger";

export class AuthMiddleware {
  public authService = new AuthService();
  public logger = log.getLogger();

  public isUserExist = async (req: Request, res: Response, next: any) => {
    const isUserExist: boolean = await this.authService.isUserExists(
      req.body
    );
    this.logger.info(isUserExist);
    if (!(isUserExist)) {
      next();
    } else {
      return res.status(CONSTANCE.RES_CODE.error.badRequest).send({
        status: CONSTANCE.FAIL,
        error: l10n.t("ERR_USER_PROFILE_EXIST", {
          EMAIL: req.body.email,
        }),
      });
    }
  };
}
