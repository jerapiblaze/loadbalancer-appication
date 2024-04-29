import pi from './pi.js'
import compress from './compress.js'
import bigfile from './bigfile.js'
import randomfile from './randomfile.js'
import recurse from './recurse.js'

import express from 'express'

export default function (app) {
    let router = express.Router()
    router.get("/index", (req, res) => {
        res.status(200).send("Hello world!")
    })
    router.use("/pi", pi())
    router.use("/compress", compress())
    router.use("/bigfile", bigfile())
    router.use("/randomfile", randomfile())
    router.use("/recurse", recurse())
    return router
}