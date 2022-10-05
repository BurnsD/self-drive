class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const fakeInfinity = 1000000;
    this.top = -fakeInfinity;
    this.bottom = fakeInfinity;

    // Create Borders of road for collision detection
    const topLeft = { x: this.left, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const topRight = { x: this.right, y: this.top };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  getLaneCenter(laneindex) {
    const laneWidth = this.width / this.laneCount;
    return (
      this.left +
      laneWidth / 2 +
      //   Add minimum value to insure car is within visible lanes
      Math.min(laneindex, this.laneCount - 1) * laneWidth
    );
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    // Calculate and animate lanes
    for (let i = 1; i <= this.laneCount - 1; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);

      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }

    ctx.setLineDash([]);
    this.borders.forEach(border=>{
        ctx.beginPath();
        ctx.moveTo(border[0].x,border[0].y);
        ctx.lineTo(border[1].x,border[1].y);
        ctx.stroke();
    });
  }
}
