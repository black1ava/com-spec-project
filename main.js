class Computer{
  constructor(){
    this._init();
  }

  _init = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 3000);
    this.camera.position.set(0, 2, 4);
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.shadowMap.enabled =  true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas').appendChild(this.renderer.domElement);

    this._createPlane();
    this._gltfLoader();
    this._setUpLight();
    this._animate();
  }

  _createPlane = () => {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshStandardMaterial();
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    this.scene.add(plane);
  }

  _setUpLight = () => {
    const light = new THREE.SpotLight(null, 2);
    light.position.set(5, 5, 5);
    light.castShadow = true;
    this.scene.add(light);
  }

  _gltfLoader = () => {
    const loader = new THREE.GLTFLoader();
    loader.setPath('resource/');
    loader.load('scene.gltf', gltf => {
      this.scene.add(gltf.scene);
      this.laptop = gltf.scene.children[0];
      this.laptop.scale.setScalar(2);
      this.laptop.traverse(l => l.castShadow = true);
      console.log(gltf.animations);
    });
  }

  _animate = () => {
    requestAnimationFrame(this._animate);
    this.laptop.rotation.z += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}

const _ = new Computer();