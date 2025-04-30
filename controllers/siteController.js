const sshService = require('../services/sshService');

class SiteController {
    async createSite(socket, siteName, adminPassword) {
        try {
            socket.emit('progress', { type: 'info', data: 'Starting site creation...' });

            // Create new site
            await sshService.executeCommand(
                `bench new-site ${siteName} --admin-password ${adminPassword} --db-root-username root --db-root-password your_new_password`,
                socket
            );

            socket.emit('progress', { type: 'success', data: 'Site created successfully!' });
            return { success: true, message: 'Site created' };
        } catch (error) {
            socket.emit('progress', { type: 'error', data: error.message });
            throw error;
        }
    }
    async dropSite(socket, siteName) {
        try {
            socket.emit('progress', { type: 'info', data: 'Starting site creation...' });

            // Create new site
            await sshService.executeCommand(
                `bench drop-site ${siteName} --db-root-username root --db-root-password your_new_password --force`,
                socket
            );

            socket.emit('progress', { type: 'success', data: 'Site created successfully!' });
            return { success: true, message: 'Site created' };
        } catch (error) {
            socket.emit('progress', { type: 'error', data: error.message });
            throw error;
        }
    }
    async createSSL(socket, siteName) {
        try {
            socket.emit('progress', { type: 'info', data: 'Starting SSL Setup...' });

            // Create new site
            await sshService.executeCommandRoot(
                `bench config dns_multitenant on`,
                socket
            );

            // Create new site
            await sshService.executeCommandRoot(
                `bench setup lets-encrypt ${siteName}`,
                socket
            );

            socket.emit('progress', { type: 'success', data: 'SSL created successfully!' });
            return { success: true, message: 'Site created' };
        } catch (error) {
            socket.emit('progress', { type: 'error', data: error.message });
            throw error;
        }
    }

    async scheduler(socket, siteName, status) {
        try {
            socket.emit('progress', { type: 'info', data: 'Starting site creation...' });

            if (status == true) {
                // Set Enable Scheduler
                await sshService.executeCommand(
                    `bench --site ${siteName} enable-scheduler`,
                    socket
                );
            }

            if (status == false) {
                // Set Disable Scheduler
                await sshService.executeCommand(
                    `bench --site ${siteName} disable-scheduler`,
                    socket
                );
            }


            socket.emit('progress', { type: 'success', data: 'Site created successfully!' });
            return { success: true, message: 'Site created' };
        } catch (error) {
            socket.emit('progress', { type: 'error', data: error.message });
            throw error;
        }
    }
}

module.exports = new SiteController();