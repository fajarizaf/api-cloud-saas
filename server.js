const { app, httpServer } = require('./app');

require('./routes/site')(app)
require('./routes/app')(app)

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});