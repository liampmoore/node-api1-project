const express = require('express');
const shortid = require('shortid');
const server = express();

let users = [];

server.use(express.json());

server.get('/api/users', (req, res) => {
    
    if (!users) {
        res.status(500).json({
            errorMessage: 'Error retrieving user array.'
        })
    }
    else {
    res.status(200).json({
        message: 'Got user array.',
        users: users
    })}
    
})

server.post('/api/users', (req, res) => {
    const user = {...req.body, id: shortid.generate()};
    if (!user.name || !user.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else {
    users.push(user);
    res.status(201).json(user)
}
})


server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(item => item.id = id);
    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    else {
    res.status(200).json({
        message: `Got user with id: ${id}.`,
        user: user
    })
}
})

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    if (!users.find(item => item.id = id)) {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }
    else {
    const updatedUser = req.body;
    users = users.map(item => item.id === id ? updatedUser : item);
    res.status(200).json({
        message: `Updated user with id: ${id}.`,
        updatedUser: updatedUser
    })
}
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    if (!users.find(item => item.id = id)) {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }
    else {
    users = users.filter(item => item.id !== id);
    res.status(202).json({
        message: `Deleted user with id: ${id}.`
    })
}
})

const PORT = 5000;
server.listen(PORT, () => {
console.log(`\n ** API running on http://localhost:${PORT} **\n`);

}

);