const io = require('socket.io-client');
const socket = io('http://localhost:5000'); // Sesuaikan dengan URL API Anda

socket.on('connect', () => {
    console.log('Socket ID:', socket.id); // Copy ID ini untuk Postman
});

// Biarkan script ini tetap running selama testing