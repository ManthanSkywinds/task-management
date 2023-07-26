import { isEmpty } from "lodash";
import { CONSTANCE } from "../config/constance";
import * as l10n from "jm-ez-l10n";
import JWT from "../Utils/jwt";
import user from "../model/user.schema";

export class AuthorizeMiddleware {
  public authorizeUser = async (req, res, next) => {
    const { byPassRoute } = req;
    const isRouteExist = !byPassRoute.includes(req.url);

    if (isRouteExist) {
      if (!isEmpty(req.headers.authorization)) {
        try {
          const tokenInfo: any = await JWT.decodeAuthToken(
            req.headers.authorization.split(" ")[1]
          );
          if (tokenInfo) {
            const result = await user.findOne({
              _id: tokenInfo.user_id,
            });
            if (result) {
              req.authUser = result;
              next();
            } else {
              res
                .status(CONSTANCE.RES_CODE.error.unauthorized)
                .send({ status: CONSTANCE.FAIL, error: l10n.t("ERR_UNAUTH") });
              return;
            }
          } else {
            res
              .status(CONSTANCE.RES_CODE.error.unauthorized)
              .send({ status: CONSTANCE.FAIL, error: l10n.t("ERR_UNAUTH") });
            return;
          }
        } catch (error) {
          res
            .status(CONSTANCE.RES_CODE.error.unauthorized)
            .send({ status: CONSTANCE.FAIL, error: l10n.t("ERR_UNAUTH") });
          return;
        }
      } else {
        res.status(CONSTANCE.RES_CODE.error.unauthorized).send({
          status: CONSTANCE.FAIL,
          error: l10n.t("ERR_UNAUTH"),
        });
        return;
      }
    } else {
      next();
    }
  };
}
