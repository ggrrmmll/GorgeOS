var canvas = document.querySelector("canvas"); // Select canvas

canvas.width = window.innerWidth; // Set canvas width to window width
canvas.height = window.innerHeight; // Set canvas height to window height

var c = canvas.getContext("2d"); // Get canvas context

function Circle(x, y, dx, dy, radius) {
    this.x = x; // Settings object variable
    this.y = y; 
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        //c.strokeStyle = "rgb(" + Math.random() * 255 + ", " + Math.random() * 255 + ", " + Math.random() * 255 + ")";
        c.strokeStyle = "blue";
        c.fillStyle = "red";
        c.stroke();
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

        this.draw()
    }
} // function with Capital letter on start = object

/* var circle = new Circle(200, 200, 4, 4, 30); // Clone the object "Cirlce" and set it as a variable
circle.draw(); // Call de draw funciton in "Circle"
 */

/* var x = Math.random() * canvas.width; // Initial pos.
var y = Math.random() * canvas.height;
var dx = (Math.random() - 0.5) * 8; // Velocity
var dy = (Math.random() - 0.5) * 8;
var radius = 30;

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false)
    c.strokeStyle = "blue";
    c.stroke()

    if (x + radius > canvas.width || x - radius < 0) {
        dx = -dx;
    }
    x += dx;

    if (y + radius > canvas.height || y - radius < 0) {
        dy = -dy;
    }
    y += dy;

}

animate(); */

var circleArray = [];

for (var i = 0; i < 100; i++) {
    var x = Math.random() * (canvas.width - radius * 2) + radius; // Initial pos.
    var y = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 2; // Velocity
    var dy = (Math.random() - 0.5) * 2;
    var radius = 30;
    circleArray.push(new Circle(x, y, dx, dy, radius))
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    
    //circle.update();
}

animate();