import { FrameIndexPatren } from "./FrameIndexPattern";
import { WALK_DOWN } from "./object/Hero/heroAnimation";

export class animations{
    constructor(patterens){
        this.patterens=patterens
        this.activateKey = Object.keys(this.patterens)[0]
    }
    play(key,startAtTime=0){
        if(this.activateKey===key){
            return;
        }
        this.activateKey=key
        this.patterens[this.activateKey].currentTime =startAtTime
    }

    get frame(){
        return this.patterens[this.activateKey].frame
    }
    step(delta){
        this.patterens[this.activateKey].step(delta)
    }
}    
