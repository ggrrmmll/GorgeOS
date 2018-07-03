var canvas = document.querySelector("canvas"); // Select canvas

canvas.width = window.innerWidth; // Set canvas width to window width
canvas.height = window.innerHeight; // Set canvas height to window height

var c = canvas.getContext("2d"); // Get canvas context

c.fillStyle = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"; // Sets a fill color any CSS color is allowed
c.fillRect(100, 100, 200, 100); // Draw rectangle
c.fillStyle = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"; // Sets a fill color any CSS color is allowed
c.fillRect(100, 300, 200, 100); // X, Y , WIDTH, HEIGHT 
c.fillStyle = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")"; // Sets a fill color any CSS color is allowed
c.fillRect(400, 250, 50, 50); // X, Y , WIDTH, HEIGHT

// Lines

c.beginPath(); // Start drawing
c.moveTo(100, 400); // X, Y Indicates start point when drawing a line
c.lineTo(300, 100); // X, Y Adds a point to draw
c.lineTo(400, 250); // X, Y Adds a point to draw
c.strokeStyle = "red"; // Sets stroke color to any CSS color
c.stroke(); // Tells the canvas to draw a solid line between those points.

// Arc / circle

c.beginPath(); // Stop making that the line joins to the startpoint of our arc
c.arc(400, 200, 30, 0, Math.PI * 2, false) // X, Y, Radius, Start Angle, End angle, anticlockwise Draw an arc (In this case a circle)
c.strokeStyle = "lightGreen";
c.fillStyle = "green";
c.stroke(); // Stroke the arc
c.fill(); // Fill content with a color or css style

// Draw multiple circles on random locations using for loop
for (var i = 0; i < 255; i++) {
    var x = Math.random() * window.innerWidth; // Math.random gives a number between 1 and 0
    var y = Math.random() * window.innerHeight;
    //var x = i * 2 + 50 
    //var y = i * 2 + 50 
    c.beginPath(); 
    c.arc(x, y, 30, 0, Math.PI * 2, false) 
    c.strokeStyle = "blue";
    c.stroke(); 
}
