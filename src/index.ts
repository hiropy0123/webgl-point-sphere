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

window.addEventListener('DOMContentLoaded', init);

function init() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const renderer = new WebGLRenderer({
    canvas: document.querySelector('#mycanvas') as HTMLCanvasElement,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンの作成
  const scene = new Scene();

  // カメラの作成
  const camera = new PerspectiveCamera(50, width / height, 10, 2000);
  camera.position.set(0, 0, 500);

  // オブジェクトの作成
  const geometry = new SphereGeometry(100, 30, 30);
  const loader = new TextureLoader();
  const texture = loader.load('images/earthmap1k.jpg');
  const material = new MeshStandardMaterial({
    map: texture,
  });
  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  // ライト
  const light = new DirectionalLight(0xffffff, 1);
  light.position.set(1, 1, 1);
  scene.add(light);

  animate();

  function animate() {
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }
}
