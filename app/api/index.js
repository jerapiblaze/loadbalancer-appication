import v1 from './v1/index.js'

export default function (app) {
    app.use("/api/v1", v1())
}