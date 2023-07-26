import { log } from "../../../logger";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import tasks from "../../model/tasks.schema";
import { AddTask, editTask } from "./tasks.modal";

export class tasksService {
  public log = log.getLogger();

  public getTasks = async (query): Promise<ResponseBuilder> => {
    try {
      const { status } = query;
      const pipeline = [];
      const matchStage = {
        $match: {
          status,
        },
      };

      if (typeof status !== "undefined") {
        matchStage.$match.status = status;
        pipeline.push(matchStage);
      }

      pipeline.push({
        $project: {
          title: 1,
          content: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      });
      const result = await tasks.aggregate(pipeline);
      return ResponseBuilder.data(result, "Tasks fetched successfully");
    } catch (err) {
      throw ResponseBuilder.error(err);
    }
  };

  public getById = async (id: string): Promise<ResponseBuilder> => {
    try {
      const fetchedTaskById = await tasks.findById(id);
      if (fetchedTaskById && fetchedTaskById._id) {
        return ResponseBuilder.data(
          fetchedTaskById,
          "Task fetched successfully"
        );
      } else {
        return ResponseBuilder.badRequest("Task not found.");
      }
    } catch (err) {
      throw ResponseBuilder.error(err);
    }
  };

  public editTask = async (
    id: string,
    updatePayload: editTask
  ): Promise<ResponseBuilder> => {
    try {
      const isTaskExist = await this.getById(id);
      if (isTaskExist && isTaskExist.result) {
        const updatedTask = await tasks.updateOne({ _id: id }, updatePayload);
        return ResponseBuilder.data(updatedTask, "Task edited successfully");
      } else {
        return isTaskExist;
      }
    } catch (err) {
      throw ResponseBuilder.error(err);
    }
  };

  public createTask = async (content: AddTask): Promise<ResponseBuilder> => {
    try {
      const taskInstance = await new tasks(content);
      const result = await taskInstance.save();
      return ResponseBuilder.data(result, "Task created successfully");
    } catch (err) {
      throw ResponseBuilder.error(err);
    }
  };

  public deleteTask = async (id: string): Promise<ResponseBuilder> => {
    try {
      await tasks.deleteOne({ _id: id });
      return ResponseBuilder.data({}, "Task deleted successfully");
    } catch (err) {
      throw ResponseBuilder.error(err);
    }
  };
}
