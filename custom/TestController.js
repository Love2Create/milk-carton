import * as ENGINE from '../engine';
import * as THREE from 'three';
import jstrig from 'jstrig';

export default class TestController extends ENGINE.BaseController{
    constructor(data){
        super(data);
    }

    init () {
        this.markers = [];
        const mat = ENGINE.basicColorMaterial('cc0000');
        // const box = this.environment.createBox({ type: ENGINE.ShapeTypes.BOX, position: {x: 0, y: 0, z: -5}, size: { x: 2, y: 2, z: 2 }, material: mat });

        this.model = new ENGINE.CustomMeshController({ environment: this.environment }, `${ENGINE.resorcesRoot}MilkCarton.glb`);

        this.rotation = 250;

    }

    update (){
        // console.log("modle", this.model);

        // this.rotation += 1;
        if (!this.model.model) {
            return;
        }
        this.model.model.rotation.y = ENGINE.degreesToRadians(this.rotation);

        this.model.model.scale.x = 1.7;
        this.model.model.scale.y = this.model.model.scale.x;
        this.model.model.scale.z = this.model.model.scale.x;

        this.model.model.position.y = -3;

        this.markers.forEach(item => {
            const { x, y } = ENGINE.getCanvasPosition(item.mesh, this.environment);
            const worldPosition = new THREE.Vector3();
            item.mesh.getWorldPosition(worldPosition);
            const angle = jstrig.angle({ x: worldPosition.x, y: worldPosition.z }, { x: 0, y: 0 });
            const elCLasses = [...item.el.classList];
            if (Math.abs(angle) < 45) {
                item.el.classList.add('show-content');
                item.el.classList.add('pulse');
                if (elCLasses.includes('hide-content')) {
                    item.el.classList.remove('hide-content');
                }
            }
            else {
                item.el.classList.add('hide-content');
                if (elCLasses.includes('show-content')) {
                    item.el.classList.remove('show-content');
                    item.el.classList.remove('pulse');
                }
            }
            item.el.setAttribute('style', `left: ${x}px; top: ${y}px;`);
            // console.log(item.id, jstrig.angle({ x: worldPosition.x, y: worldPosition.z }, { x: 0, y: 0 }))
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
        const scaleOfMarker = 0;
        marker.mesh.scale.x = scaleOfMarker;
        marker.mesh.scale.y = scaleOfMarker;
        marker.mesh.scale.z = scaleOfMarker;

        const el = document.createElement('div');
        el.setAttribute('class', 'marker');
        el.setAttribute('id', id);

        const btn = document.createElement('button');
        btn.innerHTML = '+';
        el.append(btn);
        btn.addEventListener('click', (e) => {
            // console.log([...e.target.classList]);
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