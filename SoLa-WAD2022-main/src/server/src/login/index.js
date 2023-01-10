const router = require('./router');
const model = require('./model');

const loginModule = (app) => {
    const loginHandler = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await model.login(username, password);
        if (user) {
            return res.json(user);
        }
        return res.status(401).end()
    }

    const handlers = {
        login: loginHandler
    }

    router(app, handlers);
}

module.exports = loginModule;
