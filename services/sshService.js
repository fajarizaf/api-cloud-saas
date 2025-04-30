const { NodeSSH } = require('node-ssh');
require('dotenv').config();
const ssh = new NodeSSH();

class SSHService {
    constructor() {
        this.connected = false;
    }

    async connect() {
        if (!this.connected) {
            await ssh.connect({
                host: process.env.SSH_HOST,
                username: process.env.SSH_USER,
                password: process.env.SSH_PASSWORD,
                readyTimeout: 120000
            });
            this.connected = true;
        }
        return ssh;
    }

    async connectRoot() {
        if (!this.connected) {
            await ssh.connect({
                host: process.env.SSH_HOST,
                username: 'root',
                password: process.env.SSH_PASSWORD,
                readyTimeout: 120000
            });
            this.connected = true;
        }
        return ssh;
    }

    async executeCommand(command, socket, eventName = 'progress') {
        const connection = await this.connect();
        return new Promise((resolve, reject) => {
            connection.execCommand(command, { cwd: '/home/support/treeapp/' }, {
                onStdout: (chunk) => {
                    socket.emit(eventName, { type: 'stdout', data: chunk.toString() });
                },
                onStderr: (chunk) => {
                    socket.emit(eventName, { type: 'stderr', data: chunk.toString() });
                }
            }).then((result) => {
                if (result.code === 0) {
                    resolve(result);
                } else {
                    reject(new Error(result.stderr));
                }
            }).catch(reject);
        });
    }

    async executeCommandRoot(command, socket, eventName = 'progress') {
        const connection = await this.connectRoot();
        return new Promise((resolve, reject) => {
            connection.execCommand(command, { cwd: '/home/support/treeapp/' }, {
                onStdout: (chunk) => {
                    socket.emit(eventName, { type: 'stdout', data: chunk.toString() });
                },
                onStderr: (chunk) => {
                    socket.emit(eventName, { type: 'stderr', data: chunk.toString() });
                }
            }).then((result) => {
                if (result.code === 0) {
                    resolve(result);
                } else {
                    reject(new Error(result.stderr));
                }
            }).catch(reject);
        });
    }
}

module.exports = new SSHService();