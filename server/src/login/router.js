const router = (app, handlers) => {
    app.post('/users', handlers.login);
}

module.exports = router;
