const url = 'http://localhost:4000';
const socket = io.connect('http://localhost:4000/');

const app = new Vue({
    el: '#app',
    data: {
        images: ['https://i.imgur.com/iMj837x.png', 'https://i.imgur.com/qVTGH4p.png', 'https://i.imgur.com/y0oRYUC.png', 'https://i.imgur.com/X0Wj8HK.png', 'https://i.imgur.com/RnInFju.png'],
        currentNumber: 0,
    },
    create: function() {
        socket.on('now', (data) => {
            this.currentNumber = data
        })
    },
    mounted: function () {
        socket.on('slide-next', (data) => {
            this.currentNumber = data
        })
        socket.on('slide-prev', (data) => {
            this.currentNumber = data
        })
        console.log(this.currentNumber)
    },
    methods: {
        next: function() {
            this.currentNumber += 1
            socket.emit('next', this.currentNumber)
        },
        prev: function() {
            this.currentNumber -= 1
            socket.emit('prev', this.currentNumber)
        }
    },
    computed: {
        currentImage: function() {
            return this.images[Math.abs(this.currentNumber) % this.images.length];
        }
    }
})