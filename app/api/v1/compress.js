import express from 'express';
import lzma from 'lzma-native';
import fs from 'fs';
import tempfile from 'tempfile';
import randomNumber from '../../utils/randomnumber.js';
import filesConfig from '../../configs/prepConfig.js'
import path from 'path'

export default () => {
    const router = express.Router()
    router.get("/", GET())
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
        if (n >= filesConfig.LARGE.n_files){
            res.status(400).send("overload")
            return
        }
        const tempfilepath = tempfile({extension:"xz"})
        let data_array = []
        for (let i = 0; i < n; i++) {
            let tt = randomNumber(0, filesConfig.LARGE.n_files)
            let fileData = fs.readFileSync(path.join(filesConfig.LARGE.path,`${tt}.txt`))
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