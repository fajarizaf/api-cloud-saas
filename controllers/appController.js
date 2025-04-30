const sshService = require('../services/sshService');

class AppController {
    async install(socket, siteName, appName) {
        try {
            socket.emit('progress', { type: 'info', data: 'Starting site creation...' });

            // Create new site
            await sshService.executeCommand(
                `bench --site ${siteName} install-app ${appName}`,
                socket
            );

            socket.emit('progress', { type: 'success', data: 'Site created successfully!' });
            return { success: true, message: 'Site created' };
        } catch (error) {
            socket.emit('progress', { type: 'error', data: error.message });
            throw error;
        }
    }
    async uninstall(socket, siteName, appName) {
        try {
            socket.emit('progress', { type: 'info', data: 'Starting site creation...' });

            // Create new site
            await sshService.executeCommand(
                `bench --site ${siteName} uninstall-app ${appName}`,
                socket
            );

            socket.emit('progress', { type: 'success', data: 'Site created successfully!' });
            return { success: true, message: 'Site created' };
        } catch (error) {
            socket.emit('progress', { type: 'error', data: error.message });
            throw error;
        }
    }
    async createApp(socket, appName) {
        try {
            socket.emit('progress', { type: 'info', data: 'Starting site creation...' });

            // Create new site
            await sshService.executeCommand(
                `bench new-app ${appName}`,
                socket
            );

            socket.emit('progress', { type: 'success', data: 'Site created successfully!' });
            return { success: true, message: 'Site created' };
        } catch (error) {
            socket.emit('progress', { type: 'error', data: error.message });
            throw error;
        }
    }
    async cloneApp(socket, gitURL) {
        try {
            socket.emit('progress', { type: 'info', data: 'Starting site creation...' });

            // Create new site
            await sshService.executeCommand(
                `bench get-app ${gitURL}`,
                socket
            );

            socket.emit('progress', { type: 'success', data: 'Site created successfully!' });
            return { success: true, message: 'Site created' };
        } catch (error) {
            socket.emit('progress', { type: 'error', data: error.message });
            throw error;
        }
    }
}

module.exports = new AppController();