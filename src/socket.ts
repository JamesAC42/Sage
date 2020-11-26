export const handleConnection = (socket:any) => {
    const room = socket.handshake['query']['room'];
    socket.join(room);
    console.log(`User joined room: ${room}`);
    socket.on('disconnect', () => {
        socket.leave(room);
        console.log('User disconnected');
    });
}

export const pushData = (message:any, io:any) => {
    const payload = JSON.parse(message);
    io.to(payload.id).emit('pushData', JSON.stringify(payload.data));
}