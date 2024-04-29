import express from 'express';
import BigNumber from "bignumber.js";

export default () => {
    const router = express.Router()
    router.get("/", GET())
    return router
}

function GET(){
    return async function (req, res){
        const n_digts = req.query.n
        if (isNaN(n_digts)){
            res.status(400).send()
            return
        }
        const hrstart = process.hrtime()
        const PI = computePI(Number(n_digts))
        const hrend = process.hrtime(hrstart)
        res.status(200).send({
            n: n_digts,
            pi: PI.toString(),
            runtime_sec: hrend[0],
            runtime_ms: hrend[1] / 1000000
        })
    }
}

// PI INTERNALS
// REF: https://medium.com/@german.tcyganov/finding-3-14-in-javascript-2bd05a0346c8

const A = new BigNumber('13591409')
const B = new BigNumber('545140134')
const C = new BigNumber('640320')

const D = new BigNumber('426880')
const E = new BigNumber('10005')

const DIGITS_PER_TERM = new BigNumber('14.1816474627254776555')

const C3_24 = C.multipliedBy(C).multipliedBy(C).dividedToIntegerBy(24)

function computePI(digits) {
    if (digits <= 0) {
        return '0'
    }

    const DIGITS = new BigNumber(digits)
    const N = DIGITS.dividedToIntegerBy(DIGITS_PER_TERM).plus(1)
    const PREC = DIGITS.multipliedBy(Math.log2(10))

    BigNumber.config({
        DECIMAL_PLACES: Math.ceil(PREC.toNumber()),
        POW_PRECISION: Math.ceil(PREC.toNumber()),
    })

    const PQT = computePQT(new BigNumber(0), N)

    let PI = D.multipliedBy(E.sqrt()).multipliedBy(PQT.Q)
    PI = PI.dividedBy(A.multipliedBy(PQT.Q).plus(PQT.T))

    return PI.toFixed(digits)
}

function computePQT(n1, n2) {
    let m = new BigNumber(0)
    let PQT = {
        P: new BigNumber(0),
        Q: new BigNumber(0),
        T: new BigNumber(0),
    }

    if (n1.plus(1).isEqualTo(n2)) {
        PQT.P = n2.multipliedBy(2).minus(1)
        PQT.P = PQT.P.multipliedBy(n2.multipliedBy(6).minus(1))
        PQT.P = PQT.P.multipliedBy(n2.multipliedBy(6).minus(5))
        PQT.Q = C3_24.multipliedBy(n2).multipliedBy(n2).multipliedBy(n2)
        PQT.T = A.plus(B.multipliedBy(n2)).multipliedBy(PQT.P)
        if (n2.modulo(2).isEqualTo(1)) {
            PQT.T = PQT.T.negated()
        }
    } else {
        m = n1.plus(n2).dividedToIntegerBy(2)

        let res1 = computePQT(n1, m)
        let res2 = computePQT(m, n2)

        PQT.P = res1.P.multipliedBy(res2.P)
        PQT.Q = res1.Q.multipliedBy(res2.Q)
        PQT.T = res1.T.multipliedBy(res2.Q).plus(res1.P.multipliedBy(res2.T))
    }

    return PQT
}