const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.NODE_PORT || 3000;

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.listen(PORT, () => console.log(`Le serveur est démarré`));