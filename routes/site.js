const { io } = require('../app');
const siteController = require('../controllers/siteController');

const site = app => {

    // API Endpoint
    app.post('/api/site/add', async (req, res) => {
        const { siteName, adminPassword } = req.body;
        const socketId = req.headers['x-socket-id'];

        if (!socketId) {
            return res.status(400).json({ error: 'Socket ID required' });
        }

        const socket = io.sockets.sockets.get(socketId);
        if (!socket) {
            return res.status(400).json({ error: 'Invalid socket ID' });
        }

        try {
            await siteController.createSite(socket, siteName, adminPassword);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.delete('/api/site/drop', async (req, res) => {
        const { siteName, adminPassword } = req.body;
        const socketId = req.headers['x-socket-id'];

        if (!socketId) {
            return res.status(400).json({ error: 'Socket ID required' });
        }

        const socket = io.sockets.sockets.get(socketId);
        if (!socket) {
            return res.status(400).json({ error: 'Invalid socket ID' });
        }

        try {
            await siteController.dropSite(socket, siteName);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.post('/api/site/ssl', async (req, res) => {
        const { siteName } = req.body;
        const socketId = req.headers['x-socket-id'];

        if (!socketId) {
            return res.status(400).json({ error: 'Socket ID required' });
        }

        const socket = io.sockets.sockets.get(socketId);
        if (!socket) {
            return res.status(400).json({ error: 'Invalid socket ID' });
        }

        try {
            await siteController.createSSL(socket, siteName);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.put('/api/site/scheduler', async (req, res) => {
        const { siteName, running } = req.body;
        const socketId = req.headers['x-socket-id'];

        if (!socketId) {
            return res.status(400).json({ error: 'Socket ID required' });
        }

        const socket = io.sockets.sockets.get(socketId);
        if (!socket) {
            return res.status(400).json({ error: 'Invalid socket ID' });
        }

        try {
            await siteController.scheduler(socket, siteName, running);
            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

}

module.exports = site