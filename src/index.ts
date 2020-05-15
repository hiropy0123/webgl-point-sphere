import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Geometry,
  DirectionalLight,
  Vector3,
  MathUtils,
  Points,
  PointsMaterial,
  Group
} from 'three';
import gsap from 'gsap';

let width: number;
let height: number;
let scene: Scene;
let camera: PerspectiveCamera;
let geometry: Geometry;
let light: DirectionalLight;
let mouseX: number;
let mouseY: number;
let myTween: gsap.core.Tween;

const renderer = new WebGLRenderer({
  canvas: document.querySelector('#mycanvas') as HTMLCanvasElement,
});


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
geometry = new Geometry();
let distance = Math.min(200, width / 4);

for (let i = 0; i < 1600; i++) {
  let vertex = new Vector3();
  let theta = MathUtils.randFloatSpread(360);
  let phi = MathUtils.randFloatSpread(360);

  vertex.x = distance * Math.sin(theta) * Math.cos(phi);
  vertex.y = distance * Math.sin(theta) * Math.cos(phi);
  vertex.z = distance * Math.cos(theta);

  geometry.vertices.push(vertex);
}

let particles = new Points(geometry, new PointsMaterial({ color: 0xff44ff, size: 2 }))
particles.boundingSphere = 50;

let renderingParent = new Group();
renderingParent.add(particles);

let resizeContainer = new Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);


// ライト
light = new DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);


function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// animation
let animProps = { scale: 1, xRot: 0, yRot: 0 };
// scale
gsap.to(animProps, {
  duration: 10,
  scale: 1.3,
  repeat: -1,
  yoyo: true,
  ease: "sine",
  onUpdate: function() {
    renderingParent.scale.set(animProps.scale, animProps.scale, animProps.scale)
  }
});
// rotation
gsap.to(animProps, {
  duration: 120,
  xRot: Math.PI * 2,
  yRot: Math.PI * 4,
  repeat: -1,
  yoyo: true,
  ease: "none",
  onUpdate: function() {
    renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0)
  }
});


function onMouseMove(event: MouseEvent) {
  if (myTween) {
    myTween.kill();
  }

  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = (event.clientX / window.innerHeight) * 2 + 1;
  myTween = gsap.to(particles.rotation, {
    duration: 0.1,
    x: mouseY * -1,
    y:  mouseX
  });
}


/* Event */ 

window.addEventListener('resize', () => {
  // リサイズで width と height を更新
  width = window.innerWidth;
  height = window.innerHeight;
  camera = new PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 0, 500);
  renderer.setSize(width, height);
});

document.addEventListener( 'mousemove', onMouseMove, false );