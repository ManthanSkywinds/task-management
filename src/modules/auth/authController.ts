import { log } from "../../../logger";
import { CONSTANCE } from "../../config/constance";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { AuthService } from "./authService";
import { Request, Response } from "express";

export class authController {
  public authService = new AuthService();
  public logger = log.getLogger();

  public signup = async (req: Request, res: Response) => {
    try {
      const result: ResponseBuilder = await this.authService.createNewUser(
        req.body
      );

      return res
        .status(result.code)
        .send({ status: CONSTANCE.SUCCESS, data: result.result });
    } catch (error) {
      this.logger.error(error);
      return res
        .status(
          error.code ? error.code : CONSTANCE.RES_CODE.error.internalServerError
        )
        .send({ status: CONSTANCE.FAIL, error: error.message });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const result: ResponseBuilder = await this.authService.login(req.body);
      if (result.status !== CONSTANCE.FAIL) {
        res.status(result.code).json(result.result);
      } else {
        res.status(result.code).json({
          status: result.status,
          error: result.error,
          code: CONSTANCE.RES_CODE.error.badRequest,
        });
      }
    } catch (error) {
      this.logger.error(error);

      return res
        .status(
          error.code ? error.code : CONSTANCE.RES_CODE.error.internalServerError
        )
        .send({ status: CONSTANCE.FAIL, error: error.message });
    }
  };

}
