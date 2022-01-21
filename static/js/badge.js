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
    badge_init() {
        var badge = document.getElementById("badge");
        this.canvas = badge.getElementsByTagName("canvas")[0];
        this.context = this.canvas.getContext("2d");
        
        
        // set canvas size based on container
        // canvas is always a square of the minimum dimension
        var computed_width = window.getComputedStyle(badge, null).getPropertyValue('width');
        var computed_width = parseFloat(computed_width, 10)
        var computed_height = window.getComputedStyle(badge, null).getPropertyValue('height');
        var computed_height = parseFloat(computed_height, 10)
        var min_ = Math.min(computed_width, computed_height);
        this.context.canvas.width = min_;
        this.context.canvas.height = min_;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;

        // debug
        console.log('computed_width = ' + computed_width);
        console.log('computed_height = ' + computed_height);
        console.log('canvas.width = ' + this.canvas.width);
        console.log('canvas.height = ' + this.canvas.height);
        console.log('centerX = ' + this.centerX);
        console.log('centerY = ' + this.centerY);

        this.context.fillStyle = "#FFFFFF";
        this.context.lineWidth = 8;
        this.context.strokeStyle = '#00F';
        this.counter = 0;
        this.radius = this.canvas.width / 2.25;

        // frames = 60;
        this.frames = 360;
        this.step = 2.0 * Math.PI / this.frames;
        // delay = 25; 
        this.delay = 10; 
        this.direction = 1;

        this.badge_animate();
    }
    badge_animate(self) {
        if(!self)
            self = this;
        self.counter++;
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        var thisStep = (self.counter % self.frames) * self.step * self.direction;

        // change direction? in process
        // if (thisStep == 0) { direction = !direction; }
        // console.log(thisStep);

        self.context.beginPath();
        self.context.arc(self.centerX, self.centerY, self.radius, 0, thisStep, false);
        self.context.stroke();
        self.t = setTimeout(()=>self.badge_animate(self), self.delay);
    }
    badge_start_stop() {
        if (this.t) {
            clearTimeout(this.t);
            this.t = null;
        } else {
            setTimeout(this.badge_animate(), this.delay);
        }
    }
}

var badge_obj = new Badge;

