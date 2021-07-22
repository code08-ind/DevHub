const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config({ path: "./config.env" });

require('./db/conn.js');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//? model
const User = require('./model/userSchema.js');

//? routes
app.use(require('./router/auth.js'));

const PORT = process.env.PORT || 6450;

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/api/usersprofiles', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
});

app.get('/api/usersprofiles/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        if (user) {
            res.status(200).json(user);
        }
        else {
            return res.status(404).json({ error: 'No Data Found! Try Again' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

if (process.env.NODE_ENV == 'production') {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server Running At Port ${PORT}`);
});