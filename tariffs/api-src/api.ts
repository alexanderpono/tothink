
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = 4000;

const app = express();
app.use(bodyParser.json());

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const body = JSON.stringify(req.body);
    const status = res.statusCode;
    console.log(`${method} ${url} ${body} ${status}`);
    next();
};

app.use(logger);
app.use(cors());

app.listen(port, () => {
    console.log(`api.ts: listening http://localhost:${port}`);
});

app.get('/api/profile', async (req, res) => {
    try {
        res.status(200)
            .header('Content-Type', 'application/json')
            .send(JSON.stringify({ age: 15 }));
    } catch (err) {
        console.log('err=', err);
        res.json({ err: 'err1' });
    }
});

app.get('/api/tariffs', async (req, res) => {
    try {
        const tariffs = [{ ageFrom: 10, ageTo: 20 }];
        res.status(200)
            .header('Content-Type', 'application/json')
            .send(JSON.stringify(tariffs));
    } catch (err) {
        console.log('err=', err);
        res.json({ err: 'err1' });
    }
});
