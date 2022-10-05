const canvas=document.getElementById("myCanvas");
canvas.width=200;

const ctx = canvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9);
// Using getLaneCenter we can position the starting point in a desired lane
const car=new Car(road.getLaneCenter(2),100,30,50);
car.draw(ctx);

animate();

function animate(){
    car.update();
    canvas.height=window.innerHeight;
    road.draw(ctx)
    car.draw(ctx);
    requestAnimationFrame(animate);
}