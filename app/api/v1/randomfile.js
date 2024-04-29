import express from 'express';
import filesConfig from '../../configs/prepConfig.js'
import randomNumber from '../../utils/randomnumber.js';
import fs from 'fs'
import path from 'path'

export default () => {
    const router = express.Router()
    router.get("/", GET())
    return router
}

function GET() {
    return async function (req, res) {
        let n = Number(req.query.n)
        if (isNaN(n)) {
            res.status(400).send()
            return
        }
        if (Number(n) >= Number(filesConfig.SMALL.n_files)) {
            res.status(400).send("overload")
            return
        }
        let files = []
        for (let i = 0; i < n; i++){
            let t = randomNumber(0, filesConfig.SMALL.n_files)
            let content = fs.readFileSync(path.join(filesConfig.SMALL.path, `${t}.txt`)).toString()
            files.push({
                file: t,
                content: content
            })
        }
        res.status(200).send(files)
    }
}