import { GameLoop } from "./src/GameLoop.js";
import resources from "./src/Resources.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import { Input, DOWN, UP, LEFT, RIGHT } from "./src/Input.js";
import { GridCells, isSpaceFree } from "./src/helpers/GridCells.js";
import { moveTowards } from "./src/helpers/moveTowards.js";
import { walls } from "./src/levels/level1.js";
import { animations } from "./src/Animation.js";
import { FrameIndexPatren } from "./src/FrameIndexPattern.js";
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./src/object/Hero/heroAnimation.js";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
let heroFacing = DOWN


const skySprite = new Sprite({
    resource:resources.images.sky,
    frameSize:new Vector2(320,180)
  })
const groundSprite = new Sprite({
    resource:resources.images.ground,
    frameSize:new Vector2(320,180)
  })
const shadow=new Sprite({
  resource:resources.images.shadow,
  frameSize:new Vector2(32,32)
})

const hero = new Sprite({
  resource:resources.images.hero,
  frameSize:new Vector2(32,32),
  hframe:3,
  vframe:8,
  frame:1,
  position:new Vector2(GridCells(6),GridCells(5)),
  animations: new animations({
    walkDown: new FrameIndexPatren(WALK_DOWN),
    walkUp: new FrameIndexPatren(WALK_UP),
    walkRight: new FrameIndexPatren(WALK_RIGHT),
    walkLeft: new FrameIndexPatren(WALK_LEFT),
    standDown: new FrameIndexPatren(STAND_DOWN),
    standUp: new FrameIndexPatren(STAND_UP),
    standRight: new FrameIndexPatren(STAND_RIGHT),
    standLeft: new FrameIndexPatren(STAND_LEFT),
  })

})

const heroDestinationPos=hero.position.duplicate()
const heroOffset = new Vector2(-8, -21);
const draw = () => {
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + 1 + heroOffset.y;

  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);
  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
};

const input = new Input()

const update=(delta)=>{
  const distance = moveTowards(hero,heroDestinationPos,1)
  const hasArrived = distance <= 1;
  if(hasArrived){
    tryMove()
  }
  hero.step(delta)
  
}
const tryMove=()=>{
  heroFacing=input.direction ?? heroFacing

  if(!input.direction){
    if (heroFacing === LEFT) {hero.animations.play("standLeft")}
    if (heroFacing === UP) {hero.animations.play("standUp")}
    if (heroFacing === DOWN) {hero.animations.play("standDown")}
    if (heroFacing === RIGHT) {hero.animations.play("standRight")}
    return;
  }
  let nextX=heroDestinationPos.x
  let nextY=heroDestinationPos.y
  const gridSize=16
  if(input.direction===DOWN){
    nextY+=gridSize
    hero.animations.play("walkDown")
  }
  if(input.direction===UP){
    nextY-=gridSize
    hero.animations.play("walkUp")

  }
  if(input.direction===RIGHT){
    nextX+=gridSize
    hero.animations.play("walkRight")

  }
  if(input.direction===LEFT){
    nextX-=gridSize
    hero.animations.play("walkLeft")

  }
  if(isSpaceFree(walls,nextX,nextY)){
  heroDestinationPos.x=nextX
  heroDestinationPos.y=nextY
  }
}

const gameLoop = new GameLoop(update,draw)
gameLoop.start()
