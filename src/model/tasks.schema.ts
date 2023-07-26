import { Schema, model as Model } from "mongoose";
import { Tables } from "../config/tables";
import { STATUS_OPTIONS } from "../config/constance";


const tasksSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    status: {
        type: String,
        enum: STATUS_OPTIONS
    },
        
}, { timestamps: true })

const tasks = Model(Tables.tasks, tasksSchema);
export default tasks;