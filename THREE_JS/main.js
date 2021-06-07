import * as THREE from './lib/build/three.module.js';
import { OrbitControls } from './lib/examples/jsm/controls/OrbitControls.js';
// import Stats from './lib/stats.module.js';

// Import some class
import Global from './global.js';
import Objects from './objects.js';
// import Car from './car.js';
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
		this.renderer = new THREE.WebGLRenderer({ antialias: true});
		// Shadow settings
		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize((window.innerWidth) / 1.25, (window.innerHeight) / 1.25);


		// Background
		// this.scene.background = new THREE.Color(0x6ee7ff);
		this.scene.fog = new THREE.FogExp2(0x000000, 0.1);
		this.bgTexture = new THREE.TextureLoader().load("./assets/sky_equi.jpg", () => {
			this.bgEquiMap = new THREE.WebGLCubeRenderTarget(1024).fromEquirectangularTexture(this.renderer, this.bgTexture);
			Global.instance.envMap = this.bgEquiMap;
			this.scene.background = this.bgEquiMap;

			this.initObjects();
		});


		// Cube
		// const geometry = new THREE.BoxGeometry();
		// const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
		// this.cube = new THREE.Mesh( geometry, material );
		// this.scene.add( this.cube );
		// Transform
		this.camera.position.y = 1;
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
		this.update();
	}

	initObjects() {
		// init light
		this.dlight = new THREE.DirectionalLight();
		this.dlight.position.x = 5;
		this.dlight.position.y = 5;
		this.dlight.position.z = 5;

		// ambiant light
		this.alight = new THREE.AmbientLight();
		this.alight.intensity = 0.5;

		// shadow
		this.dlight.castShadow = true;
		this.dlight.shadow.mapSize.width = 2048;
		this.dlight.shadow.mapSize.height = 2048;
		this.dlight.shadow.radius = 3;
		this.dlight.shadow.bias = -0.0001;

		// Light helper
		this.helper = new THREE.DirectionalLightHelper(this.dlight, 1);

		// init elements
		this.objects = new Objects();
		// this.car = new Car();

		this.scene.add(this.helper);
		this.scene.add(this.dlight);
		this.scene.add(this.alight);
		this.scene.add(this.objects);
		// this.scene.add(this.car);
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

		// update
		this.objects && this.objects.update();
		// this.car && this.car.update();

		// if(this.dlight) {
		// 	this.dlight.position.x
		// 	if(-2 < this.dlight.position.x) {
		// 		this.dlight.position.x += -0.01;
		// 	} else {
		// 		this.dlight.position.x = -2;
		// 	}
		// }

		// this.helper && this.helper.update();

		// this.cube.rotation.x += .01;
		// this.cube.rotation.y += .01;
		// this.cube.rotation.z += .01;

		// Render scene
		this.renderer.render(this.scene, this.camera);
		// this.stats.update();
	}
}

new Main();