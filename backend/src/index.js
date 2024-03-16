// !!! IMPORTANT !!!
// Be sure to run 'npm run dev' from a
// terminal in the 'backend' directory!

import express from 'express';
import sqlite3 from 'sqlite3';
import fs from 'fs';

import { applyRateLimiting, applyLooseCORSPolicy, applyBodyParsing, applyLogging, applyErrorCatching } from './api-middleware.js'

const app = express();
const port = 53715;

const GET_TASK_SQL = 'SELECT * FROM Tasks;';
const INSERT_TASK_SQL = 'INSERT INTO Tasks(task) VALUES (?) RETURNING id;';
const DELETE_TASK_SQL = "DELETE FROM Tasks WHERE id = ?;";

const FS_DB = process.env['Tasks_DB_LOC'] ?? "./db.db";
const FS_INIT_SQL = "./includes/init.sql";

const db = await new sqlite3.Database(FS_DB, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
db.serialize(() => {
    //const INIT_SQL = fs.readFileSync(FS_INIT_SQL).toString();
    //INIT_SQL.replaceAll(/\t\r\n/g, ' ').split(';').filter(str => str).forEach((stmt) => db.run(stmt + ';'));
    db.run("CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY UNIQUE, task TEXT NOT NULL)");
});

applyRateLimiting(app);
applyLooseCORSPolicy(app);
applyBodyParsing(app);
applyLogging(app);

app.get('/api/tasks', (req, res) => {
    const stmt = db.prepare(GET_TASK_SQL).get().all((err, ret) => {
        if (err) {
            res.status(500).send({
                msg: "Something went wrong!",
                err: err
            });
        } else {
            res.status(200).send(ret);
        }
    })
    stmt.finalize();
})

app.post('/api/tasks', (req, res) => {
    const task = req.body.task;
    if (task != "") {
        const stmt = db.prepare(INSERT_TASK_SQL).get(task, (err, ret) => {
            if (err) {
                res.status(500).send({
                    msg: "Something went wrong!",
                    err: err
                });
            } else {
                res.status(200).send({
                    msg: "Successfully added task!",
                    id: ret.id
                })
            }
        })
        stmt.finalize();
    }
})

// Open server for business!
app.listen(port, () => {
    console.log(`My API has been opened on :${port}`)
});