const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/cyberempire', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Serve your static HTML file
app.use(express.static('public'));

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    const newUser = new User({
        username,
        email,
        password,
    });

    newUser.save((err) => {
        if (err) {
            res.status(500).send('Error registering user');
        } else {
            // Redirect the user back to the index.html page after successful registration
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
