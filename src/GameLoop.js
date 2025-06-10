export class GameLoop {
    constructor(update, render) {
        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60;

        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;
    }

    mainLoop = (timeStamp) => {
        if (!this.isRunning) return;

        let deltaTime = timeStamp - this.lastFrameTime;
        this.lastFrameTime = timeStamp;

        this.accumulatedTime += deltaTime;

        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep);
            this.accumulatedTime -= this.timeStep;
        }

        this.render();

        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastFrameTime = performance.now(); // Ensure correct delta on first frame
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }

    stop() {
        if (this.isRunning) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}
