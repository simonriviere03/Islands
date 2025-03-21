
class leaf {
    constructor(posx, posy, longueur, base, decalage, angle_rotation, trait_milieu, col) {
        this.posx = posx;
        this.posy = posy;
        this.longueur = longueur;
        this.base = base;
        this.decalage = decalage;
        this.angle_rotation = angle_rotation;
        this.trait_milieu = trait_milieu;
        this.col = col;}
    
    change_value(arg, val){
        if (arg == "posx"){this.posx += val}
        if (arg == "angle_rotation"){this.angle_rotation += val}
        if (arg == "decalage"){this.decalage += val}
        }
   
    drawleaf() {

        // Points
        this.x1 = 0 ; this.y1 = 0;
        this.x2 = - this.base + this.decalage; this.y2 = - this.base; // point bas gauche
        this.x6 = this.base + this.decalage; this.y6 = - this.base; // point bas droite
        this.x3 = this.x2 + this.decalage; this.y3 = this.y2 - this.longueur; // point milieu gauche
        this.x5 = this.x6 + this.decalage; this.y5 = this.y2 - this.longueur; // point milieu droite
        this.x4 = this.decalage; this.y4 = this.y3 - this.longueur; // point haut
        // Points trait milieu
        this.xm1 = (this.x2 + this.x6)/2; this.ym1 = (this.y2 + this.y6)/2;
        this.xm2 = (this.x3 + this.x5)/2; this.ym2 = (this.y3 + this.y5)/2;
        this.xm3 = (this.x3 + this.x4 + this.x5)/3; this.ym3 = (this.y3 + this.y4 + this.y5)/3;

        push();
        //noFill();
        fill(this.col);
        translate(this.posx, this.posy);
        rotate(this.angle_rotation);
        // Feuille
        //noFill();
        beginShape();
        strokeWeight(1);
        curveVertex(this.x1, this.y1);
        curveVertex(this.x1, this.y1);
        curveVertex(this.x2, this.y2);
        curveVertex(this.x3, this.y3);
        curveVertex(this.x4, this.y4);
        curveVertex(this.x5, this.y5);
        curveVertex(this.x6, this.y6);
        curveVertex(this.x1, this.y1);
        curveVertex(this.x1, this.y1);
        endShape();
        // Trait milieu
        if (this.trait_milieu == 1){
        beginShape();
        curveVertex(this.xm1, this.ym1);
        curveVertex(this.xm1, this.ym1);
        curveVertex(this.xm2, this.ym2);
        curveVertex(this.xm3, this.ym3);
        curveVertex(this.xm3, this.ym3);
        endShape();}
        pop();
    }
}

class sunflower {
    constructor(posx, posy, hauteur_tronc, taille_centre, decalage_tronc, taille_feuilles, nb_feuilles) {
        this.posx = posx;
        this.posy = posy;
        this.coeff = 1 - 0.5*(1000 - this.posy)/1000; // Coefficient de taille en fonction de y
        this.hauteur_tronc = hauteur_tronc * this.coeff;
        this.decalage_tronc = decalage_tronc * this.coeff;
        this.taille_centre = taille_centre * this.coeff;
        this.taille_feuilles = taille_feuilles * this.coeff;
        this.nb_feuilles = nb_feuilles;
        this.colfeuilles = random(palette('col_feuilles_sunflowers', art_mode)); // couleur feuilles
    }

    drawsunflower() {
        // Tronc
        push();
        noFill();
        beginShape();
        strokeWeight(4);
        curveVertex(this.posx, this.posy);
        curveVertex(this.posx, this.posy);
        curveVertex(this.posx + this.decalage_tronc, this.posy - this.hauteur_tronc);
        curveVertex(this.posx, this.posy - 2 * this.hauteur_tronc);
        curveVertex(this.posx, this.posy - 2 * this.hauteur_tronc);
        endShape();
        pop();

        // Feuilles
        for (let a = 0; a < this.nb_feuilles; a+=1){
            //let longueur = random(this.taille_feuilles/2, this.taille_feuilles);
            //let base = random(this.taille_feuilles/15, this.taille_feuilles/5);
            // let decalage = random(0, this.taille_feuilles/10);
            let longueur = map(noise(x * a), 0, 1, this.taille_feuilles/2, this.taille_feuilles);
            let base = map(noise(x * a + 20), 0 , 1, this.taille_feuilles/15, this.taille_feuilles/5);
            let decalage = map(noise(x * a * x + 30), 0, 1, 0, this.taille_feuilles/10);
            let angle_rotation = (a *  360) / this.nb_feuilles;
            let feuille = new leaf(this.posx, this.posy - 2 * this.hauteur_tronc, longueur, base, decalage, angle_rotation, 1, this.colfeuilles);
            push();
            feuille.drawleaf();
            pop();
            push();
            pop();
        }
       // Coeur du tournesol
       push();
       fill(50);
       circle(this.posx, this.posy - 2 * this.hauteur_tronc, this.taille_centre); 
       pop();
    }

}

class rock {
    constructor(points, remplissage, colrock) {
        this.points = points
        this.remplissage = remplissage;
        this.colrock = colrock;
    }

    drawrock() {
        push();
        fill(this.colrock);
        noStroke();
        if (this.remplissage == 1){
            strokeWeight(1);
            stroke(0);}
        beginShape();
        for (let a = 0; a < this.points.length; a+=1){
            vertex(this.points[a].x, this.points[a].y);}
        endShape();
        pop();      
    }
}

class sun {
    constructor (posx, posy, r1, r2){
      this.posx = posx;
      this.posy = posy;
      this.r1 = r1;
      this.r2 = r2;
      }
    
    drawsun() {
      push();
      translate(this.posx, this.posy);
      let xoff = 3;
      for (let a = 0; a < 360; a += 2){
        line(this.r1 * cos(a), this.r1 * sin(a), (0.7 + 0.3 * noise(xoff)) * this.r2 * cos(a), (0.7 + 0.1 * noise(xoff)) * this.r2 * sin(a));
        xoff += 0.1;
      }
      pop();}
  }
  
class bois {
    constructor (posx, posy, r, longueur, angle, type_traits, ouvert_ferme, feuilles, colbois, colleaf){
      this.posx = posx;
      this.posy = posy;
      this.r = r;
      this.longueur = longueur;
      this.angle = angle;
      this.type_traits = type_traits;
      this.ouvert_ferme = ouvert_ferme;
      this.feuilles = feuilles; // si 1, on met des feuilles aleatoirement gauche ou droite, si 0 on met rien
      this.colbois = colbois;
      this.colleaf = colleaf;
      }
    
    drawbois() { // via formes
      push();
      translate(this.posx, this.posy);
      rotate(this.angle);
      fill(this.colbois);
      strokeWeight(1);
      // 1ere forme + ellipses bas + lignes
      beginShape();
      vertex(this.r/2, -this.longueur, this.r/2, 0);
      for (let a = 0; a < 180; a += 1){
      vertex(this.r/2 * cos(a), this.r/4 * sin(a));}
      for (let a = 180; a > -1; a -= 1){
      vertex(this.r/2 * cos(a), -this.longueur + this.r/4 * sin(a));}
      endShape();
      beginShape();
      let astop = 360;
      if (this.ouvert_ferme == 'ouvert') {astop = 180}
      for (let a = 0; a < astop; a += 1){
      vertex(this.r/2 * cos(a), -this.longueur + this.r/4 * sin(a));}
      endShape();
      
      // Traits
      if (this.type_traits == 1){ // Traits longueur
        noFill();
        for (let a = 1; a < 4; a += 1){
          let x = - this.r/2 + a * this.r/4;
          let y1 = -this.longueur/12 + random(-1, 3) * this.longueur/20; 
          let y2 =  -random(2, 4) * this.longueur/5;
          line(x, y1, x, y2);
        }  }
        pop();
    }
    drawboisleaf(){
        push();
        translate(this.posx, this.posy);
        rotate(this.angle);
      if (this.type_traits == 2){ // Traits largeur
        noFill();
        let size_random = this.r/100;
        for (let a = 1; a < 4; a += 1){
          let y1 = - (a + random(-0.2, 0.2)) * this.longueur/4; 
          let ini = int(random(30, 70));
          let fim = int(random(120, 150));
          beginShape();
          for (let a = ini; a < fim; a += 5){
              vertex(this.r/2 * cos(a) + random(-size_random, size_random), y1 + this.r/4 * sin(a));}
          endShape(); }}
        
        // Feuilles
        if (this.feuilles == 1){
            // x aleatoire, y aleatoire au dessus de la moitié
            xx = round(random(-1, 1)) * this.r/2; yy = random(-this.longueur/2, -this.longueur + this.longueur/8);
            translate(xx, yy);
            // Aleatoirement, entre 2 et 5 feuilles
            let nb_feuilles = int(random(2, 5 - 1));
            for (let a = 0; a < nb_feuilles; a +=1){
                let ang = a * 360 / nb_feuilles + random(-60, 60);
                let ff = new leaf(0, 0, 2 * this.r/3, 2 * this.r/5, random(0, 1), ang, 0, this.colleaf);
                //circle(0, 0, 20);
                ff.drawleaf();}}
      pop();
    }
  }
  
class bambou {
    constructor (posx, posy, nbetages, longueur, angle, largeur_bois){
        this.posx = posx;
        this.posy = posy;
        this.coeff = 1 - 0.5*(1000 - this.posy)/1000;
        this.nbetages = nbetages;
        this.longueur = longueur * this.coeff;
        this.largeur_bois = largeur_bois * this.coeff;
        this.angle = angle;
        this.colbois = random(palette('col_bois_bambou', art_mode));
        this.colfeuilles = random(palette('col_feuilles_bambous', art_mode));
    }

    drawbambou() {
        push();
        let lbambou = [];
        translate(this.posx, this.posy);
        rotate(this.angle);
        for (let a = 0; a < this.nbetages; a +=1){
            let ouv_fer = 'ouvert';
            let fe = int(random(-2.5, 2)); // feuilles ou pas
            if (a == this.nbetages - 1) {ouv_fer = 'fermé'}
            if (a == 0) {fe = 0}
            let oo = new bois(0, - a * this.longueur, this.largeur_bois, this.longueur, 0, 0, ouv_fer, fe, this.colbois, this.colfeuilles);
            lbambou.push(oo);}
        for (let a = 0; a < lbambou.length; a += 1){
            let oo = lbambou[a];
            oo.drawbois();
        }
        for (let a = 0; a < lbambou.length; a += 1){
            let oo = lbambou[a];
            oo.drawboisleaf();
        }
        pop();
    }
  }
  
class drapeau{
    constructor(posx, posy, taille_mat, hauteur, largeur, ajustement, angle_rotation, couleur) {
        this.posx = posx;
        this.posy = posy;
        this.angle_rotation = angle_rotation;
        this.coeff = 1 - 0.5*(1000 - this.posy)/1000;
        this.taille_mat = taille_mat * this.coeff;
        this.hauteur = hauteur * this.coeff;
        this.largeur = largeur * this.coeff;
        this.ajustement = ajustement;
        this.couleur = couleur;
    }
    
    drawflag1(){
        push();
        translate(this.posx, this.posy - this.taille_mat);
        rotate(this.angle_rotation);
        noFill();
        // Tronc drapeau
        let oo = new bois(0, this.taille_mat, 5, this.taille_mat + this.hauteur, 0, 0, 'fermé', 1, 255, 255);
        oo.drawbois();
        oo.drawboisleaf();
        // Points flag
        let list_pts = [];
        // Droite
        for (let a = 90; a <= 270; a += 10){
            list_pts.push(createVector(this.ajustement * cos(a) + this.largeur, this.hauteur * sin(a)));
        }
        // Haut
        for (let a = 0; a <= 180; a += 10){
            list_pts.push(createVector(this.largeur/2 + this.largeur/2 * cos(a), -this.hauteur + this.ajustement * sin(a)));
        }
        // gauche
        for (let a = -90; a <= 90; a += 10){ // 90 point bas gauche
            list_pts.push(createVector(this.ajustement * cos(a), this.hauteur * sin(a)));
        }
        // Bas
        for (let a = 180; a >= 0; a -= 10){
            list_pts.push(createVector(this.largeur/2 + this.largeur/2 * cos(a), this.hauteur - this.ajustement * sin(a)));
        }

        stroke(0); fill(this.couleur);
        beginShape();
        for (let a = 0; a < list_pts.length; a+=1){
            vertex(list_pts[a].x, list_pts[a].y);
        }
        endShape();
        
        // Remplissage - soleil
        strokeWeight(1);
        stroke(0);
        if (art_mode == 1) {stroke(255)}
        let rr1 = this.hauteur/2;
        circle(this.largeur/2, 0, rr1);
        for (let a = 0; a < 360; a += 5){
            for (let laa = rr1; laa < 1000; laa +=1){
                let xxx = laa * cos(a) + this.largeur/2;
                let yyy = laa * sin(a);
            if (is_inside(xxx, yyy, list_pts)){ point(xxx, yyy);}
            }
        }      
        // Remplissage - rond dans rond
        if (true){
            for (let a = 0; a < 360; a += 40){
                for (let laa = 0; laa < rr1/1.5; laa +=1){
                    let xxx = laa * cos(a) + this.largeur/2;
                    let yyy = laa * sin(a);
                if (is_inside(xxx, yyy, list_pts)){ point(xxx, yyy);}
                }
            }}

        pop();
        }

    drawflag2(){
        push();
        translate(this.posx, this.posy);
        rotate(this.angle_rotation);
        // Tronc drapeau
        let oo = new bois(0, this.taille_mat, 5, this.taille_mat + this.hauteur, 0, 0, 'fermé', 1, 255, 255);
        oo.drawbois();
        // Points flag
        strokeWeight(1);
        let list_points = [];
        list_points.push(createVector(0, 0));
        list_points.push(createVector(this.largeur/30, -this.hauteur/2));
        list_points.push(createVector(0, - this.hauteur));
        list_points.push(createVector(this.largeur/100, - this.hauteur*0.999));
        list_points.push(createVector(this.largeur/3, -this.hauteur));
        list_points.push(createVector(this.largeur/2.9, -this.hauteur/1.2));
        list_points.push(createVector(this.largeur/1.9, -this.hauteur/1.2));
        list_points.push(createVector(this.largeur/1.7, -this.hauteur));
        list_points.push(createVector(this.largeur/1.6, -this.hauteur));
        list_points.push(createVector(this.largeur/1.1, -this.hauteur));
        list_points.push(createVector(this.largeur, -this.hauteur));
        list_points.push(createVector(this.largeur * 1.01, -this.hauteur));
        list_points.push(createVector(this.largeur, -this.hauteur*0.99));
        list_points.push(createVector(this.largeur * 0.98, -this.hauteur/2));
        // add points symetry
        for (let a = list_points.length - 2; a >1; a -= 1){
            x = list_points[a].x; y = this.hauteur + list_points[a].y;
            list_points.push(createVector(x, y));
        }
        beginShape();        
        x = list_points[0].x; 
        y = list_points[0].y;
        vertex(x, y);
        for (let a = 0; a < list_points.length; a += 1){
            xx = list_points[a].x; yy = list_points[a].y;
            curveVertex(xx, yy);
        }
        x = list_points[list_points.length-1].x; 
        y = list_points[list_points.length-1].y;
        vertex(x, y);
        endShape();
        // Remplissage - soleil
        strokeWeight(1);
        let rr1 = this.hauteur/2;
        for (let a = 0; a < 360; a += 5){
            for (let laa = rr1; laa < 1000; laa +=1){
                let xxx = laa * cos(a) + this.largeur/2;
                let yyy = laa * sin(a) - this.hauteur/2;
            if (is_inside(xxx, yyy, list_points)){ point(xxx, yyy);}
            }
        }
        // Remplissage - rond dans rond
        if (true){
            for (let a = 0; a < 360; a += 40){
                for (let laa = 0; laa < rr1/1.5; laa +=1){
                    let xxx = laa * cos(a) + this.largeur/2 ;
                    let yyy = laa * sin(a) - this.hauteur/2;
                if (is_inside(xxx, yyy, list_points)){ point(xxx, yyy);}
                }
            }}
        pop();


    }
        
}

// Classe big rocher
class bigrock{
    constructor (posx, posy, angle_rocher, arocher, brocher, ratio_mini, decalx, decaly,
        ratio_herb, ratio_sunflower, ratio_bambou, densité, qtt_traits, randomnessrocks, flag,
        taille){
        this.posx = posx;
        this.posy = posy;
        this.angle_rocher = angle_rocher;
        this.arocher = arocher;
        this.brocher = brocher;
        this.ratio_mini = ratio_mini;
        this.decalx = decalx;
        this.decaly = decaly;
        this.qtt_traits = qtt_traits;
        this.randomnessrocks = randomnessrocks;
        this.ratio_herb = ratio_herb;
        this.ratio_sunflower = ratio_sunflower;
        this.ratio_bambou = ratio_bambou;
        this.densité = densité;
        this.flag = flag; // 'yes'/ 'no'
        this.taille = taille;
        this.colrock = random(palette('remplissage_rock', art_mode));
        this.list_points = create_list_points(this.posx, this.posy, this.angle_rocher, this.arocher, this.brocher);
    }

    xy_minmax(){
        //let list_points_rocher = this.create_list_points();
        let ymin = this.list_points[0].y; let ymax = this.list_points[0].y;
        let xmin = this.list_points[0].x; let xmax = this.list_points[0].x;
        for (let a = 0; a < this.list_points.length; a += 1){
            y = this.list_points[a].y; x = this.list_points[a].x;
            if (y < ymin) {ymin = y};
            if (y > ymax) {ymax = y};
            if (x < xmin) {xmin = x};        
            if (x > xmax) {xmax = x};}
        return [xmin, xmax, ymin, ymax]
    }

    draw_rocks(){
    //let list_points_rocher_1 = this.create_list_points();
    let list_points_rocher_2 = points_mini_rocher(this.list_points, this.posx, this.posy, this.ratio_mini, this.decalx, this.decaly);
    let oo = new rock(this.list_points, 1, this.colrock);
    let pp = new rock(list_points_rocher_2, 1, this.colrock);
    // Draw rock du bas // Relie les rocks // draw rock du haut
    pp.drawrock();
    multi_traits_horizontaux_entre_2_rochers(oo, pp, this.qtt_traits, this.randomnessrocks, this.colrock);
    oo.drawrock();
    }

    ratios_plants(){
        let soma = this.ratio_herb + this.ratio_sunflower + this.ratio_bambou;
        let novo_herb = this.ratio_herb/soma; // herb = tudo que ta < novo_herb
        let novo_sunflower = (this.ratio_herb + this.ratio_sunflower)/soma; // sunflower = tudo que ta < novo_sunflower
        let novo_bambou = 1;
        return [novo_herb, novo_sunflower, novo_bambou];
    }

    draw_herbe() {
        push();
        strokeWeight(1);
        stroke(0);
        let xy = this.xy_minmax();
        let xmin = xy[0]; let xmax = xy[1]; let ymin = xy[2]; let ymax = xy[3];
        // Herbe plus dense en mode couleur que en mode blanc
        let palier_x = 3; let palier_y = 5;
        if (art_mode == 0){
            palier_x = 5; palier_y = 10;
        }
        for (let x = xmin; x < xmax ; x += palier_x){
        for (let y = ymin; y < ymax + 10; y += palier_y) {
            let xx = x + random(-1, 1); let yy = y + random(-2, 2)
            // Taille herbe selon le y
            let taille_herbe = 7 * (1 - 0.5*(1000 - y)/1000);
            let value_prob = yy * (y - ymin)/(3*this.densité * (ymax - ymin));
            if (is_inside(xx, yy, this.list_points) && random(0, 1000) > value_prob){
            line(xx, yy, xx + 2 +  random(-1, 3), yy - taille_herbe);
        }}}
        pop();
    }

    fillpoints() {
        push();
        strokeWeight(1);
        fill(0);
        stroke(1);
        //let list_points_rocher =  this.create_list_points();
        let xy = this.xy_minmax();
        let xmin = xy[0]; let xmax = xy[1]; let ymin = xy[2]; let ymax = xy[3];
        for (let x = xmin; x < xmax ; x += 1){
            for (let y = ymin; y < ymax; y += 1) {
                if (is_inside(x, y, this.list_points)) {
                    point(x,y);
                }}
    }
}

    draw_plants(){
        push();
        let ratios = this.ratios_plants(); let oo;
        let r_herb = ratios[0]; let r_sunflower = ratios[1]; let r_bambou = ratios[2];
        let plantation = [];
        let nz = 0;
        let xy = this.xy_minmax();
        let xmin = xy[0]; let xmax = xy[1]; let ymin = xy[2]; let ymax = xy[3];
        // Coordonnées & dimensions flag - au milieu du rocher
        let xflag = 10000; let yflag = 10000;
        if (this.flag == 'yes'){
            xflag = (xmin + xmax)/2; yflag = (ymin + ymax)/2;
        }
        // Création de la liste de plantes
        for (let y = ymin-200; y < ymax+200; y += 10){
            for (let x = xmin -200; x < xmax + 200; x +=10) {
                let oo;
                nz += 0.01;
                let bruit = 2 * (noise(nz) - 0.5);
                let courbure = 10 * bruit;
                let direction = 1;                
                if (bruit < 0) { direction = -1}
                let angle_rot = - 90 * bruit ;
                let xx = x + 2 * random(-1, 1);
                let yy = y  + 0.6 * (ymax - ymin) * (x - xmin)/(xmax - xmin) + 20 * (y - ymin)/(ymax - ymin) * cos(1*(x - xmin) / (xmin - xmax));
                let cff = (1 - 0.5*(1000 - yy)/1000);
                let proba_plante = random(0, 1);
                let proba_zone = random(0, 1);
                let value_prob =  pow((yy - ymin), 0.95)/(2*this.densité * (ymax - ymin)) ; // pour mettre moins de densité vers le bas
                let hauteur_tronc = 120 * this.taille; let taille_centre = 30 * this.taille;
                if (is_inside(xx, yy, this.list_points) && (proba_zone > value_prob) && (x != xflag) && (y != yflag)) {
                    // Création herbes
                    if (proba_plante < r_herb) {
                        let taille_herb = 20 * cff * this.taille;
                        oo = new leaf(xx, yy, taille_herb, 2.5 * this.taille, courbure, angle_rot, 0, random(palette('col_feuilles_herbes', art_mode)));
                    }
                    // Créations sunflowers
                    if (proba_plante >= r_herb && proba_plante < r_sunflower) {
                        oo = new sunflower(xx, yy, hauteur_tronc, taille_centre, random(-10, 10), 40, 20);
                    }
                    // Création bambous
                    if (proba_plante >= r_sunflower && proba_plante < r_bambou) {
                        oo = new bambou(xx, yy, int(random(10, 20)), 20 * this.taille, 0, 10);
                    }
                    plantation.push(oo);}
                if ((x > xflag) && (y > floor(yflag))) { // dès qu'on depasse, on met le drapeau.
                    oo = new drapeau(xflag, yflag, 120 * this.taille, 40 * this.taille, 120 * this.taille, 10, 0, random(palette('col_drapeau', art_mode)));
                    plantation.push(oo);
                    xflag = 100000; yflag = 100000;
                }

          }}

        
        // Drawing des plantes
        for (let a = 0; a < plantation.length; a += 1){
            oo = plantation[a];
            if (is_inside(oo.posx, oo.posy, list_points_cadre)){
            try {oo.drawleaf();} catch {}
            try {oo.drawsunflower();} catch {}
            try {oo.drawbambou();} catch {}
            try {oo.drawflag1();} catch{}          
        }}
        pop();
    }
}


// Dit si un point est dans une forme
function is_inside(x, y, points) {    
    // Check if the point x,y is inside the shape made by the list points and translated at position posx, posy with angle angle_rotation
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let xj = points[j].x;
        let yj = points[j].y;
        let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) {inside = !inside;}
    }
    return inside;
  }

// Dessine des lignes de point a point
function rely_rocks(rock1, rock2) {
    let taille = rock1.points.length;
    let ycentre1 = (rock1.points[0].y + rock1.points[int(taille/2)].y) / 2; // milieu approximatif de l'ellipse du centre
    for (let a = 0; a < taille; a += 1){
        x1 = rock1.points[a].x; y1 = rock1.points[a].y;
        x2 = rock2.points[a].x; y2 = rock2.points[a].y;
        // Un point en plus entre les deux pour courbure
        x3 = (x1 + 3 * x2)/4; y3 = (y1 + y2)/2;
        // Dessine seulement pour les traits du bas (plus bas que le centre de l'ellipse)
        if (y1 > ycentre1){
            push();
            stroke(0); strokeWeight(1); noFill();
            beginShape();
            curveVertex(x1, y1);
            curveVertex(x1, y1);        
            curveVertex(x3, y3);
            curveVertex(x2, y2);
            curveVertex(x2, y2);
            endShape();
            pop();}
    }
}

// Dessine du grain entre les 2 rochers, avec filtre pour retirer les points situés sur le rocher tresor
function draw_points_entre_2_rocks(rock1, rock2){
    let points1 = rock1.points; let points2 = rock2.points;
    let taille = points1.length;
    let ymin1 = points1[0].y; let ymax1 = points1[0].y;
    let ymin2 = points2[0].y; let ymax2 = points2[0].y;
    // Identifier le ymin et le ymax
    for (let a = 0; a < taille; a += 1){
        y1 = points1[a].y; y2 = points2[a].y;
        if (y1 < ymin1) {ymin1 = y1};
        if (y1 > ymax1) {ymax1 = y1};
        if (y2 < ymin2) {ymin2 = y2};        
        if (y2 > ymax2) {ymax2 = y2};
    }
    let ycentre1 = (ymin1 + ymax1)/2;
    let ycentre2 = (ymin2 + ymax2)/2;
    // Selectionner les points compris entre ce min et max
    let new_points1 = []; let new_points2 = [];
    for (let a = 0; a < taille; a += 1){
        x1 = points1[a].x; y1 = points1[a].y;
        if (y1 > ycentre1) {new_points1.push(createVector(x1, y1))};
        x2 = points2[a].x; y2 = points2[a].y;
        if (y2 > ycentre2) {new_points2.push(createVector(x2, y2))} 
    }
    new_points = [].concat(new_points1, new_points2.reverse());
    if (1 == 1){
    push();
    strokeWeight(1); stroke(0); noFill();
    beginShape();
    for (let a = 0; a < new_points.length; a +=1){
        vertex(new_points[a].x, new_points[a].y);
    }
    endShape();
    pop();}
    // Mettre des points dans la shape et pas dans le rock1
    let xoff = 1;
    for (let i = -300; i < 800; i+= 0.5){
        for (let x = 0; x < width; x+= 5){
                let taille = 3 * noise(xoff + i/10);
                let y = i + 0.8 * (x + 2 * i) + 100 * sin(0.2* x);
                let xx = x + random(-2, 2);
                push();
                stroke(47, 79, 79, 150 + 100 * noise(xoff + i));
                strokeWeight(taille);
                if (is_inside(xx, y, new_points) && !is_inside(xx, y, points1)) {point(xx, y);}
                pop();}}
}

// Renvoie la liste des points mini d'un rocher
function points_mini_rocher(liste_points, xrocher, yrocher, ratio_mini, decalx, decaly){
    let liste_points_mini = [];
    for (let a = 0; a < liste_points.length ; a +=1){
        xx = liste_points[a].x; yy = liste_points[a].y;
        x = (xx - xrocher)/ratio_mini + xrocher + decalx; 
        y = (yy - yrocher)/ratio_mini + yrocher + decaly;
        liste_points_mini.push(createVector(x, y));}
    return liste_points_mini;
}

// Crée des rochers imbriqués
function multi_traits_horizontaux_entre_2_rochers(points1, points2, qtt_traits, randomnessrocks, colrock){
    // Créer plein de formes en partant de celle du bas jusqua celle du haut
    // points1 = rocher du haut, points2 = rocher du bas
    // Determiner le ratio
    points1 = points1.points; points2 = points2.points;
    let x1 = points1[0].x; let y1 = points1[0].y;
    let x2 = points2[0].x; let y2 = points2[0].y;
    let distance = pow(pow(x2 - x1, 2) + pow(y2 - y1, 2), 0.5);
    fill(colrock);
    for (let i = 0; i < distance; i += int(distance/qtt_traits)) {
        beginShape();
        for (let a = 0; a < points2.length; a +=1){
            xx1 = points1[a].x; yy1 = points1[a].y;
            xx2 = points2[a].x; yy2 = points2[a].y;
            xx3 = xx2  + (xx1 - xx2) * i / distance + random(-randomnessrocks, randomnessrocks);
            yy3 = yy2  + (yy1 - yy2) * i / distance + random(-randomnessrocks, randomnessrocks);
            vertex(xx3, yy3);
        }
        endShape();
    }
    
}

// Crée liste de points pour rocher
function create_list_points(posx, posy, angle_rocher, arocher, brocher){
    let list_points = [];
    for (let a = 0; a < 37; a+=1){
        x = posx + (1 + cos(angle_rocher)) * arocher * (cos(10 * a) + random(-0.1, 0.1));
        y = posy + (1 + sin(angle_rocher)) * brocher * sin(10 *a);
        list_points.push(createVector(x, y));}
        list_points.push(list_points[0]);
    return list_points;
}

function trait_tremblant(posx, posy, longueur, angle, randomness){
    push();
    strokeWeight(1);
    noFill();
    translate(posx, posy);
    rotate(angle);
    beginShape();
    vertex(0, 0);
    for (let a = 0; a < longueur; a += 10){
        vertex(a, random(-randomness, randomness));
    }
    endShape();
    pop();
}

function ellipse_tremblante(posx, posy, rayon1, rayon2, angle, randomness){
    push();
    strokeWeight(1);
    noFill();
    translate(posx, posy);
    rotate(angle);
    beginShape();
    for (let a = 0; a <= 360; a += 10){
        vertex((rayon1 + random(-randomness, randomness))* cos(a), (rayon2 + random(-randomness, randomness)) * sin(a));
    }
    endShape();
    pop();
}

function requin(posx, posy, longueur_trait, longueur_requin, hauteur_requin, angle, randomness, direction){
    push();
    strokeWeight(2);
    translate(posx, posy);
    rotate(angle);
    espace_vertical_traits = 10;
    // Traits bas
    trait_tremblant(0, 0, longueur_trait, 0, randomness);
    trait_tremblant(15, espace_vertical_traits, longueur_trait - 2 * 15, 0, randomness);
    // Trait haut
    if (longueur_trait/2 - longueur_requin > 0){
            trait_tremblant(15, -espace_vertical_traits, longueur_trait/2 - longueur_requin, 0, randomness);
            trait_tremblant(longueur_trait/2 + longueur_requin, -espace_vertical_traits, longueur_trait/2 - longueur_requin - 15, 0, randomness);
    }
    // Aileron -- créer liste points puis créer forme puis remplir
    noFill();
    points_requins = [];
    rayon_vertical_gauche = 50;
    x1 = longueur_trait/2 - longueur_requin/2; // point bas gauche
    y1 = -hauteur_requin/2
    y2 = - hauteur_requin; // point haut
    x3 = x1 + longueur_requin; // point bas droit
    for (let a = 90; a > -90; a -=1){
        xx = x1 + hauteur_requin/10 * cos(a); yy = y1 + hauteur_requin/2 * sin(a);
        points_requins.push(createVector(xx, yy));
    }
    for (let a = -90; a < 0; a +=1){
        xx = x1 + longueur_requin * cos(a); yy = hauteur_requin * sin(a);
        points_requins.push(createVector(xx, yy));
    }
    // Contour
    fill(255);
    beginShape();
    for (let a = 0; a < points_requins.length; a += 1){
        x = points_requins[a].x; y = points_requins[a].y;
        if (direction == 'left') { x = x1 + x3 - x
        points_requins[a] = createVector(x, y);}
        vertex(x, y)
    }
    endShape();
    // Remplissage
    strokeWeight(1);
    for (let a = 5; a < int(points_requins.length/2); a+=10){
        xx1 = points_requins[a].x; yy1 = points_requins[a].y;
        xx2 = points_requins[points_requins.length - int(a/2)].x
        xx2 = 0.5 * xx1 + 0.5 * (4 * xx2 + 1 + xx1)/5;
        line(xx1, yy1, xx2, yy1);
    }
    pop();
}

function remplissage_mer(x1, y1, x2, y2, densité, prop_traits, prop_bulles, prop_requins, taille, angle){
    points_vides = []; // lorsqu'on met un élement on ajoute les points de l'element + voisins à la liste interdite
    elements = [];
    soma = prop_traits + prop_bulles + prop_requins;
    prop_traits = prop_traits/soma;
    prop_bulles = prop_traits + prop_bulles/soma; 
    prop_requins = prop_bulles + prop_requins/soma;
    // Définition des proportions
    longueur_traits = taille; randomness_traits = 1;
    rayon1 = taille/25; rayon2 = rayon1 * 1.3; randomness_bulle = 0.1;
    longueur_trait_requin = taille; longueur_requin = taille/5; hauteur_requin = taille/3; randomness_requin = 1;
    // Création liste d'éléments
    for (let x = x1; x < x2; x += 1){
        for (let y = y1; y < y2; y += 1){
            prob = random(0, 1); 
            // Test sur densité et sur points_vides
            if (prob <= densité) {
                newprob = random(0, 1);
                // Traits
                if (newprob < prop_traits){
                    elements.push(['trait', x, y, random(longueur_traits * 0.8, longueur_traits * 1.2), angle, randomness_traits]);
                    }
                // Bulles
                if (newprob >= prop_traits && newprob < prop_bulles){
                    elements.push(['bulle', x, y, rayon1, rayon2, angle, randomness_bulle]);
                }
                // Requins
                if (newprob >= prop_bulles && newprob < prop_requins){
                    direction_requin = 'left';
                    if (x < width/2) { direction_requin = 'right'}
                    elements.push(['requin', x, y, longueur_trait_requin, random(0.9 * longueur_requin, 1.1 * longueur_requin), random(0.6 * hauteur_requin, 1.5 * hauteur_requin), angle, randomness_requin, direction_requin]);
                }
                }
                }
            }

    // Draw traits
    for (let a = 0; a < elements.length; a += 1){
        elem = elements[a];
        if (elem[0] == 'trait'){
            trait_tremblant(elem[1], elem[2], elem[3], elem[4], elem[5]);}
        }
    // Draw bulles
    for (let a = 0; a < elements.length; a += 1){
        elem = elements[a];
        if (elem[0] == 'bulle'){
            ellipse_tremblante(elem[1], elem[2], elem[3], elem[4], elem[5], elem[6]);}
        }
    // Draw requins
    for (let a = 0; a < elements.length; a += 1){
        elem = elements[a];
        if (elem[0] == 'requin'){
            requin(elem[1], elem[2], elem[3], elem[4], elem[5], elem[6], elem[7], elem[8]);}
        }

}

function background_remplissage(x1, y1, x2, y2, col){
    push();
    fill(255);
    pop(); push();
    r = red(col); g = green(col); b = blue(col);
    rect(x1, y1, x2-x1, y2-y1);
    for (let x = x1; x < x2; x+= 5){
        for (let y = y1; y < y2; y += 5){
            strokeWeight(8); // 5
            //stroke(color(r, g, b, 255 * (600 - y + 1200 - x)/1000));
            stroke(r, g, b);
            point(x, y); 
        }
    }
    pop();
}

function palette(type, art_mode){
    // art_mode par défaut: blanc
    let blanc = color(255, 255, 255);
    let res ;
    if (type == 'remplissage_rock'){
        res = [blanc];
        if (art_mode == 1){
            res = [
                color(222, 184, 135)
                //color(244, 164, 96)
            ];
        }
    }
    if (type == 'col_feuilles_herbes'){
        res = [blanc];
        if (art_mode == 1){
            res = [color(102, 205, 170), color(102, 205, 170), color(102, 205, 170),
                color(32, 178, 170)];
        }
    }
    if (type == 'col_feuilles_sunflowers'){
        res = [blanc];
        if (art_mode == 1){
            res = [
                color(255, 248, 220), color(255, 248, 220), // jaune clair
                color(255, 235, 205),
            ]
        }
        }
    if (type == 'col_bois_bambou'){
        res = [blanc];
        if (art_mode == 1){
            res = [
                //color(245, 222, 179),
                color(234, 221, 202),
            ]
        }
    }
    if (type == 'col_feuilles_bambous'){
        res = [color(205, 92, 92), blanc, blanc];
        if (art_mode == 1){
            res = [
                color(205, 92, 92), color(205, 92, 92), color(205, 92, 92), 
                color(234, 221, 202),color(234, 221, 202),color(234, 221, 202), 
                50, 80,
            ]
        }
    }
    if (type == 'col_drapeau'){
        res = [blanc];
        if (art_mode == 1){
            res = [
                50,
                color(0, 128, 128), // vert
                color(2, 48, 32), // vert 2
                color(131, 67, 51), // marron
                color(72, 60, 50) // marron 2
            ]
        }
    }
    if (type == 'col_background'){
        res = [blanc];
        if (art_mode == 1)
        res = [ 
            color(224, 255, 255), // bleu clair
            color(3*25, 3*25, 3*50), // bleu très foncé 
            //color(173, 216, 230), // bleu foncé
            color(250, 128, 114), // rose clair
            color(255, 255, 224), // jaune clair
       ];
    }
    return res;
}

/// Créer artwork aléatoire
/// créer remplissage etoiles pour la nuit
/// 7. Créer palette couleurs black -- wip
/// Créer autres remplissages pour le drapeau
/// Créer vent drapeau


