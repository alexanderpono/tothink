import { validateAuth } from './controllers/ApiAuthController.saga';
import { Auth } from './models/Auth';

const LOG_REST = true; // logging of all REST calls
const port = 4000;

const path = require('node:path');
import express from 'express';
import { User } from './models/User';
const app = express();
const cors = require('cors');
const Datastore = require('nedb');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const publicDir = path.join(__dirname, '/../public');
app.use(express.static(publicDir));

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const body = JSON.stringify(req.body);
    const status = res.statusCode;
    console.log(`${method} ${url} ${body} ${status}`);
    next();
};

if (LOG_REST) app.use(logger);
app.use(cors());

const db = {
    users: new Datastore({ filename: 'users.db', autoload: true })
};

app.listen(port, () => {
    console.log(`index.ts! listening http://localhost:${port}`);
});

app.post('/api/auth', async (req, res) => {
    try {
        const findUser: Auth = (await validateAuth(req.body as Auth)) as Auth;

        db.users.find('', (err, docs) => {
            const users: User[] = docs;

            const user = users.find((user: User) => {
                return user.name === findUser.userName;
            });

            if (typeof user === 'undefined') {
                res.status(401)
                    .header('Content-Type', 'application/json')
                    .send(JSON.stringify({ success: false, message: 'user not found' }));
                return;
            }

            const role = typeof user?.role !== 'undefined' ? user.role : 'user';
            res.status(200)
                .header('Content-Type', 'application/json')
                .send(JSON.stringify({ success: true, role }));
        });
    } catch (err) {
        console.log('err=', err);
        res.json({ err: 'err1' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        db.users.find('', (err, docs) => {
            const users: User[] = docs;
            res.status(200)
                .header('Content-Type', 'application/json')
                .send(JSON.stringify({ success: true, users }));
        });
    } catch (err) {
        console.log('err=', err);
        res.json({ err: 'err1' });
    }
});
