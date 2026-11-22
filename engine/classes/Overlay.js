import * as ENGINE from "../index";

export default class Overlay {
    constructor (element, handler, con){

        this.element = element;
        this.handler = handler;
        this.offset = 0;
        this.value = 0;
        this.dragging = false;
        element.addEventListener("mousedown", this.down);
        element.addEventListener("mousemove", this.move);
        element.addEventListener("mouseup", this.up);
    }

    down(e){
        this.dragging = true;
        const {x, y} = ENGINE.processPointerEvent(e);
        this.offset = x;
    };

    move(e){
        if (!this.dragging) {
            return;
        }
        const { x, y } = ENGINE.processPointerEvent(e);
        this.value = x;
        console.log('outslide', this.value);
        
        if (this.handler){
            console.log('inside', this.value);
            this.handler(this);
        }
    }

    up(){
        this.dragging = false;
    }
}