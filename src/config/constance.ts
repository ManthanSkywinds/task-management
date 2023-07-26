export class CONSTANCE {

    public static readonly SUCCESS = "SUCCESS";
    public static readonly FAIL = "FAIL";
    public static readonly PENDING = "PENDING";
    public static readonly ERROR = "ERROR";
    public static readonly CODE = "CODE";
    public static readonly BAD_DATA = "BAD_DATA";

    public static readonly RES_CODE = {
        success: 200,
        error: {
          internalServerError: 500,
          badRequest: 400,
          unauthorized: 401,
          forbidden: 403,
          notFound: 404,
        },
      };
    
}

export enum STATUS_OPTIONS {
    INCOMPLETE = 'incomplete',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
}