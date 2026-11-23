import * as ENGINE from '../engine';

import TestController from './TestController';


export default class TestScene extends ENGINE.BaseScene{
    constructor(el){
        super(el);
    }
    initialize(){
        // this.environment.cameraContainer.position.y = 4;
        const lightCon = new ENGINE.LightController({ environment: this.environment });
        const light1 = lightCon.addLight({ type: ENGINE.LightTypes.DIRECTIONAL, intensity: 1.5, target: { x: 4, y: 12, z: -12 } });
        // console.log(light1);
        this.testCon = new TestController({ environment: this.environment });
        const ground = new ENGINE.GroundController({ environment: this.environment }, ENGINE.basicColorMaterial('00cc00'));
        this.environment.cameraContainer.position.z = 6;
    }
    canResize(){
        return true;
    }
    setRotation(value){
        this.testCon.rotation = value;
    }
}