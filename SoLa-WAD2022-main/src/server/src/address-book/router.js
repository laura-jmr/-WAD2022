const router = (app, handlers) => {
    app.get('/susLocs', handlers.readAllAddress);
    // crud
    app.post('/susLocs', handlers.createAddress);
    app.get('/susLocs/:id', handlers.readAddress);
    app.put('/susLocs/:id', handlers.updateAddress);
    app.delete('/susLocs/:id', handlers.deleteAddress);
}

module.exports = router;
