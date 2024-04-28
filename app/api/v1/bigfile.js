import { CalculatePi } from 'calculate-pi';
import express from 'express';
import filesConfig from '../../configs/prepConfig.js'
import randomNumber from '../../utils/randomnumber.js';
import fs from 'fs'

export default () => {
    const router = express.Router()
    router.get("/", GET()) // /api/v1/pi?n=
    return router
}

function GET() {
    return async function (req, res) {
        let n = Number(req.query.n)
        if (isNaN(n)) {
            res.status(400).send()
            return
        }
        if (n > filesConfig.LARGE.n_files){
            res.status(400).send()
            return
        }
        let files = []
        for (let i = 0; i < n; i++) {
            let t = randomNumber(0, filesConfig.LARGE.n_files)
            let content = fs.readFileSync(`${filesConfig.LARGE.path}/${t}.txt`).toString()
            files.push({
                file: t,
                content: content
            })
        }
        res.status(200).send(files)
    }
}