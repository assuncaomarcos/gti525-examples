const dotenv = require("dotenv");

function isDev() {
    return (process.env.NODE_ENV === 'development');
}

// Les variables d'environnement nécessaires et leurs valeurs en mode développement
const envVariables = dotenv.parse(Buffer.from(`
NODE_PORT=3000
MONGODB_DB=cuisine
CUISINE_API_VERSION=v3
JWT_KEY=gti525-e2022-jwt-key
SESSION_SECRET=gti525-e2022-session-key
`));

function checkIfDefined(variables) {
    variables.forEach(variable => {
        if (!process.env[variable]) {
            console.error(`Il faut déclarer la variable d'environnement: ${variable}`);
            process.exit(-1);
        }
    });
}

if (isDev()) {
    Object.assign(process.env, envVariables);
} else {
    const result = dotenv.config()
    if (result.error) {
        console.error("Erreur de lecture du fichier .env", result.error);
        process.exit(-1);
    }
    checkIfDefined(Object.keys(envVariables));
}

module.exports = {
    isDev
}