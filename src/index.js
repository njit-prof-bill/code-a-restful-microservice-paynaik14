const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
let users = [];
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/users', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const newUser = {
        id: users.length + 1,
        name: name, 
        email: email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(i => i.id === userId);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({ error: 'User not found' });
    }
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(i => i.id === userId);
    user.name = req.body.name;
    user.email = req.body.email;
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.findIndex(i => i.id === userId);
    if(user !== -1){
        users.splice(user, 1);
        res.status(204).send();
    }else{
        res.status(404).json({ error: 'User not found' });
    }
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing