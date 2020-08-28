//############# Node server which will socket io connections ##############
const io = require('socket.io')(8000)


const users = {};
//  ############# incoming event ke liye server listen karega #################


io.on('connection',socket =>{
// ########### if the new user joined , let other user connected to the server know! #########
    socket.on('new-user-joined', name =>{
        // console.log('new user' ,name);
      users[socket.id ] = name;
      socket.broadcast.emit('user-joined',name);  
    });

    // if someone send the message, brodcast it to other people ##########
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message: message, name:users[socket.id]});
    });


    // ######### if someone leaves the chat , let others know #############
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    })

});