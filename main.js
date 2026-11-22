import * as ENGINE from './engine';
import TestScene from "./custom/TestScene";
import Overlay from "./engine/classes/Overlay";

const appElement = document.querySelector('#app');
const testScene = new TestScene(appElement);
// const overlay = new Overlay(document.querySelector("#overlay"), (item) => {
//     testScene.setRotation(item.value);
// });

let dragging = false;
let offset = 0;
let value = 0;
let element = document.querySelector("#overlay");

function down(e){
    dragging = true;
    const {x, y} = ENGINE.processPointerEvent(e);
    offset = x;
};

function move(e){
    if (!dragging) {
        return;
    }
    const { x, y } = ENGINE.processPointerEvent(e);
    value = x - offset;
    testScene.testCon.rotation = value;
    // console.log('event', e);
}

function up () {
    dragging = false;
}

appElement.querySelector('canvas').addEventListener("mousedown", down);
appElement.querySelector('canvas').addEventListener("mousemove", move);
appElement.querySelector('canvas').addEventListener("mouseup", up);
appElement.querySelector('canvas').addEventListener("touchstart", down);
appElement.querySelector('canvas').addEventListener("touchmove", move);
appElement.querySelector('canvas').addEventListener("touchend", up);

const markers = [
    {
        x: .5,
        y: 3,
        z: 1.4,
        headline: 'Test 1 header',
        text: 'Test 1 text',
        overlay: element,
    },
    {
        x: -.5,
        y: 5.5,
        z: 1.4,
        headline: 'Test 2 header',
        text: 'Test 2 text',
        overlay: element,
    },
    {
        x: -1.4,
        y: 2.5,
        z: .2,
        headline: 'Test 3 header',
        text: 'Test 3 text',
        overlay: element,
    },
    {
        x: 1.4,
        y: 6.2,
        z: 0,
        headline: 'Test 4 header',
        text: 'Test 4 text',
        overlay: element,
    },
];

markers.map((item, index) => ({ ...item, id: `maker${index}` })).forEach(item => {
    testScene.testCon.addMarker(item);
});





