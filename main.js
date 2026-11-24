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

const scaleFactor = .38;

const markers = [
    {
        x: .5 * scaleFactor,
        y: 2 * scaleFactor,
        z: 1.4 * scaleFactor,
        headline: 'Test 1 header',
        text: 'Test 1 text',
        overlay: element,
    },
    {
        x: 0.8 * scaleFactor,
        y: 4.5 * scaleFactor,
        z: 1.4 * scaleFactor,
        headline: 'Test 2 header',
        text: 'Test 2 text',
        overlay: element,
    },
    {
        x: -1.4 * scaleFactor,
        y: 2.5 * scaleFactor,
        z: .4 * scaleFactor,
        headline: 'Test 3 header',
        text: 'Test 3 text',
        overlay: element,
    },
    {
        x: 1.7 * scaleFactor,
        y: 6 * scaleFactor,
        z: .25 * scaleFactor,
        headline: 'Test 4 header',
        text: 'Test 4 text',
        overlay: element,
    },
];

markers.map((item, index) => ({ ...item, id: `maker${index}` })).forEach(item => {
    testScene.testCon.addMarker(item);
});



