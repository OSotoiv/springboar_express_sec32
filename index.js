const express = require('express');
const { getMEAN, getMEDIAN, getMODE, validQuery, saveJSON, createJSONres, createJSONresALL } = require('./helpers')
const { QueryError } = require('./errors');
const { request } = require('express');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 'http://localhost:3000/mean?nums=1,2,3,4,5'
app.get('/mean', function (req, res, next) {
    try {
        validQuery(req.query.nums);
        const mean = getMEAN(req.query.nums)
        const resAsJson = createJSONres('mean', mean);
        if (req.query.save === 'true') {
            saveJSON(resAsJson);
        }
        if (req.headers.accept.split(',')[0] == 'text/html') {
            const resAsTEXT = `<h1>Operation: Mean</h1><h2>Value: ${mean}</h2>`;
            return res.send(resAsTEXT);
        } else {
            return res.json(resAsJson);
        }
    } catch (e) {
        next(e)
    }
});
// 'http://localhost:3000/median?nums=1,2,3,4,5'
app.get('/median', function (req, res, next) {
    try {
        validQuery(req.query.nums);
        const median = getMEDIAN(req.query.nums);
        const resAsJson = createJSONres('median', median);
        if (req.query.save === 'true') {
            saveJSON(resAsJson);
        }
        if (req.headers.accept.split(',')[0] == 'text/html') {
            const resAsTEXT = `<h1>Operation: Median</h1><h2>Value: ${median}</h2>`;
            return res.send(resAsTEXT);
        } else {
            return res.json(resAsJson);
        }
    } catch (e) {
        next(e)
    }
});
// 'http://localhost:3000/mode?nums=1,2,3,4,5,2,6,8,7,6'
app.get('/mode', function (req, res, next) {
    try {
        validQuery(req.query.nums);
        const mode = getMODE(req.query.nums);
        const resAsJson = createJSONres('mode', mode);
        if (req.query.save === 'true') {
            saveJSON(resAsJson);
        }
        if (req.headers.accept.split(',')[0] == 'text/html') {
            const resAsTEXT = `<h1>Operation: Mode</h1><h2>Value: ${mode}</h2>`;
            return res.send(resAsTEXT);
        } else {
            return res.json(resAsJson);
        }
    } catch (e) {
        next(e)
    }
});
// 'http://localhost:3000/all?nums=1,2,3,4,5,2,6,8,7,6'
app.get('/all', function (req, res, next) {
    try {
        validQuery(req.query.nums);
        const mode = getMODE(req.query.nums);
        const median = getMEDIAN(req.query.nums);
        const mean = getMEAN(req.query.nums);
        const resAsJson = createJSONresALL(mean, median, mode);
        if (req.query.save === 'true') {
            saveJSON(resAsJson);
        }
        if (req.headers.accept.split(',')[0] == 'text/html') {
            const resAsTEXT = `<h1>Operation: All</h1>
            <ul>
            <li>Mean: ${mean}</li>
            <li>Median: ${median}</li>
            <li>Mode: ${mode}</li>
            </ul>`;
            return res.send(resAsTEXT);
        } else {
            return res.json(resAsJson);
        }
    } catch (e) {
        next(e)
    }
})
app.use((req, res, next) => {
    const e = new QueryError("I dont know that route", 404)
    next(e)
})
app.use((error, req, res, next) => {
    msg = error.msg || 'something went wrong';
    code = error.status || 500;
    console.log(msg, code)
    return res.status(code).json({ Error: { msg: msg, status_code: code } })
})
app.listen(3000, function () {
    console.log('App on port 3000');
})