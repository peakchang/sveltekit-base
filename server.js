import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
const app = express();


app.set('port', process.env.PORT || 3000);

app.use(cookieParser('ldsjfglsjdf-sgffg3f-43534g34g3'));

if (process.env.NODE_ENV === 'production') {
    var https_status = true
} else {
    var https_status = false
}

const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: 'ldsjfglsjdf-sgffg3f-43534g34g3',
    cookie: {
        httpOnly: true,
        secure: https_status,
        // maxAge: 60 * 1000 * 120,
    },
};

if (process.env.NODE_ENV === 'production') {
    sessionOption.proxy = true;
    sessionOption.cookie.secure = true;
}

app.use(session(sessionOption));

// if (process.env.NODE_ENV === 'production') {
//     app.use(morgan('combined'));
//     app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
//     app.use(hpp());
// } else {
//     app.use(morgan('dev'));
// }

// // ESM 오류 해결을 위해 __dirname, __filename 직접 변수 작성
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors());

import { handler } from "./front/build/handler.js"

app.use(handler);

app.listen(app.get('port'), () => {
    console.log(`server running in port ${app.get('port')}`);
})