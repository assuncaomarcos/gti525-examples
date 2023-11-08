import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

// Le cookie de la session aura une durée d'un jour
const ONE_DAY = 1000 * 60 * 60 * 24;

const instance = session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: {
        maxAge: ONE_DAY,
        sameSite: 'Strict'
    },
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
        stringify: false,
        autoRemove: "interval",
        autoRemoveInterval: 10
    })
});
export default instance;