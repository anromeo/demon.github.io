function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.startX = startX;
    this.startY = startY;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    this.angle = 0;
    this.originalFameWidth = frameWidth;
}
/**
 * Draws the frame of the animation based off of the click.
 * @param tick is the tick of the game clock
 * @param ctx is the canvas
 * @param x
 * @param y
 * @param scaleBy
 */
Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {

    // The scale by number that scales the size of the animation
    // scaleBy = 1;
    var scaleBy = scaleBy || 1;
    // The currently elapsed time that has passed
    this.elapsedTime += tick;
    // if we are looping
    if (this.loop) {
        // if it is done -- the elapsed time has surpassed the total time
        if (this.isDone()) {
            // reset the elapsed time to 0
            this.elapsedTime = 0;
        }
    // else if there is no loop and this is done
    } else if (this.isDone()) {
        // return... so do nothing
        return;
    }

    // if this animation is being shot backwards,
    // then take the number of total frames and subtract the current frame and one more
    // otherwise just take this current frame
    //
    // index = 0;
    var index = this.reverse ? this.frames - this.currentFrame() - 1 : this.currentFrame();
    // vindex = 0;
    var vindex = 0;


    // if the index * the framewidth + the start x coordinate is greater than the width of the spritesheet
    // 1 * 64 + 0 > 512 
    if ((index + 1) * this.frameWidth + this.startX > this.spriteSheet.width) {
        // Get the index minus the spritesheet width minus the starting x / divided by the frame width
        index -= Math.floor((this.spriteSheet.width - this.startX) / this.frameWidth);
        // increment the vindex
        vindex++;

    }

    // while the frame is greater than the sprite sheet width, move back a frame\
    //
    while ((index + 1) * this.frameWidth > this.spriteSheet.width) {
        index -= Math.floor(this.spriteSheet.width / this.frameWidth);
        // and increment the viendex
        vindex++;
    }

    var locX = x;
    var locY = y;
    var offset = vindex === 0 ? this.startX : 0;


    // ctx.drawImage(this.spriteSheet,
    //               index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
    //               this.frameWidth, this.frameHeight,
    //               locX, locY,
    //               this.frameWidth * scaleBy,
    //               this.frameHeight * scaleBy);

    if (this.breakit) {
        this.breakit
        // if (index * this.frameWidth + offset > 10) {
            this.breakit2 = true;
        }
        // }
        // ctx.drawImage(this.spriteSheet,
        //               this.frameWidth * (this.spriteSheet.width / this.frameWidth - .5), vindex * this.frameHeight + this.startY,  // source from sheet
        //               this.frameWidth, this.frameHeight,
        //               locX, locY,
        //               this.frameWidth * scaleBy,
        //               this.frameHeight * scaleBy);

        // ctx.drawImage(this.spriteSheet,
        //               index * this.frameWidth + offset - 224, vindex * this.frameHeight + this.startY,  // source from sheet
        //               this.frameWidth, this.frameHeight,
        //               locX, locY,
        //               this.frameWidth * scaleBy,
        //               this.frameHeight * scaleBy);

        // ctx.drawImage(this.spriteSheet,
        //               0, 0,  // source from sheet
        //               this.spriteSheet.width, this.spriteSheet.height,
        //               locX, locY,
        //               this.spriteSheet.width * scaleBy,
        //               this.spriteSheet.height * scaleBy);

    ctx.drawImage(this.spriteSheet,
                  index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
                  this.frameWidth, this.frameHeight,
                  locX, locY,
                  this.frameWidth * scaleBy,
                  this.frameHeight * scaleBy);

    // } else {

    // ctx.drawImage(this.spriteSheet,
    //               index * this.frameWidth + offset, vindex * this.frameHeight + this.startY,  // source from sheet
    //               this.frameWidth, this.frameHeight,
    //               locX, locY,
    //               this.frameWidth * scaleBy,
    //               this.frameHeight * scaleBy);

    //     ctx.drawImage(this.spriteSheet,
    //                   0, 0,  // source from sheet
    //                   this.spriteSheet.width, this.spriteSheet.height,
    //                   locX, locY,
    //                   this.spriteSheet.width * scaleBy,
    //                   this.spriteSheet.height * scaleBy);

        // ctx.drawImage(this.spriteSheet,
        //               0, 0,  // source from sheet
        //               this.spriteSheet.width, this.spriteSheet.height,
        //               locX, locY,
        //               this.spriteSheet.width * scaleBy,
        //               this.spriteSheet.height * scaleBy);
//    }
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.radius = 200;
}

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.update = function () {
}

Background.prototype.draw = function (ctx) {
    ctx.fillStyle = "SaddleBrown";
    ctx.fillRect(0,500,800,300);
    Entity.prototype.draw.call(this);
}


function Demon(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/demon-walking.png"), 0, 0, 64, 64, .05, 8, true, false);
    this.radius = 100;
    this.ground = 400;
    this.currentDirectionX = 0;
    this.currentDirectionY = -2;
    Entity.call(this, game, 0, 400);
}

Demon.prototype = new Entity();
Demon.prototype.constructor = Demon;

Demon.prototype.rotateDemon = function(angleInDegrees) {
    this.animation.spriteSheet = this.rotateAndCache(ASSET_MANAGER.getAsset("./img/demon-walking.png"), angleInDegrees);
    this.animation.angle = angleInDegrees;
//    console.log(Math.PI * );
//    this.animation.startX = this.frameWidth * (this.frames - 1);
}
Demon.prototype.update = function () {

    // if (this.animation.breakit2) {
    //     throw "error";
    // }

    if (this.currentDirectionY + this.y < 0) {
        this.currentDirectionY = 0;
        this.currentDirectionX = 2;
//        this.Animation.startX = 

        this.rotateDemon(Math.PI / 2);
        this.animation.breakit = true;
    } else if (this.currentDirectionY + this.y + this.animation.frameHeight > 800) {
        this.rotateDemon(Math.PI / -2);
        this.currentDirectionY = 0;
        this.currentDirectionX = -2;
    } else if (this.currentDirectionX + this.x < 0) {
        this.animation.spriteSheet = ASSET_MANAGER.getAsset("./img/demon-walking.png");
        this.currentDirectionY = -2;
        this.currentDirectionX = 0;
    } else if (this.currentDirectionX + this.x + this.animation.frameWidth > 800) {
        this.animation.spriteSheet = ASSET_MANAGER.getAsset("./img/demon-walking.png");
        this.currentDirectionY = 2;
        this.currentDirectionX = 0;
    }

    Entity.prototype.update.call(this);
}

Demon.prototype.draw = function (ctx) {
    this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    this.y += this.currentDirectionY;
    this.x += this.currentDirectionX;

    Entity.prototype.draw.call(this);
}

var ASSET_MANAGER = new AssetManager();

//ASSET_MANAGER.queueDownload("./img/RobotUnicorn.png");
ASSET_MANAGER.queueDownload("./img/demon-walking.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var bg = new Background(gameEngine);
//    var unicorn = new Unicorn(gameEngine);
    var demon = new Demon(gameEngine);

    gameEngine.addEntity(bg);
//    gameEngine.addEntity(unicorn);
    gameEngine.addEntity(demon);
 
    gameEngine.init(ctx);
    gameEngine.start();
});
