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

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(item => item.id = id);
    res.status(200).json({
        message: `Got user with id: ${id}.`,
        user: user
    })
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    users = users.map(item => item.id === id ? updatedUser : item);
    res.status(201).json({
        message: `Updated user with id: ${id}.`,
        updatedUser: updatedUser
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter(item => item.id !== id);
    res.status(202).json({
        message: `Deleted user with id: ${id}.`
    })
})