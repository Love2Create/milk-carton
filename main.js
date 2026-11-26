import * as ENGINE from './engine';
import TestScene from "./custom/TestScene";
import gsap from 'gsap';

const appElement = document.querySelector('#app');
const testScene = new TestScene(appElement);

let dragging = false;
let offset = 0;
let value = testScene.testCon.rotation;
let didDrag = false;
let element = document.querySelector("#overlay");

function down(e){
    didDrag = true;
    dragging = true;
    element.style.pointerEvents = "none";
    const {x, y} = ENGINE.processPointerEvent(e);
    offset = x - value;
    document.querySelector("#pointerImage").style.display = 'none';
};

function move(e){
    if (!dragging) {
        return;
    }
    const { x, y } = ENGINE.processPointerEvent(e);
    value = x - offset;
    testScene.testCon.rotation = value;
}

function up () {
    element.style.pointerEvents = "all";
    dragging = false;
}

appElement.querySelector('canvas').addEventListener("mousedown", down);
appElement.querySelector('canvas').addEventListener("mousemove", move);
appElement.querySelector('canvas').addEventListener("mouseup", up);
appElement.querySelector('canvas').addEventListener("touchstart", down);
appElement.querySelector('canvas').addEventListener("touchmove", move);
appElement.querySelector('canvas').addEventListener("touchend", up);

document.querySelector("#pointerImage").innerHTML = `<img src="${ENGINE.resorcesRoot}Hand_03.svg" />`;
document.querySelector("#pointerImage").style.transform = `translateX(-${testScene.testCon.rotation}px)`;

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

function movePointerImage(){
    const pos = {x: testScene.testCon.rotation};
    const part1 = testScene.testCon.rotation - 50;
    const part2 = testScene.testCon.rotation;
    gsap.to(pos, { 
        duration: .5, 
        x: part1, 
        onUpdate: () => { 
            if (didDrag) {
                return;
            }
            document.querySelector("#pointerImage").style.marginLeft = `${pos.x}px`;
            testScene.testCon.rotation = pos.x;
        },
        onComplete: () => {
            gsap.to(pos, { 
                duration: .5,
                x: part2, 
                onUpdate: () => {
                    if (didDrag) {
                        return;
                    }
                    document.querySelector("#pointerImage").style.marginLeft = `${pos.x}px`;
                    testScene.testCon.rotation = pos.x;
                },
                // onComplete: () => {
                //     if (!didDrag) {
                //         setTimeout(movePointerImage, 2000);
                //     }
                // },
            })
        }
    })
}

// movePointerImage();


const observer = new IntersectionObserver(
    (entries, obs) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                movePointerImage();
                // obs.unobserve(entry.target); // Stop watching once triggered
            }
        }
    },
    {
        root: null, // null = viewport
        rootMargin: '0px 0px 100px 0px', // Trigger 100px before entering
        threshold: 0.25, // Trigger at 25% visibility
    }
);


observer.observe(document.querySelector("#pointerImage img"));


