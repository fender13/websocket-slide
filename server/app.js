const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors')
const ENV = require('dotenv')
ENV.config()
const port = Number(process.env.PORT) || 4000

app.use(cors())

let slideNow = 0

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
  socket.emit('message', 'You are connected!')
  socket.on('next', function(slide) {
    slideNow = slide
    io.emit('slide-next', slide)
  })
  socket.on('prev', function(slide) {
    slideNow = slide
    io.emit('slide-prev', slide)
  })
  socket.emit('now', slideNow)
})


server.listen(port, () => {
  console.log('server is on in port', port)
});