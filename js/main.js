var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Composite = Matter.Composite,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Collision = Matter.Collision,
  Query = Matter.Query

var engine = Engine.create();
var render = Render.create({
  canvas: document.getElementById("canvas"),
  engine: engine,
  options: {
    height: 1080,
    width: 1920,
    wireframes: false,
  }
});

var Player = Bodies.rectangle(0, 500, 10, 20, {friction: 0.1, restitution: 0, density: 0.01});
  // Debug player :p
// var Player = Bodies.rectangle(700, -3500, 10, 20, {friction: 0.1, restitution: 0, density: 0.01})

let anchor = Bodies.rectangle(0, -800, 60, 0, { isStatic: true })
let hanging = Bodies.rectangle(0, -500, 60, 0, { label: "sticky" })

  //Multiple functions related to creating presets that can be placed in the world
function triangle(x, y, x2, y2, neg){
  return Bodies.trapezoid(x, y, neg*x2, y2, 2, { isStatic: true, label: 'ice' })
}
function swing(x, y, y2){
  anchor = Bodies.rectangle(x, y, 60, 60, { isStatic: true })
  hanging = Bodies.rectangle(x, y2, 60, 40, { label: "sticky" })
  const1 = Matter.Constraint.create({
    bodyA: anchor,
    pointA: {x: -20, y:0},
    bodyB: hanging,
    pointB: {x: -20, y:0}
  })
  const2 = Matter.Constraint.create({
    bodyA: anchor,
    pointA: {x: 20, y:0},
    bodyB: hanging,
    pointB: {x: 20, y:0}
  })
  return Composite.create({bodies:[
    anchor,
    hanging],
    constraints:[
      const1,
      const2  
    ]
  })
}
function rectPlatform(x,y){
  return Bodies.rectangle(x, y, 60, 20, { isStatic: true })
}
function oopsjump(x,y){
  return Composite.create({bodies: [
    Bodies.rectangle(x, y-12, 60, 50, { isStatic: true, label: 'noRagdoll' }), 
    triangle(x-35, y, 15, 40, -1), 
    triangle(x+35, y, 15, 40, 1)
  ]})
}

Composite.add(engine.world, [

  Player,
  Bodies.rectangle(105, 470, 100, 75, { isStatic: true }),
  
    // First 2 jumps 
  rectPlatform(480,400),
  rectPlatform(680,250),

    // Slide
  Bodies.rectangle(1155, 130, 20, 225, { isStatic: true, angle: -.3, label: 'slide'}),
  Bodies.rectangle(1300, 365, 20, 350, { isStatic: true, angle: -.7, label: 'slide'}),
  Bodies.rectangle(1500, 515, 20, 200, { isStatic: true, angle: -1.4, label: 'slide'}),
  Bodies.rectangle(1700, 475, 20, 250, { isStatic: true, angle: -2, label: 'slide'}),

    // Mountain start 
  Bodies.rectangle(980, 332, 50, 350, { isStatic: true }),
  Bodies.rectangle(1090, 120, 80, 40, { isStatic: true, angle: -.75, label: 'ice' }),
  Bodies.rectangle(1055, 320, 100, 375, { isStatic: true }),
  Bodies.rectangle(1125, 180, 40, 375, { isStatic: true }),
  
    // Ladder
  rectPlatform(935,-100),
  rectPlatform(935,-250),
  Bodies.rectangle(880, -150, 50, 350, { isStatic: true }),
  
    //Above Slide
  Bodies.rectangle(1350, -400, 250, 40, { isStatic: true }),
  Bodies.rectangle(1080, -550, 30, 40, { isStatic: true }),
  Bodies.rectangle(880, -550, 60, 40, { isStatic: true }),

    // Swing
  swing(640, -800, -500),

    
    // Pitfall
  Bodies.rectangle(100, -350, 50, 650, { isStatic: true, angle: -.3, label: 'ice'}),
  Bodies.rectangle(-45, -680, 150, 50, { isStatic: true }),
  rectPlatform(-70,-850),

  
    // Ladder 2
  Bodies.rectangle(180, -1075, 50, 170, { isStatic: true }),
  rectPlatform(125,-1000),
  rectPlatform(125,-1150),
    
    // Slope Climb
  Bodies.rectangle(735, -1325, 50, 75, { isStatic: true, label: 'noRagdoll' }),
  Bodies.rectangle(835, -1450, 50, 75, { isStatic: true, label: 'noRagdoll' }),
  Bodies.rectangle(935, -1575, 50, 75, { isStatic: true, label: 'noRagdoll' }),
  Bodies.rectangle(1035, -1700, 50, 75, { isStatic: true, label: 'noRagdoll' }),
  Bodies.rectangle(892, -1489, 780, 50, { isStatic: true, angle: -0.9, label: 'ice'}),
  Bodies.rectangle(1215, -1785, 200, 50, { isStatic: true, label: 'noRagdoll'  }),
  Bodies.rectangle(598, -1192, 140, 50, { isStatic: true, label: 'noRagdoll' }),
    
    // Launcher
  Bodies.rectangle(1400, -1630, 20, 225, { isStatic: true, angle: .3, label: 'slide'}),
  Bodies.rectangle(1355, -1425, 20, 225, { isStatic: true, angle: .1, label: 'slide'}),
  Bodies.rectangle(1365, -1225, 20, 225, { isStatic: true, angle: -.2, label: 'slide'}),
  Bodies.rectangle(1440, -1025, 20, 225, { isStatic: true, angle: -.5, label: 'slide'}),
  Bodies.rectangle(1580, -860, 20, 225, { isStatic: true, angle: -.9, label: 'slide'}),
  Bodies.rectangle(1780, -775, 20, 225, { isStatic: true, angle: -1.4, label: 'slide'}),
  Bodies.rectangle(1950, -755, 20, 125, { isStatic: true, angle: 1.575, label: 'slide'}),
  Bodies.rectangle(2125, -775, 20, 225, { isStatic: true, angle: 1.4, label: 'slide'}),
  Bodies.rectangle(2320, -865, 20, 225, { isStatic: true, angle: .9, label: 'slide'}),
  Bodies.rectangle(2460, -1025, 20, 225, { isStatic: true, angle: .5, label: 'slide'}),
  Bodies.rectangle(2530, -1225, 20, 225, { isStatic: true, angle: .2, label: 'slide'}),
  Bodies.rectangle(2540, -1425, 20, 225, { isStatic: true, angle: -.1, label: 'superlaunch'}),
  Bodies.rectangle(2500, -1630, 20, 225, { isStatic: true, angle: -.3, label: 'superlaunch'}),

  Bodies.rectangle(1315, -1615, 20, 225, { isStatic: true, label: 'slide'}),
  Bodies.rectangle(1305, -1395, 20, 225, { isStatic: true, angle: .1, label: 'slide'}),
  Bodies.rectangle(1315, -1195, 20, 225, { isStatic: true, angle: -.2, label: 'slide'}),
  Bodies.rectangle(1390, -995, 20, 225, { isStatic: true, angle: -.5, label: 'slide'}),
  Bodies.rectangle(1530, -830, 20, 225, { isStatic: true, angle: -.9, label: 'slide'}),
  Bodies.rectangle(1730, -735, 20, 225, { isStatic: true, angle: -1.4, label: 'slide'}),
  Bodies.rectangle(1950, -715, 20, 225, { isStatic: true, angle: 1.575, label: 'slide'}),
  Bodies.rectangle(2175, -735, 20, 225, { isStatic: true, angle: 1.4, label: 'slide'}),
  Bodies.rectangle(2370, -825, 20, 225, { isStatic: true, angle: .9, label: 'slide'}),
  Bodies.rectangle(2510, -995, 20, 225, { isStatic: true, angle: .5, label: 'slide'}),
  Bodies.rectangle(2580, -1205, 20, 225, { isStatic: true, angle: .2, label: 'slide'}),
  Bodies.rectangle(2590, -1425, 20, 225, { isStatic: true, angle: -.1, label: 'superlaunch'}),
  Bodies.rectangle(2550, -1630, 20, 225, { isStatic: true, angle: -.3, label: 'superlaunch'}),
  
   // Sloped Jumps
  Bodies.rectangle(1950, -1755, 1000, 50, { isStatic: true }),
  oopsjump(1500, -1920),
  oopsjump(1700, -2050),
  oopsjump(1500, -2175),
  oopsjump(1650, -1850),
  oopsjump(1900, -2000),
  oopsjump(2000, -2150),
  oopsjump(2050, -1850),
  oopsjump(2200, -1925),
  oopsjump(2250, -2075),

    // Swing Hell
  Bodies.rectangle(1750, -2300, 250, 25, { isStatic: true }),
  Bodies.rectangle(1125, -2300, 500, 25, { isStatic: true }),
  Bodies.rectangle(525, -2537, 500, 500, { isStatic: true }),
  triangle(445, -2820, 500, 100, 1),
  swing(1100, -2660, -2445),
  Bodies.rectangle(1172, -2855, 100, 450, { isStatic: true, label:"noRagdoll" }),
  rectPlatform(1135, -2830),
  triangle(1188, -3115, 100, 100, -1),
  swing(900, -3060, -2845),
  swing(700, -3360, -3165),

    // Final Jumps
  rectPlatform(800, -3500),
  rectPlatform(600, -3500),
  oopsjump(700, -3600),
  Bodies.rectangle(700, -3750, 75, 20, { isStatic: true }),
  Bodies.rectangle(700, -3900, 100, 20, { isStatic: true }),


    // Finish
  Bodies.rectangle(700, -4000, 500, 50, { isStatic: true, isSensor: true, label: "finish" }),

    // Floor
  Bodies.rectangle(503, 528, 1200, 60, { isStatic: true }) 

]);
Render.run(render);
var runner = Runner.create({isFixed: true});
Runner.run(runner, engine);

  // Loop through all bodies once and set colors & bloom on load of page depending on label, if no label assume normal platform as a backup.
Composite.allBodies(engine.world).forEach(e => {
  let color
  let bloom
  if (e.label === "ice" || e.label === "standingice"){
    color = "#75cee3"
    bloom = 50
  }else if(e.label === "slide" || e.label === "superlaunch"){
    color = "#ff5e5e"
    bloom = 250
  }else if(e.label === "sticky"){
    color = "#63b77e"
    bloom = 150
  }else if(e.label === "finish"){
    color = "#fff272"
    bloom = 150
  }else if(e === Player){
    color = "#ffffff"
    bloom = 35
  }else{
    color = "#1c1d29"
    bloom = 50
  }
  e.bloom = bloom
  e.render.fillStyle = color
  e.render.lineWidth = 0
})

let ctx = render.canvas.getContext("2d"),
  done = false,
  endPart = 0


let keysPressed = {},
  grounded = false,
  jumped = false,
  canMove = true,
  canRagdoll = true,
  zoom = true,
  fallTime = 0

  // Loop through what the player is standing on and check the types of all of them, usually not more than 1-2 at a time. 
  // Return true or false back to standingOn depending on if the type of ground is the same.
function floorCheck(type){
  let returns = false
  let longDownRay = Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x, y:Player.position.y+30})
  if (!grounded && type === 'standingIce' ){return returns}
  
  for (i=longDownRay.length - 1; i >= 0; i--){
    if(longDownRay[i].body.label === 'noRagdoll'){
      canRagdoll = false
      return returns
    }else if(longDownRay[i].body.label === type){
      canRagdoll = true
      returns = true
    }
  }

  if(Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x+10, y:Player.position.y}).length > 1 && Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x+10, y:Player.position.y})[1].body.label === type){
    returns = true
  }
  if(Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x+10, y:Player.position.y}).length > 1 && Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x+10, y:Player.position.y})[1].body.label === type){
    returns = true
  }
  return returns
}

  // Check if there is a specific type of floor under the player, if so disable friction and the ability to move
function standingOn(type, friction, duration){
  if (floorCheck(type)){
    if (!canRagdoll){return}
    fallTime = 0   

    if (canMove){
      loop()

      function loop(){

        setTimeout(() => {
          if (canMove){return}
          fallTime++

          if (fallTime<20 * duration){
            if (fallTime % 2 === 0){
              particleEmitter(1)
            }
            loop()
          }else{
            Player.friction = 0.1
            canMove = true
          }
        }, 50)
      }
    }
    Player.friction = friction
    canMove = false
  }
}

function gameFin(){
  done = true
  engine.gravity.scale = -0.00015
  let i = 0
  let opacity = 1
  let textOpacity = 0
  let transform = 50
  loop()
  function loop(){

    setTimeout(() => {
      i++

      if (endPart === 0) {

        if (i<500){
          document.getElementById("canvas").style.background = `rgba(20, 21, 31, ${opacity = opacity - 0.0015})`
          document.getElementById("canvas").style.outlineColor = `rgba(255, 255, 255, ${opacity = opacity - 0.0015})`
          loop()
        }else{endPart++; gameFin()}

      }else if(endPart === 1) {

        if (i<400){
          textOpacity = textOpacity + 0.0025
          document.getElementById("worth").style.opacity = textOpacity
          loop()
        }else{endPart++; gameFin()}

      }else if(endPart === 2) {

        if (i<600){
          transform = transform - 0.1
          opacity = opacity - 0.0025
          document.getElementById("canvas").style.top = `${transform}%`
          document.getElementById("canvas").style.opacity = opacity
          loop()
        }
      }

      console.log(endPart)
    }, 1);
  }
  setTimeout(() => {
    engine.gravity.scale = 0
  }, 5000);
}

function particleEmitter(amm){
  let time = 100
  let i = 0

  function rand(min, max){
    return Math.floor(Math.random() * (max - (min) + 1) + (min))
  }

  function particle(){
    let size = rand(10,25)
    return Bodies.rectangle(Player.position.x + rand(15, -15), Player.position.y + rand(10,25), size, size, {angle: Math.random(), frictionAir: 0.75, collisionFilter: 1, render: {fillStyle: '#ffffff'}, label: 'particle'})
  }

  let particleGroup = Composite.create({bodies: [
  ]})

  for(i=0; i<amm; i++){
    Composite.add(particleGroup, particle())
  }

  Composite.add(engine.world, particleGroup)
  
  loop()
  function loop(){
    setTimeout(() => {
      i++
      
      if (i<time){
        for(pl = 0; Composite.allBodies(particleGroup).length > pl; pl++){
          Composite.allBodies(particleGroup)[pl].render.opacity = 1 - i/100 
        }
        loop()

      }else{
        Composite.remove(engine.world, particleGroup)
      }
    }, 1);
  }

}  
Matter.Events.on(runner, "afterUpdate", (event) => {
  
    //This updates the delta that the game is running at to apply to many different refresh rates.
    //It takes a second to kick in for anything other than 60hz, FYI
  if (runner.fps > 60){
    runner.delta = 1000 / runner.fps
  }

  standingOn("ice", 0,2, 1)
  standingOn("standingIce", 0,2, 1)
  standingOn("slide", -0.5, 5)
  standingOn("superlaunch", -5, 5)

    // Prevent the player from falling into the void forever
  if (Player.position.y > 1000){
    Body.setPosition(Player, {x:0, y:500}) 
    Body.setAngle(Player, 0)
    Player.friction = 0.1
    canMove = true
  }

    // Move the camera with the player character + change zoom
  if (zoom){
    Render.lookAt(render, Player, {
      x: 480,
      y: 270
    });
  }else{
    Render.lookAt(render, Player, {
      x: 1280,
      y: 720
    });
    // Debug zoom amounts
    // Render.lookAt(render, Player, {
    //   x: 1920,
    //   y: 1080
    // });
    // Render.lookAt(render, Player, {
    //   x: 2880,
    //   y: 1620
    // });
  }

  let downRay = Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x, y:Player.position.y+15})
  let downLRay = Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x-5, y:Player.position.y+15})
  let downRRay = Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x+5, y:Player.position.y+15})
  
    // If the player can't move, don't run anything under this 
  if(!canMove || done){
    return;
  }else{
    Body.setAngle(Player, 0)
  }
  
    //Large movement script for jumping, left right, etc
  if (Object.values(keysPressed).includes("w") || Object.values(keysPressed).includes(" ")) {

    if (grounded && !jumped){
      jumped = true

      setTimeout(() => {
        jumped = false
      }, 500);

      Body.applyForce(Player, Player.position, { x: 0, y: -0.075 * (16.5/runner.delta) }) // For some reason jumping is the only force affected by framerate. The 16.5/runner.delta fixes this. 
      //No, I don't know why 16.5 is the magic number to get close enough to the previous jump height.
      particleEmitter(3)
    }
  }

    // If the player's on a swing, move the swing instead
  if (floorCheck("sticky")){

    let onSwing = downRay[0].body
    if (Object.values(keysPressed).includes("a") && Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x-7.5, y:Player.position.y}).length <= 1) {
      Body.applyForce(onSwing, Player.position, { x: -0.0025, y: 0 })
    }

    if (Object.values(keysPressed).includes("d") && Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x+7.5, y:Player.position.y}).length <= 1) {
      Body.applyForce(onSwing, Player.position, { x: 0.0025, y: 0 })
    }
    
    Player.friction = 5
  }else if(Player.friction !== 0.1){Player.friction = 0.1}

  if (Object.values(keysPressed).includes("a") && Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x-7.5, y:Player.position.y}).length <= 1) {
    
    if (grounded){
      if (!floorCheck("sticky")){
        Body.applyForce(Player, Player.position, { x: -0.0025, y: 0 })
      }
    }else{
      Body.applyForce(Player, Player.position, { x: -0.0005, y: 0 })
    }
  }
  if (Object.values(keysPressed).includes("d") && Query.ray(Composite.allBodies(engine.world), Player.position, {x:Player.position.x+7.5, y:Player.position.y}).length <= 1) {
    
    if (grounded){

      if (!floorCheck("sticky")){
        Body.applyForce(Player, Player.position, { x: 0.0025, y: 0 })
      }
      
    }else{
      Body.applyForce(Player, Player.position, { x: 0.0005, y: 0 })
    }
  }

    //Check if the player can jump w/ 200ms of coyote time 
  if((downRay.length > 1 || downRRay.length > 1 || downLRay.length > 1)){

    if(floorCheck("finish") && done === false){
      gameFin()
      grounded = false
      return
    }
    
    grounded = true
  }else{

    setTimeout(() => {
      if(downRay.length <= 1){
        grounded = false
      }
    }, 200);
    
  }
})

document.addEventListener('visibilitychange', function (event) {

  if (document.hidden) {
    Player.isStatic = true
    
  } else {
    runner.delta = 1000/60
    Body.setSpeed(Player, 0)
    Player.isStatic = false
  }
});

window.addEventListener("keydown", (event) => {
  console.log(keysPressed)
  keysPressed[event.key.toLowerCase()] = event.key.toLowerCase();
  if(event.key === "o"){
    zoom = !zoom
  }else if(event.key === "F1"){
    render.options.showPerformance = !render.options.showPerformance
  }
});

document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key.toLowerCase()];
});