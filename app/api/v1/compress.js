import { CalculatePi } from 'calculate-pi';
import express from 'express';
import lzma, { LZMA } from 'lzma-native';
import fs, { ReadStream } from 'fs';
import os from 'os';
import tempfile from 'tempfile';
import randomNumber from '../../utils/randomnumber.js';
import filesConfig from '../../configs/prepConfig.js'

export default () => {
    const router = express.Router()
    router.get("/", GET()) // /api/v1/pi?n=
    return router
}

function GET() {
    return async function (req, res) {
        const t = req.query.t
        const n = req.query.n
        if (isNaN(t) || isNaN(n)){
            res.status(400).send()
            return
        }
        const tempfilepath = tempfile({extension:"xz"})
        let data_array = []
        for (let i = 0; i < n; i++) {
            let tt = randomNumber(0, filesConfig.LARGE.n_files)
            let fileData = fs.readFileSync(`${filesConfig.LARGE.path}/${tt}.txt`)
            let compressedData = await lzma.compress(fileData, {
                threads: t,
                check: lzma.CHECK_SHA256,
                preset: 9
            })
            data_array.push(compressedData)
        }
        fs.writeFileSync(tempfilepath, data_array.join("\n"))
        let data = fs.readFileSync(tempfilepath).toString()
        fs.rmSync(tempfilepath)
        res.status(200).send({
            data: data
        })
    }
}