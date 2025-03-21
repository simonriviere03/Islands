
let art_mode = 1; // 0 - white, 1 - color
let determinism = 'rand' // 'determinist' - 'rand'
let proportion = 1;
let cadre = 70;

// Objects & Variables
let soleil;
let rocher; let liste_rochers = [];
let dmer = 0.0002; let prop_traits_mer = 200; let prop_bulles_mer = 100; let prop_requins_mer = 10;
let list_points_cadre;

function setup() {
  createCanvas(1000, 1000);
  noLoop();
  frameRate(1);
  angleMode(DEGREES);
  list_points_cadre = [
    createVector(cadre, cadre),
    createVector(cadre, height - cadre),
    createVector(width - cadre, height - cadre),
    createVector(width - cadre, cadre)];
  randomSeed(1);
  noiseSeed(5); // 3 - 14 - 24 - 27 -32
  // Rock right
  rocher = new bigrock(900, 400, 0, 200, 250, 2, -50, 200, 100, 5, 2, 0.8, 10, 5, 'no', proportion);
  liste_rochers.push(rocher);
  // Rock left
  rocher = new bigrock(200, 900, 0, 300, 300, 0.8, -50, 200, 100, 3, 2, 0.5, 30, 2, 'no', proportion);
  liste_rochers.push(rocher);
  // SUN
  soleil = new sun(350, 50, 100, 450);
 }


function draw() {
  background(255);
  let col_back = random(palette('col_background', art_mode));
  background_remplissage(0, 0, width, height, col_back)

   // Background - sea
  if (true) { remplissage_mer(0, 0, width, height, dmer, prop_traits_mer, prop_bulles_mer, prop_requins_mer, 60 * proportion, 0); }

  // ROCKS
  if (true){
    for (let a = 0 ; a < liste_rochers.length; a +=1){
      liste_rochers[a].draw_rocks();
      liste_rochers[a].draw_herbe();
      //liste_rochers[a].draw_plants();
    }
}

  // CADRE
  if (true){
    push();
    fill(col_back); 
    fill(255);
    noStroke();
    rect(0, 0, width, cadre);
    rect(0, height - cadre, width, cadre);
    translate(width, 0); rotate(90);
    rect(0, 0, width, cadre);
    rect(0, height - cadre, width, cadre);
    pop();
    push();
    noFill(); strokeWeight(1);
    rect(0 + cadre, 0 + cadre, width - 2 * cadre, height - 2 * cadre);
    pop();
    push();
    noFill();
    strokeWeight(1); stroke(0);
    //rect(20, 20, width - 40, height - 40);
    }

  // ROCKS
  if (true){
    for (let a = 0 ; a < liste_rochers.length; a +=1){
      liste_rochers[a].draw_plants();
    }
}

  // Grain
  if (true){
  loadPixels();
  let amount = 40;
  for (let x = 0; x < width; x+=1) {
      for (let y = 0; y < height; y+=1) {
          const pixel = get(x, y);
          let grainAmount = random(-amount, amount);
          const new_color = color(
              pixel[0] + grainAmount,
              pixel[1] + grainAmount,
              pixel[2] + grainAmount
          );

          set(x, y, new_color);
      }
  }

  updatePixels(); }
  
}


