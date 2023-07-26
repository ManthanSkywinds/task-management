import { CONSTANCE } from './config/constance';
import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import * as l10n from 'jm-ez-l10n';
import user from './model/user.schema';
export class Middleware {
    public isUserExist = async (req: Request , res: Response, next: any ) => {
        const isUserExist: any = await user.find({email: req.body.email});
        if(isEmpty(isUserExist)) {
            next();
        } else {
            return res.status(CONSTANCE.RES_CODE.error.badRequest).send({ status: CONSTANCE.FAIL, error: l10n.t('ERR_USER_PROFILE_EXIST', {EMAIL: isUserExist[0].email })});
        }
    }
}