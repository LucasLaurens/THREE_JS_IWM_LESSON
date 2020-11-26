import * as THREE from './lib/three.module.js';
import { OrbitControls } from './lib/OrbitControls.js';
// import Stats from './lib/stats.module.js';

export default class Main {
	constructor() {
		// Set
		this.scene;
		this.camera;
		this.renderer;

		// Bind scope
		this.update = this.update.bind(this);
		this.onResize = this.onResize.bind(this);
		this.initObjects = this.initObjects.bind(this);
		this.init();
	}

	init() {
		// Prepare scene
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
		// {alpha: true}
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize((window.innerWidth / 1.5), (window.innerHeight / 1.5));

		// Cube
		// const geometry = new THREE.BoxGeometry();
		// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		// this.cube = new THREE.Mesh( geometry, material );
		// Transform
		this.camera.position.z = 2;
		// this.cube.rotation.y = Math.PI / 4;

		// Render scene
		window.addEventListener('resize', this.onResize, false);
		// this.scene.add( this.cube );
		document.getElementById('scene').appendChild(this.renderer.domElement);
		// this.stats = new Stats();
		// document.body.appendChild(this.stats.dom);

		// Control scene
		new OrbitControls(this.camera, this.renderer.domElement);
		this.update();
		this.initObjects();
	}

	initObjects() {
		// Set all objects
		this.boxGeometry = new THREE.BoxGeometry(.5, .5, .5);
		this.sphereGeometry = new THREE.SphereGeometry(.3, 12, 12);
		this.planeGeometry = new THREE.PlaneGeometry(3, 3);

		// Set all materials
		const redMaterial = new THREE.MeshBasicMaterial( {color: 0xff5555} );
		const greenMaterial = new THREE.MeshBasicMaterial( {color: 0x55ff55} );
		const whiteMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );

		// Set all mesh
		this.boxMesh = new THREE.Mesh(this.boxGeometry, redMaterial);
		this.sphereMesh = new THREE.Mesh(this.sphereGeometry, greenMaterial);
		this.planeMesh = new THREE.Mesh(this.planeGeometry, whiteMaterial);

		// Transform Mesh
		this.sphereMesh.position.x = -1;
		this.planeMesh.rotation.x = THREE.Math.degToRad(-90);
		this.planeMesh.position.y = -1;
		this.planeMesh.position.z = -1;
		/**
		 * Params :
		 * - THREE.Math.degToRad(45);
		 * - visible
		 * - material (THREE.Color : Hex || Object)
		 * - scale
		 * - mon_mesh.clone()
		 */

		// Scene renderer
		this.scene.add(this.boxMesh);
		this.scene.add(this.sphereMesh);
		this.scene.add(this.planeMesh);
	}

	onResize() {
		const width = window.innerWidth;
		const height = window.innerHeight;

		// Resize the window everytime
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
	}

	update() {
		// Animation
		requestAnimationFrame(this.update);
		// this.cube.rotation.x += .01;
		// this.cube.rotation.y += .01;
		// this.cube.rotation.z += .01;

		// Render scene
		this.renderer.render(this.scene, this.camera);
		// this.stats.update();
	}
}

new Main();