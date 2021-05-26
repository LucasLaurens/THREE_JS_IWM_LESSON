import * as THREE from './lib/build/three.module.js';
import { GLTFLoader } from './lib/examples/jsm/loaders/GLTFLoader.js';

export default class Car extends THREE.Object3D {
	constructor() {
		super();

		// Bind scope
		this.update = this.update.bind(this);

		// Init
		const greyMaterial = new THREE.MeshStandardMaterial({color: 0x5555ff, side: THREE.DoubleSide});

		// Load 3D Object as model
		const loader = new GLTFLoader();
		loader.load('./assets/spaceship.glb', (object) => {
			object.scene.children.map(item => {
				console.log(item.type)

				if (item.isMesh) {
					item.material = greyMaterial;
					item.position.set(0, 0.2, 0);
					item.scale.set(0.001, 0.001, 0.001);
					
					// shadow
					item.castShadow = true;
					item.receiveShadow = true;
					
					// rendering
					this.add(item);
				}

			});
		});
	}

	update() {
	}
}