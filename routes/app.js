const { io } = require('../app');
const appController = require('../controllers/appController');

const App = app => {

    // API Endpoint
    app.post('/api/app/install', async (req, res) => {
        const { siteName, appName } = req.body;
        const socketId = req.headers['x-socket-id'];

        if (!socketId) {
            return res.status(400).json({ error: 'Socket ID required' });
        }

        const socket = io.sockets.sockets.get(socketId);
        if (!socket) {
            return res.status(400).json({ error: 'Invalid socket ID' });
        }

        try {
            await appController.install(socket, siteName, appName);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.DELETE('/api/app/uninstall', async (req, res) => {
        const { siteName, appName } = req.body;
        const socketId = req.headers['x-socket-id'];

        if (!socketId) {
            return res.status(400).json({ error: 'Socket ID required' });
        }

        const socket = io.sockets.sockets.get(socketId);
        if (!socket) {
            return res.status(400).json({ error: 'Invalid socket ID' });
        }

        try {
            await appController.uninstall(socket, siteName, appName);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.PUT('/api/app/clone', async (req, res) => {
        const { gitURL } = req.body;
        const socketId = req.headers['x-socket-id'];

        if (!socketId) {
            return res.status(400).json({ error: 'Socket ID required' });
        }

        const socket = io.sockets.sockets.get(socketId);
        if (!socket) {
            return res.status(400).json({ error: 'Invalid socket ID' });
        }

        try {
            await appController.cloneApp(socket, gitURL);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

}

module.exports = App