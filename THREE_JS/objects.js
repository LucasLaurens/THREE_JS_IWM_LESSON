import * as THREE from './lib/build/three.module.js';
import Global from './global.js';

export default class Objects extends THREE.Object3D {
	constructor() {
		super();

		// Bind scope
		this.update = this.update.bind(this);
		this.randomPos = this.randomPos.bind(this);

		// Set all objects
		// this.boxGeometry = new THREE.BoxGeometry(.5, .5, .5);
		// this.sphereGeometry = new THREE.SphereGeometry(.3, 24, 24);
		this.planeGeometry = new THREE.PlaneGeometry(50, 50);

		// Map
		// this.planeMap = new THREE.TextureLoader().load("./assets/sky.jpg");
		// this.planeMap.anisotropy = 12;
		// this.planeMap.wrapS = this.planeMap.wrapT = THREE.RepeatWrapping;
		// this.planeMap.repeat.set(2, 2);
		// this.planeMap.offset.set(2, 2);
		// this.planeMap.rotation = THREE.Math.degToRad(30);

		// Set all materials
		const redMaterial = new THREE.MeshStandardMaterial( {color: 0xff5555} );
		const greenMaterial = new THREE.MeshStandardMaterial( {color: 0x55ff55} );
		const wisteriaMaterial = new THREE.MeshStandardMaterial( {color: 0x8e44ad} );
		const basicMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff} );
		const whiteMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );

		// TEXTURE
		basicMaterial.map = new THREE.TextureLoader().load("./assets/box.jpg");
		// basicMaterial.transparent = true

		
		whiteMaterial.map = this.planeMap;
		// basicMaterial.metalness = .1;
		// basicMaterial.roughness = .3;
		// basicMaterial.envMap = Global._instance.envMap;

		// Set all mesh
		// this.boxMesh = new THREE.Mesh(this.boxGeometry, redMaterial);
		// this.sphereMesh = new THREE.Mesh(this.sphereGeometry, greenMaterial);
		this.planeMesh = new THREE.Mesh(this.planeGeometry, whiteMaterial);

		// Box Mesh Multiple (10)
		this.arrayMesh = []
		for(let i = -3; i <= 3; i++) {
			this.boxGeometry = new THREE.BoxGeometry(.5, 1, .5);
			this.boxMesh = new THREE.Mesh(this.boxGeometry, basicMaterial);

			this.boxMesh.position.x = i * .5;
			this.boxMesh.position.z = i * .5;
			this.boxMesh.position.y = 0.50;

			this.boxMesh.castShadow = true;
			this.boxMesh.receiveShadow = true;

			this.add(this.boxMesh);
			this.arrayMesh.push(this.boxMesh)
		}
        
		// Transform Mesh
		// this.boxMesh.position.x = -0.7;
		// this.boxMesh.position.y = 0.35;
        // this.sphereMesh.position.x = -0.7;
        // this.sphereMesh.position.y = 1.005;
		this.planeMesh.rotation.x = THREE.Math.degToRad(-90);

		// shadow
		// this.boxMesh.castShadow = true;
		// this.sphereMesh.castShadow = true;
		// this.boxMesh.receiveShadow = true;
		// this.sphereMesh.receiveShadow = true;
		
		this.planeMesh.receiveShadow = true;
		
		/**
		 * Params :
		 * - THREE.Math.degToRad(45);
		 * - visible
		 * - material (THREE.Color : Hex || Object)
		 * - scale
		 * - mon_mesh.clone()
		 */

		// Container
		// this.add(this.boxMesh);
		// this.add(this.sphereMesh);
		this.add(this.planeMesh);
		/**
		 * Object3D est le parent
		 * Mesh irrite de Object3D
		 */
	}

	update() {
		// this.arrayMesh.map(item => {
		// 	item.rotation.x += THREE.Math.degToRad(this.randomPos(2));
		// })
		// this.boxMesh.rotation.x += THREE.Math.degToRad(1);

		// this.planeMap.offset.x += 0.01;
	}

	randomPos(max) {
		return Math.floor(Math.random() * max);
	}
}