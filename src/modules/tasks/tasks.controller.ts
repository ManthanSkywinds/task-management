import { Mongoose } from "mongoose";
import { log } from "../../../logger";
import { CONSTANCE } from "../../config/constance";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { tasksService } from "./tasks.service";

export class Tasks {
    public logger = log.getLogger();
    public tasksService = new tasksService();
    public getTasks = async (req, res) => {
        try {
            const result: ResponseBuilder = await this.tasksService.getTasks(req.query)

            // { code: 200, msg: '', description: '', error: '', result: [] };
            return res.status(result.code).send({ status: CONSTANCE.SUCCESS, data: result.result });

        } catch (err) {
            this.logger.log(`get tasks Error  ---`, err);
            throw ResponseBuilder.error(err);

        }
    }

    public getById = async (req, res) => {
        try {
            const { id } = req.params;
            const mongo = new Mongoose();
            if (id && mongo.isValidObjectId(id)) {
                const result: ResponseBuilder = await this.tasksService.getById(id)
                if (result && result.code === CONSTANCE.RES_CODE.success) {
                    return res.status(result.code).send({ status: CONSTANCE.SUCCESS, data: result.result });
                } else {
                    return res.status(result.code).send({ status: CONSTANCE.FAIL, data: result.error });
                }
            } else {
                const result = ResponseBuilder.badRequest('invalid id');
                return res.status(result.code).send({ status: CONSTANCE.BAD_DATA, message: result.error });
            }

        } catch (err) {
            this.logger.log(`get by id Error  ---`, err);
            throw ResponseBuilder.error(err);

        }
    }

    public editTask = async (req, res) => {
        try {
            const { id } = req.params;
            const mongo = new Mongoose();
            if (id && mongo.isValidObjectId(id)) {
                const result: ResponseBuilder = await this.tasksService.editTask(id, req.body)
                if (result && result.code === CONSTANCE.RES_CODE.success) {
                    return res.status(result.code).send({ status: CONSTANCE.SUCCESS, data: result.result, msg: 'Task updated successfully' });
                } else {
                    return res.status(result.code).send({ status: CONSTANCE.FAIL, data: result.error });
                }
            } else {
                const result = ResponseBuilder.badRequest('invalid id');
                return res.status(result.code).send({ status: CONSTANCE.BAD_DATA, message: result.error });
            }

        } catch (err) {
            this.logger.log(`edit task Error  ---`, err);
            throw ResponseBuilder.error(err);

        }
    }

    public createTask = async (req, res) => {
        try {
            const result: ResponseBuilder = await this.tasksService.createTask(req.body)
            return res.status(result.code).send({ status: CONSTANCE.SUCCESS, data: result.result, msg: 'Task created successfully' });
        } catch (err) {
            this.logger.log(`create task Error  ---`, err);
            throw ResponseBuilder.error(err);

        }
    }

    public deleteTask = async (req, res) => {
        try {
            const { id } = req.params;
            const mongo = new Mongoose();
            if (id && mongo.isValidObjectId(id)) {
                const result: ResponseBuilder = await this.tasksService.deleteTask(id)
                return res.status(result.code).send({ status: CONSTANCE.SUCCESS, data: result.msg });
            } else {
                const result = ResponseBuilder.badRequest('invalid id');
                return res.status(result.code).send({ status: CONSTANCE.BAD_DATA, message: result.error });
            }

        } catch (err) {
            this.logger.log(`delete task Error  ---`, err);
            throw ResponseBuilder.error(err);

        }
    }
}