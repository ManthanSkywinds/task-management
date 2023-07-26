import { validate } from "class-validator";

export class model {
    public static async getModel( model: any, body: any, query ?: any ): Promise<model> {
        try {
            const m2 = new model(body, query );
            const error = await validate(m2);
                if (error.length ) {
                    throw error;
                }
            return m2;
        } catch(err) {
            throw err;
        }
    }
}