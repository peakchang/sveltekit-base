import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import session from 'express-session';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
const app = express();

app.set('port', process.env.PORT || 3000);

// ESM 오류 해결을 위해 __dirname, __filename 직접 변수 작성
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors());

import { handler } from "./front/build/handler.js"

app.use(handler);

app.listen(app.get('port'), () => {
    console.log(`server running in port ${app.get('port')}`);
})