/* 
    badge.js
    
    generic, should be replaced per site
    to draw and update the badge
*/

class Badge {

    constructor (){
        var canvas,
            context,
            step,
            steps,
            frames,
            delay,
            t;
        var centerX,
            centerY,
            radius,
            direction;
        var counter;
    }

    init() {
        var badge = document.getElementById("badge");
        this.canvas = badge.getElementsByTagName("canvas")[0];
        this.context = this.canvas.getContext("2d");
        var computed_width = window.getComputedStyle(badge, null).getPropertyValue('width');
        var computed_width = parseFloat(computed_width, 10)
        var computed_height = window.getComputedStyle(badge, null).getPropertyValue('height');
        var computed_height = parseFloat(computed_height, 10)
        var min_ = Math.min(computed_width, computed_height);
        this.context.canvas.width = min_;
        this.context.canvas.height = min_;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.context.fillStyle = "#FFFFFF";
        this.context.lineWidth = 8;
        this.context.strokeStyle = '#00F';
        this.counter = 0;
        this.radius = this.canvas.width / 2.25;
        this.frames = 360;
        this.step = 2.0 * Math.PI / this.frames;
        this.delay = 10; 
        this.direction = 1;
        this.animate();
    }

    animate(self) {
        if(!self)
            self = this;
        self.counter++;
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        var thisStep = (self.counter % self.frames) * self.step * self.direction;
        self.context.beginPath();
        self.context.arc(self.centerX, self.centerY, self.radius, 0, thisStep, false);
        self.context.stroke();
        self.t = setTimeout(()=>self.animate(self), self.delay);
    }

    start_stop() {
        if (this.t) {
            clearTimeout(this.t);
            this.t = null;
        } else {
            setTimeout(this.animate(), this.delay);
        }
    }
}        

var badge = new Badge;
