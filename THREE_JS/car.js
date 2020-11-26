import * as THREE from './lib/three.module.js';
import { GLTFLoader } from './lib/GLTFLoader.js';

export default class Car extends THREE.Object3D {
	constructor() {
		super();

		// Init
		const greyMaterial = new THREE.MeshBasicMaterial( {color: 0xCCCCCC} );

		// Load 3D Object as model
		const loader = new GLTFLoader();
		loader.load('./assets/ferrari.glb', (object) => {
			object.scene.children.map(item => {
				console.log(item.type)

				if (item.isMesh) {
					item.material = greyMaterial;
				}

				item.position.set(0, 0.2, 0);
				this.add(item);
			});
		});
	}
}