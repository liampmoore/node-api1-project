const express = require('express');
const shortid = require('shortid');
const server = express();

let users = [];

server.get('/api/users', (req, res) => {
    res.status(200).json({
        message: 'Got user array.',
        users: users
    })
})

server.post('/api/users', (req, res) => {
    const newUser = {...req.body, id: shortid.generate()}
    users = [...users, newUser];
    res.status(201).json({
        message: 'Successfuly posted user.',
        newUser: newUser
    })
})