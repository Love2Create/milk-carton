import * as ENGINE from '../engine';
import * as THREE from 'three';

export default class TestController extends ENGINE.BaseController{
    constructor(data){
        super(data);
    }

    init () {
        this.markers = [];
        const mat = ENGINE.basicColorMaterial('cc0000');
        const box = this.environment.createBox({ type: ENGINE.ShapeTypes.BOX, position: {x: 0, y: 0, z: -5}, size: { x: 2, y: 2, z: 2 }, material: mat });

        this.model = new ENGINE.CustomMeshController({ environment: this.environment }, 'https://love2create.github.io/resources/milk-carton.glb');

        this.rotation = -60;

    }

    update (){
        // console.log("modle", this.model);

        // this.rotation += 1;
        if (!this.model.model) {
            return;
        }
        this.model.model.rotation.y = ENGINE.degreesToRadians(this.rotation);

        this.model.model.scale.x = .7;
        this.model.model.scale.y = this.model.model.scale.x;
        this.model.model.scale.z = this.model.model.scale.x;

        this.model.model.position.y = -3;

        this.markers.forEach(item => {
            const { x, y } = ENGINE.getCanvasPosition(item.mesh, this.environment);
            const worldPosition = new THREE.Vector3();
            item.mesh.getWorldPosition(worldPosition)
            const vis = worldPosition.z > 0 ? 'block' : 'none';
            item.el.setAttribute('style', `left: ${x}px; top: ${y}px; display: ${vis};`);
        });
        
    }

    async addMarker ({ x, y, z, overlay, headline, text, id }) {
        while (!this.model.model) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        const mat = ENGINE.basicColorMaterial('cc0000');
        const marker = this.environment.createBox({ type: ENGINE.ShapeTypes.BOX, position: {x: 0, y: 0, z: -5}, size: { x: 2, y: 2, z: 2 }, material: mat });
        this.model.model.add(marker.mesh);
        marker.mesh.position.x = x;
        marker.mesh.position.y = y;
        marker.mesh.position.z = z;
        marker.mesh.scale.x = 0;
        marker.mesh.scale.y = 0;
        marker.mesh.scale.z = 0;

        const el = document.createElement('div');
        el.setAttribute('class', 'marker');
        el.setAttribute('id', id);

        const btn = document.createElement('button');
        btn.innerHTML = '+';
        el.append(btn);
        btn.addEventListener('click', (e) => {
            console.log([...e.target.classList]);
            if ([...e.target.classList].includes('active')) {
                e.target.classList.remove('active');
            }
            else {
                e.target.classList.add('active');
            }
        });

        const content = document.createElement('div');
        content.setAttribute('class', 'marker-conent');
        content.innerHTML = `<h2>${headline}</h2><p>${text}</p>`;

        el.append(content);

        overlay.append(el);


        this.markers.push({ x, y, z, overlay, headline, text, id, mesh: marker.mesh, el });
    }

}