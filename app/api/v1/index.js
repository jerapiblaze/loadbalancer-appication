import pi from './pi.js'
import compress from './compress.js'
import bigfile from './bigfile.js'
import randomfile from './randomfile.js'
import backtrack from './backtrack.js'
import recurse from './recurse.js'

import express from 'express'

export default function (app) {
    // app.get("/api/v1/index", (req, res) => {
    //     res.status(200).send("Hello world!")
    // })
    // app.use("/api/v1/pi", pi())
    // app.use("/api/v1/compress", compress())
    // app.use("/api/v1/bigfile", bigfile())
    // app.use("/api/v1/randomfile", randomfile())
    // app.use("/api/v1/recurse",recurse())
    let router = express.Router()
    router.get("/index", (req, res) => {
        res.status(200).send("Hello world!")
    })
    router.use("/pi", pi())
    router.use("/compress", compress())
    router.use("/bigfile", bigfile())
    router.use("/randomfile", randomfile())
    router.use("/backtrack",backtrack())
    router.use("/recurse", recurse())
    return router
}