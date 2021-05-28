import * as THREE from './lib/build/three.module.js';
import { GLTFLoader } from './lib/examples/jsm/loaders/GLTFLoader.js';

export default class Car extends THREE.Object3D {
	constructor() {
		super();

		// Bind scope
		this.update = this.update.bind(this);
		this.moove = this.moove.bind(this);

		// Init
		const greyMaterial = new THREE.MeshStandardMaterial({color: 0x5555ff, side: THREE.DoubleSide});

		// Load 3D Object as model
		this.loader = new GLTFLoader();
		this.loader.load('./assets/spaceship.glb', (object) => {
			this.sceneObject = object.scene
			this.sceneObject.children.map(item => {
				console.log(item.type)

				if (item.isMesh) {
					item.material = greyMaterial;
					item.position.set(-1.5, 0.2, 0);
					item.scale.set(0.001, 0.001, 0.001);
					item.rotation.y += THREE.Math.degToRad(90);
					
					// shadow
					item.castShadow = true;
					item.receiveShadow = true;
					
					// rendering
					this.add(item);
				}
			});
		});

		console.log(this.loader)
	}

	update() {
	
	}

	moove() {
		// document.onkeydown = applyKey;
	}
}