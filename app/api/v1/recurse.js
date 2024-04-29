import express from 'express';

export default () => {
    const router = express.Router()
    router.get("/", GET())
    return router
}

function GET() {
    return async function (req, res) {
        let n = req.query.n
        if (isNaN(n)){
            res.status(400).send()
            return
        }
        if (n >= 25){
            res.status(400).send("overload")
            return
        }
        n = n-1
        let ans = [1,0]
        await recurse(ans, n)
        res.status(200).send({
            n: n,
            size: ans.length,
            ans: ans.toString()
        })
    }
}

async function recurse(ans, n){
    if (n <= 0){
        return
    }
    let j = ans.length
    let a = Array(ans)
    for (let i = 0; i < j; i++){
        ans.push(a)
    }
    n = n - 1
    await recurse(ans, n)
}