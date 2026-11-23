import * as ENGINE from '../engine';

import TestController from './TestController';


export default class TestScene extends ENGINE.BaseScene{
    constructor(el){
        super(el);
    }
    initialize(){
        // this.environment.cameraContainer.position.y = 4;
        const redLight = "0xff0000"
        const lightCon = new ENGINE.LightController({ environment: this.environment });
        const keyLight = lightCon.addLight({ type: ENGINE.LightTypes.DIRECTIONAL, intensity: 0.5, target: { x: -15, y: -15, z: 5 } });
        const fillLight = lightCon.addLight({ type: ENGINE.LightTypes.DIRECTIONAL, intensity: 0.45, target: { x: 90, y: 2, z: -10 } });
        const rimLight = lightCon.addLight({ type: ENGINE.LightTypes.DIRECTIONAL, intensity: 0.35, target: { x: 0, y: 0, z: -10 } });
        const rimLight2 = lightCon.addLight({ type: ENGINE.LightTypes.DIRECTIONAL, intensity: 0.5, target: { x: -5, y: -5, z: -5 } });
        const rimLight3 = lightCon.addLight({ type: ENGINE.LightTypes.DIRECTIONAL, intensity: 0.5, target: { x: 3, y: 5, z: -20 } });


        // console.log(light1);
        this.testCon = new TestController({ environment: this.environment });
        // const ground = new ENGINE.GroundController({ environment: this.environment }, ENGINE.basicColorMaterial('00cc00'));
        this.environment.cameraContainer.position.z = 20;
        this.environment.cameraContainer.position.y = 5.75;
        this.environment.cameraContainer.rotation.x = ENGINE.degreesToRadians(-14);
    }
    canResize(){
        return true;
    }
    setRotation(value){
        this.testCon.rotation = value;
    }
}