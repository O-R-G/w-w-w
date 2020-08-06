/* 
    badge.js
    
    generic, should be replaced per site
    to draw and update the badge
*/

var canvas,
    context,
    step,
    steps,
    frames,
    delay;
var centerX,
    centerY,
    radius,
    direction;
var counter;

function init_badge() {
    var badge = document.getElementById("badge");
    canvas = badge.getElementsByTagName("canvas")[0];
    context = canvas.getContext("2d");


    computed_width = window.getComputedStyle(badge, null).getPropertyValue('width');
    computed_height = window.getComputedStyle(badge, null).getPropertyValue('height');

    canvas.width = computed_width;
    canvas.height = computed_height;

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

console.log('computed_width = ' + computed_width);
console.log('computed_height = ' + computed_height);
console.log('canvas.width = ' + canvas.width);
console.log('canvas.height = ' + canvas.height);
console.log('centerX = ' + centerX);
console.log('centerY = ' + centerY);

    // centerX = computed_width / 2;
    // centerY = computed_height / 2;

    context.fillStyle = "#FFFFFF";
    context.lineWidth = 8;
    var grad = context.createLinearGradient(50, 50, 150, 150);
    grad.addColorStop(0, "#FF0000");
    // grad.addColorStop(1, "#FCC");
    grad.addColorStop(1, "transparent");
    context.strokeStyle = grad;
    counter = 0;
    radius = canvas.width / 2.25;
    frames = 60;
    step = 2.0 * Math.PI / frames;
    delay = 25;
    direction = 1;
    animate();
}

function animate() {
    counter++;
    context.clearRect(0, 0, canvas.width, canvas.height);
    var thisStep = (counter % frames) * step * direction;

    // change direction? in process
    // if (thisStep == 0) { direction = !direction; }
    // console.log(thisStep);

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, thisStep, false);
    context.stroke();
    var t = setTimeout('animate()', delay);
}
