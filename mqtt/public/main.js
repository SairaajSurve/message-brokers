socket = io.connect('http://localhost:3000/');

document.querySelector('#start').addEventListener('click',()=>{
    socket.emit('start');
})

document.querySelector('#stop').addEventListener('click',()=>{
    socket.emit('stop');
})