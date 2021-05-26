import * as THREE from './lib/build/three.module.js';

export default class Objects extends THREE.Object3D {
	constructor() {
		super();

		// Set all objects
		this.boxGeometry = new THREE.BoxGeometry(.5, .5, .5);
		this.sphereGeometry = new THREE.SphereGeometry(.3, 24, 24);
		this.planeGeometry = new THREE.PlaneGeometry(5, 5);

		// Set all materials
		const redMaterial = new THREE.MeshStandardMaterial( {color: 0xff5555} );
		const greenMaterial = new THREE.MeshStandardMaterial( {color: 0x55ff55} );
		const whiteMaterial = new THREE.MeshStandardMaterial( {color: 0xffffff, side: THREE.DoubleSide} );

		// Set all mesh
		this.boxMesh = new THREE.Mesh(this.boxGeometry, redMaterial);
		this.sphereMesh = new THREE.Mesh(this.sphereGeometry, greenMaterial);
		this.planeMesh = new THREE.Mesh(this.planeGeometry, whiteMaterial);
        
		// Transform Mesh
		this.boxMesh.position.x = 0.5;
        this.sphereMesh.position.x = -0.5;
        this.sphereMesh.position.y = 0.5;
		this.planeMesh.rotation.x = THREE.Math.degToRad(-90);

		// shadow
		this.boxMesh.castShadow = true;
		this.sphereMesh.castShadow = true;
		this.boxMesh.receiveShadow = true;
		this.sphereMesh.receiveShadow = true;
		
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
		this.add(this.boxMesh);
		this.add(this.sphereMesh);
		this.add(this.planeMesh);
		/**
		 * Object3D est le parent
		 * Mesh irrite de Object3D
		 */
	}
}