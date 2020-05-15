import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  SphereGeometry,
  TextureLoader,
  MeshStandardMaterial,
  Mesh,
  DirectionalLight,
} from 'three';

let width: number;
let height: number;
let scene: Scene;
let camera: PerspectiveCamera;
let geometry: SphereGeometry;
let loader: TextureLoader;
let mesh: Mesh;
let light: DirectionalLight;

const renderer = new WebGLRenderer({
  canvas: document.querySelector('#mycanvas') as HTMLCanvasElement,
});

function init() {
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンの作成
  scene = new Scene();

  // カメラの作成
  camera = new PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 0, 500);

  // オブジェクトの作成
  geometry = new SphereGeometry(100, 30, 30);
  loader = new TextureLoader();
  const material = new MeshStandardMaterial({
    map: loader.load('images/earthmap1k.jpg'),
  });
  mesh = new Mesh(geometry, material);
  scene.add(mesh);

  // ライト
  light = new DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  animate();

  function animate() {
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
}


/* Event */ 
window.addEventListener('DOMContentLoaded', init);

window.addEventListener('resize', () => {
  // リサイズで width と height を更新
  width = window.innerWidth;
  height = window.innerHeight;
  camera = new PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 0, 500);
  renderer.setSize(width, height);
});
