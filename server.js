import express from 'express';
import cookieParser from 'cookie-parser';
import qs from 'qs'
import cors from 'cors'
import fs from 'fs'
import {marked} from 'marked'
import markedKatex from "marked-katex-extension";
import markedCodePreview from 'marked-code-preview';

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

    app.get("/", async (req, res) => {
        const content = fs.readFileSync("./README.md").toString();
        marked.use(markedKatex({throwOnError: true, output:"html"}))
        marked.use(markedCodePreview())
        const result = await marked.parse(content);
        res.status(200).send(result)
    })

    api(app)
}

console.log("==== Loadbalancer-Appication: MAIN ====");
Main()