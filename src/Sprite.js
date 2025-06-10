import { Vector2 } from "./Vector2"

export class Sprite {
    constructor({
        resource, //image we want to draw
        frameSize, //imege we want to crop
        hframe,
        vframe,
        frame, // which frame we want to show
        scale, //how large the image is drawn
        position, // where to draw
        animations,
    }){
        this.resource = resource
        this.frameSize = frameSize ?? new Vector2(16,16)
        this.hframe = hframe??1
        this.vframe = vframe??1
        this.frame = frame??0
        this.frameMap = new Map()
        this.scale = scale ?? 1
        this.position = position ?? new Vector2(0,0)
        this.buildFrameMap()
        this.animations = animations ?? null
    }

    buildFrameMap(){
        let frameCount=0;
        for(let v=0;v<this.vframe;v++){
            for(let h=0;h<this.hframe;h++){
                this.frameMap.set(
                    frameCount,
                    new Vector2(this.frameSize.x*h,this.frameSize.y*v)
                )
                frameCount++;
            }
        }
    }
    
    step(delta) {
        if (!this.animations) {
            return;
        }
        this.animations.step(delta); // Advance the animation
        this.frame = this.animations.frame; // Update the current frame
    }

    drawImage(ctx,x,y){
        
        if(!this.resource.isLoaded){
            return;
        }
        let frameCoordX=0;
        let frameCoordY=0;
        const frameVector = this.frameMap.get(this.frame);
        if (frameVector) {
            frameCoordX = frameVector.x;
            frameCoordY = frameVector.y;
        }

        const frameSizeX=this.frameSize.x;
        const frameSizeY=this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameCoordX,
            frameCoordY,
            frameSizeX,
            frameSizeY,
            x,
            y,
            frameSizeX*this.scale,
            frameSizeY*this.scale)
    }
}