import express from 'express';

export default () => {
    const router = express.Router()
    router.get("/", GET()) // /api/v1/pi?n=
    return router
}

function GET() {
    return async function (req, res) {
        const n_elements = Number(req.query.n)
        if (isNaN(n_elements)) {
            res.status(400).send()
            return
        }
        let ans = solveNQueen(n_elements)
        res.status(200).send({
            n_queen: n_elements,
            n_permus: ans.length,
            permutations: ans
        })
    }
}

// BACKTRACK INTERNAL

function solveNQueen(n) {
    let result = [];
    dfs(new Array(n), 0, result);
    return result;
}

function dfs(queens, row, result) {
    let n = queens.length;

    if (row === n) {
        result.push(buildResult(queens));
        return;
    }

    for (let i = 0; i < n; i++) {
        if (isValid(queens, row, i)) {
            queens[row] = i;
            dfs(queens, row + 1, result);
            queens[row] = null;
        }
    }
}

function isValid(queens, row, col) {
    for (let i = 0; i < row; i++) {
        if (queens[i] === col || queens[i] - i === col - row || queens[i] + i === col + row) {
            return false;
        }
    }
    return true;
}

function buildResult(queens) {
    let result = [];
    let n = queens.length;

    for (let i = 0; i < n; i++) {
        let str = '';
        for (let j = 0; j < n; j++) {
            if (queens[i] === j) {
                str += 'Q ';
            } else {
                str += '. ';
            }
        }
        result.push(str);
    }
    return result;
}