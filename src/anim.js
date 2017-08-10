(function() {
  var canvasBody = document.getElementById('canvas'),
    canvas = canvasBody.getContext("2d"),

    w = canvasBody.width = window.innerWidth,
    h = canvasBody.height = window.innerHeight,

    opts = {
      particleAmount: 50,

      backgroundColor: "#222",
      particleColor: "#fcfcfc",

      defaultRadius: 2,
      addedRadius: 2,

      defaultSpeed: 1,
      addedSpeed: 2
    },
    particles = [],

    Particle = function(Xpos, Ypos) {
      this.x = Xpos
        ? Xpos
        : Math.random() * w;
      this.y = Ypos
        ? Ypos
        : Math.random() * h;

      this.speed = opts.defaultSpeed + Math.random() * opts.addedSpeed;
      this.directionAngle = Math.floor(Math.random() * 360);
      this.color = opts.particleColor;
      this.radius = opts.defaultRadius + Math.random() * opts.addedRadius;
      this.d = {
        x: Math.cos(this.directionAngle) * this.speed,
        y: Math.sin(this.directionAngle) * this.speed
      };

      this.update = function() {
        this.border();
        this.x += this.d.x,
        this.y += this.d.y
      };

      this.border = function() {
        if (this.x >= w || this.x <= 0) {
          this.d.x *= -1;
        }
        if (this.y >= h || this.y <= 0) {
          this.d.y *= -1;
        }
        this.x > w
          ? this.x = w
          : this.x;
        this.y > h
          ? this.y = h
          : this.y;
        this.x < 0
          ? this.x = 0
          : this.x;
        this.y < 0
          ? this.y = 0
          : this.y;
      };

      this.draw = function() {
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        canvas.closePath();
        canvas.fillStyle = this.color;
        canvas.fill();
      }
    },
    checkDistance = function(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

  function setup() {
    for (var i = 0; i < opts.particleAmount; i++) {
      particles.push(new Particle());
    }
    console.log(particles);
    window.requestAnimationFrame(loop);
  }
  function loop() {
    canvas.fillStyle = opts.backgroundColor;
    canvas.fillRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    window.requestAnimationFrame(loop);
  }

  setup();
  canvasBody.addEventListener("click", function(e) {
    particles.push( new Particle (e.pageX, e.pageY) );
    console.log(particles.length);
  })
})();
