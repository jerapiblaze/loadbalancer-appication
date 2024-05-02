import express from 'express';
import cookieParser from 'cookie-parser';
import qs from 'qs'
import cors from 'cors'

import serverConfig from './app/configs/serverConfig.js';
import api from './app/api/index.js'

const app = express();

async function Main() {
    app.listen(serverConfig.PORT, () => {
        console.log('We are live on ' + serverConfig.PORT);
    });
    app.use(cors())
    app.use(cookieParser())
    app.use(express.json({
        limit: '5mb',
        type: ['application/json', 'text/plain']
    }))

    app.set('query parser',
        (str) => qs.parse(str, { /* custom options */ }))

    app.get("/", (req, res) => {
        res.status(200).send("Hello world!")
    })

    api(app)
}

console.log("==== Loadbalancer-Appication: MAIN ====");
Main()