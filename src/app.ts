import { DatabaseInit } from './Utils/database';
import { Routes } from './../routes';
import { log } from './../logger';
import * as cors from 'cors';
import * as l10n from "jm-ez-l10n";
import * as express from "express";
import * as  bodyParser from 'body-parser';
import * as dotEnv from 'dotenv';

dotEnv.config();
export class App {
    protected app: express.Application;
    private logger =  log.getLogger();
    PORT = process.env.PORT;
    constructor() {
        this.app = express();
        const route = new Routes();
        this.app.use( bodyParser.json() );
        this.app.use(cors())
        this.app.use('/', route.routePath() );
        l10n.setTranslationsFile("en", "src/language/translation.en.json");
        this.app.use(l10n.enableL10NExpress);    
        this.app.listen( this.PORT , () => {
            this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
            // connecting to the Database
            new DatabaseInit();
        });
    }
}