var canvas = document.querySelector("canvas"); // Select canvas

canvas.width = window.innerWidth; // Set canvas width to window width
canvas.height = window.innerHeight; // Set canvas height to window height

var c = canvas.getContext("2d"); // Get canvas context

var mouse = {
    x:undefined,
    y:undefined
}

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse);
})

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth; // Set canvas width to window width
    canvas.height = window.innerHeight; // Set canvas height to window height

    init();
})

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
    '#333A42',
    '#485058',
    '#A6A5A1',
    '#F1ECE9',
    '#D7443F'
]

function Circle(x, y, dx, dy, radius) {
    this.x = x; // Settings object variable
    this.y = y; 
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius
    this.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)]; // Math.floor = Aproximate number


    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.fillStyle;
        c.fill(); // Fill content with a color or css style
    }

    this.update = function() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1; 
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw()
    }
} 

var circleArray = [];

function init() {
    circleArray = [];

    for (var i = 0; i < 800; i++) {
        var x = Math.random() * (canvas.width - radius * 2) + radius; // Initial pos.
        var y = Math.random() * (canvas.height - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 2; // Velocity
        var dy = (Math.random() - 0.5) * 2;
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    
    //circle.update();
}

init();
animate();