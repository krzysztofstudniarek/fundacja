
var width = 1070, height = 627;
var win = false, loose = false, inGame = false;

var background, font, bang, bang_cooldown = 500;

var hit_sprites = [];
var hits = [];

var neurons = [];
var neuron_sprite;

var hero = {
    x : width/2,
    y : height/2,
    vx : 0,
    vy : 0,
    hp : 35,
    sprite_left : undefined,
    sprite_right : undefined,
    sprite_kick_left : undefined,
    sprite_kick_right : undefined,
    sprite_current : undefined,
    sprite_face : undefined,
    kick : false
}

var brain = {
    x : 100,
    y : 10,
    vx : 2,
    vy : -2,
    hp : 35,
    sprite_left : undefined,
    sprite_right : undefined,
    rotation: 1,
    cooldown: 0
}

// drawing function
function draw()
{
    stretch_blit(background,canvas,0,0,background.w,background.h,0,0,width,height);

    if(inGame && !win && !loose){   
        if(hero.vx == 0){
            scaled_sprite(canvas,hero.sprite_current,hero.x,hero.y, 0.1, 0.1);
        }else if(hero.vx < 0){
            rotate_scaled_sprite(canvas,hero.sprite_current,hero.x,hero.y, 10, 0.1, 0.1);
        }else{
            rotate_scaled_sprite(canvas,hero.sprite_current,hero.x,hero.y, -10, 0.1, 0.1);
        }

        if(brain.vx <= 0){
            rotate_scaled_sprite(canvas, brain.sprite_left, brain.x, brain.y, brain.rotation, brain.hp/100, brain.hp/100);
        }else{
            rotate_scaled_sprite(canvas, brain.sprite_right, brain.x, brain.y, brain.rotation, brain.hp/100, brain.hp/100);
        }

        hits.forEach(function (hit){
            hit.cooldown --;
            if(hit.cooldown >= 0){
                rotate_scaled_sprite(canvas, hit.sprite ,hit.x, hit.y, hit.rotation, 0.3*hit.cooldown/60, 0.3*hit.cooldown/60);
            }  
        });

        neurons.forEach(function (neuron){
            neuron.cooldown --;
            if(neuron.cooldown >=0 ){
                rotate_scaled_sprite(canvas, neuron.sprite ,neuron.x, neuron.y, neuron.rotation, 0.1, 0.1);
            }
        });
    }else if(!inGame && !win && !loose){
        textout_centre (canvas, font, "Wcisnij SPACJE, zeby rozpoczac gre", width/2, height/2, 40, makecol(0,0,0));
    }else{
         if(win){
            textout_centre (canvas, font, "Brawo, dales kopniaczka potworowi padaczce!", width/2, height/2, 40, makecol(0,0,0));
        }else{
            textout_centre (canvas, font, "Niestety nie udalo sie.", width/2, height/2, 40, makecol(0,0,0));
            textout_centre (canvas, font, "Odswiez strone i sprobuj jeszcze raz!", width/2, height/2+50, 40, makecol(0,0,0));
        }

        bang_cooldown -= 5;
        if(bang_cooldown >=0){
            scaled_sprite(canvas,bang,width/2,height/2, bang_cooldown/500, bang_cooldown/500);
        }
    }

    
}

// update game logic
function update()
{
    if(inGame && !win && !loose){
        hero.x += hero.vx;
        hero.y += hero.vy;

        if(hero.x < 0){
            hero.x = 0;
        }
        if(hero.x > width){
            hero.x = width;
        }

        if(hero.y < 0){
            hero.y = 0;
        }
        if(hero.y > height){
            hero.y = height;
        }

        if(brain.y < 0 || brain.y > height){
            brain.vy = -brain.vy;
        }

        if(brain.x < 0 || brain.x > width){
            brain.vx = - brain.vx;
        }

        
        brain.rotation = angle(brain.x, brain.y, brain.x - brain.vx, brain.y - brain.vy);
        brain.x += brain.vx;
        brain.y += brain.vy;
    }
}

function controls()
{
    if(inGame){
        if((pressed[KEY_UP] )){
            hero.vy = -5;
        }

        if((pressed[KEY_DOWN] )){
            hero.vy = 5;
        }
        
        if(released[KEY_DOWN] || released[KEY_UP]){
            hero.vy = 0;
        }
        
        //moving left
        if(pressed[KEY_LEFT]){
            goingLeft = true;
            hero.vx = -5;
            hero.sprite_current = hero.sprite_left;
        }
        
        //moving right
        if(pressed[KEY_RIGHT]){
            goingRight = true;
            hero.vx = 5;
            hero.sprite_current = hero.sprite_right;
        }

        if(pressed[KEY_SPACE]){
            hero.kick = true;
            if(hero.vx >= 0){
                hero.sprite_current = hero.sprite_kick_right;
            }else{
                hero.sprite_current = hero.sprite_kick_left;          
            }
        }

        if(released[KEY_SPACE]){
            hero.kick = false;
            if(hero.vx >= 0){
                hero.sprite_current = hero.sprite_right;
            }else{
                hero.sprite_current = hero.sprite_left;          
            }
        }
        
        //stop moving right
        if(released[KEY_RIGHT] || released[KEY_LEFT]){
            hero.vx = 0;
        }
    }else if(!inGame){
        if(pressed[KEY_SPACE]){
            inGame = true;
        }
    }
}

function logic(){

    if(brain.cooldown > 0){
        brain.cooldown --;
    }

    if(Math.random() < 0.005){
        neurons.push({
            x: brain.x,
            y: brain.y,
            sprite : neuron_sprite,
            rotation : Math.floor(Math.random() * 180),
            cooldown : 500
        })
    }

    if(brain.cooldown <= 0 && hero.kick && Math.abs(hero.x-brain.x) <= (brain.hp*1024)/200 && Math.abs(hero.y-brain.y) <= (brain.hp*715)/200){
        brain.hp -= 5;
        brain.cooldown = 120;
        brain.vx = -brain.vx*1.3;
        brain.vy = -brain.vy*1.3;
        hits.push({
            x : brain.x,
            y : brain.y,
            sprite : hit_sprites[Math.floor(Math.random() * 4)],
            cooldown : 60,
            rotation: Math.floor(Math.random() * 40)- 20
        });
    }

    neurons.forEach(function (neuron, index){
        if(neuron.cooldown >=0 && Math.abs(hero.x - neuron.x)<=50 && Math.abs(hero.y - neuron.y)<=50){
            hero.hp -= 5;
            neurons.splice(index, 1);
        }
    });
}

function won(){
    win = brain.hp <= 0;
    loose = hero.hp <= 0; 
    console.log(win);
    inGame = ! (win || loose);
}

function drawInterface(){
    rectfill ( canvas, 13, 38, 354, 14, 0xFFFFFFFF);   
    rectfill ( canvas, 15, 40, hero.hp*10, 10, 0xFFFF0000);
    scaled_sprite(canvas,hero.sprite_face,400,40, 0.2, 0.2);
    
    rectfill ( canvas, width - 367, 38, 354, 14, 0xFFFFFFFF);   
    rectfill ( canvas, width - 365, 40, brain.hp*10, 10, 0xFFFF0000)
    scaled_sprite(canvas,brain.sprite_left,650,40, 0.1, 0.1);


}

function initGraphics(){
    hero.sprite_right = load_bmp("graphics/hero.png");
    hero.sprite_left = load_bmp("graphics/heroL.png");
    hero.sprite_current = hero.sprite_left;
    hero.sprite_kick_right = load_bmp("graphics/heroKickR.png");
    hero.sprite_kick_left = load_bmp("graphics/heroKickL.png");
    hero.sprite_face = load_bmp("graphics/face.png");

    brain.sprite_right = load_bmp("graphics/musk.png")
    brain.sprite_left = load_bmp("graphics/muskL.png");

    neuron_sprite = load_bmp("graphics/neuron.png");

    for(var i=1; i<5; i++){
        hit_sprites.push(load_bmp("graphics/kick"+i+".png"));
    }

    font = load_font ("Galpon-Black.otf");

    bang = load_bmp("graphics/boom.png")

}

// entry point of our example
function main()
{
	enable_debug("debug");
	allegro_init_all("canvas_id", width, height);
        
    initGraphics();

    console.log(hit_sprites);

    background = load_bmp("graphics/back.png");
	ready(function(){
		loop(function(){
			clear_to_color(canvas, makecol(255, 255, 255));

            controls();
			update();
            logic();
			draw();
            drawInterface();
            won();
	
		}, BPS_TO_TIMER(60));
	});
	
	return 0;
}
END_OF_MAIN();