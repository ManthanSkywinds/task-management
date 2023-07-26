import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { model } from "../../model";
import { STATUS_OPTIONS } from "../../config/constance";

export class AddTask extends model {
    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsString()
    public content: string;

    @IsString()
    @IsEnum(STATUS_OPTIONS, { message: 'status must be one of these options: incomplete, in-progress, completed' } )
    public status: string;


    constructor(body) {
        super();
        const { title, content, status } = body;
        this.title = title;
        this.content = content;
        this.status = status;
    }
}

export class editTask extends AddTask {};