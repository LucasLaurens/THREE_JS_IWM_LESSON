import * as THREE from './lib/build/three.module.js';
import { OrbitControls } from './lib/examples/jsm/controls/OrbitControls.js';
// import Stats from './lib/stats.module.js';

// Import some class
import Objects from './objects.js';
import Car from './car.js';
export default class Main {
	constructor() {
		// Set
		this.scene;
		this.camera;
		this.renderer;

		// Bind scope
		this.update = this.update.bind(this);
		this.onResize = this.onResize.bind(this);
		// this.initObjects = this.initObjects.bind(this);
		this.init();
	}

	init() {
		// Prepare scene
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
		this.renderer = new THREE.WebGLRenderer({ antialias: true});
		this.renderer.setSize((window.innerWidth) / 1.25, (window.innerHeight) / 1.25);

		// Cube
		// const geometry = new THREE.BoxGeometry();
		// const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
		// this.cube = new THREE.Mesh( geometry, material );
		// this.scene.add( this.cube );
		// Transform
		this.camera.position.z = 2;
		// this.camera.position.y = 1;
		// this.cube.rotation.y = Math.PI / 4;

		// Render scene
		window.addEventListener('resize', this.onResize, false);
		document.getElementById('scene').appendChild(this.renderer.domElement);
		// this.stats = new Stats();
		// document.body.appendChild(this.stats.dom);

		// Control scene
		// this.renderer.render(this.scene, this.camera);
		new OrbitControls(this.camera, this.renderer.domElement);
		this.initObjects();
		this.update();
	}

	initObjects() {
		this.objects = new Objects();
		this.car = new Car();

		this.scene.add(this.objects);
		this.scene.add(this.car);
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