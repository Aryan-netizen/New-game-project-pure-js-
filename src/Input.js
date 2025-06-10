export const DOWN = "DOWN"
export const LEFT = "LEFT"
export const RIGHT = "RIGHT"
export const UP = "UP"

export class Input{
    constructor(){
        this.helpDirection=[];

        document.addEventListener("keydown",(e)=>{
            if(e.code === "ArrowUp" || e.code === "KeyW") {
                    this.onArrowPressed(UP)
            }

            if(e.code === "ArrowDown" || e.code === "KeyS") {
                    this.onArrowPressed(DOWN) ;
            }

            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                    this.onArrowPressed(LEFT) ;    
            }

            if(e.code === "ArrowRight" || e.code === "KeyD") {
                    this.onArrowPressed(RIGHT);
            }   
        })

        document.addEventListener("keyup",(e)=>{
            if(e.code === "ArrowUp" || e.code === "KeyW") {
                    this.onArrowReleased(UP)
            }

            if(e.code === "ArrowDown" || e.code === "KeyS") {
                    this.onArrowReleased(DOWN) ;
            }

            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                    this.onArrowReleased(LEFT) ;    
            }

            if(e.code === "ArrowRight" || e.code === "KeyD") {
                    this.onArrowReleased(RIGHT);
            }   
        })
    }
    get direction(){
        return this.helpDirection[0];
    }    
    onArrowPressed(direction){
        if(this.helpDirection.indexOf(direction)===-1){
            this.helpDirection.unshift(direction)
        }
    }
    onArrowReleased(direction){
        const index = this.helpDirection.indexOf(direction)
        if (index === -1) {
            return;
        }
        // Remove this key from the list
        this.helpDirection.splice(index, 1)
    }
}