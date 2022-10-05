class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;

    this.controls = new Controls();
  }

  update() {
    // Forward Acceleration
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    // Reverse Acceleration
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }
    // If speed reaches max speed set value of speed to max speed
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }
    // Add friction for better car mechanics
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    // Makes sure the car doesn't move forward forever by resetting speed if less than friction
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    // left and right controls. Flip implemented for realistic reverse mechanics. 
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }
    // Adjust the x axis according to the sin refering to the unit circle
    this.x -= Math.sin(this.angle) * this.speed;
    // Adjust the y axis according to the cos refering to the unit circle
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();

    ctx.restore();
  }
}
