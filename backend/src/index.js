import express from 'express';
import sqlite3 from 'sqlite3';

import { applyRateLimiting, applyLooseCORSPolicy, applyBodyParsing, applyLogging, applyErrorCatching } from './api-middleware.js'

const app = express();
const port = 53715;

const GET_TASK_SQL = 'SELECT * FROM Tasks;';
const INSERT_TASK_SQL = "INSERT INTO Tasks(task) VALUES (?, ?) RETURNING id;";
const DELETE_TASK_SQL = "DELETE FROM Tasks WHERE id = ?;";
const UPDATE_TASK_SQL = "UPDATE Tasks SET task = ? WHERE id = ?;"
const LOGIN_SUBMIT_SQL = ""
const REGSISTER_SUBMIT_SQL = ""

const FS_DB = process.env['Tasks_DB_LOC'] ?? "./db.db";

const db = await new sqlite3.Database(FS_DB, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Tasks (id INTEGER PRIMARY KEY UNIQUE, task TEXT NOT NULL, user TEXT NOT NULL UNIQUE)");
    db.run("CREATE TABLE IF NOT EXISTS Login (username TEXT NOT NULL PRIMARY KEY UNIQUE, password TEXT NOT NULL)");
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
    const user = JSON.parse(sessionStorage.getItem("username"));
    if (task != "") {
        const stmt = db.prepare(INSERT_TASK_SQL).get(task, user, (err, ret) => {
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

app.delete('/api/tasks/:taskId', (req, res) => {
    const taskId = req.params.taskId;

    const stmt = db.prepare(DELETE_TASK_SQL).get(taskId, (err, ret) => {
        if (err) {
            res.status(500).send({
                msg: "Something went wrong",
                err: err
            });
        } else {
            res.status(200).send({
                msg: "Successfully deleted task",
            })
        }
    })
    stmt.finalize();
});

app.post('/api/tasks/:taskId/:task', (req, res) => {
    const taskId = req.params.taskId;
    const task = req.params.task;

    console.log(taskId)
    console.log(task)

    if (task != "" || !taskId) {
        const stmt = db.prepare(UPDATE_TASK_SQL).get(task, taskId, (err, ret) => {
            if (err) {
                res.status(500).send({
                    msg: "Something went wrong!",
                    err: err
                });
            } else {
                res.status(200).send({
                    msg: "Successfully added task!"
                })
            }
        })
        stmt.finalize();
    }
});

app.post('/api/login/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    console.log(username);
    console.log(password);

    if (!username || !password) {
        const stmt = db.prepare(LOGIN_SUBMIT_SQL).get(username, password, (err, ret) => {
            if (err) {
                res.status(500).send({
                    msg: "Something went wrong!",
                    err: err
                })
            } else {
                res.status(200).send({
                    msg: "Successfully logged in!"
                })
            }
        })
        stmt.finalize();
    }
});

app.post('/api/register/:username/:password', (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    console.log(username);
    console.log(password);

    if (!username || !password) {
        const stmt = db.prepare(REGSISTER_SUBMIT_SQL).get(username, password, (err, ret) => {
            if (err) {
                res.status(500).send({
                    msg: "Something went wrong!",
                    err: err
                })
            } else {
                res.status(200).send({
                    msg: "Successfully registered new account!"
                })
            }
        })
        stmt.finalize();
    }
});

applyErrorCatching(app);

// Open server for business!
app.listen(port, () => {
    console.log(`My API has been opened on :${port}`)
});

module.exports = app;