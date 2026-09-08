// 🔹 FIRST — Get your canvas & renderer from the HTML
const canvas = document.getElementById('canvas3d');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 🔹 SECOND — Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// ==============================================
// ✅ ENIGMA 3D SCENE — GLOWING ORB + SLIDESHOW + BLOOM
// Fully Fixed & Error-Free! ✨
// ==============================================

// --- Post-processing ---
const composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));

const bloomPass = new THREE.UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.7,   // strength
  1.2,   // radius
  0.15   // threshold
);
composer.addPass(bloomPass);

const fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
fxaaPass.material.uniforms['resolution'].value.set(
  1 / window.innerWidth,
  1 / window.innerHeight
);
composer.addPass(fxaaPass);

// --- Background Plane ---
const bgGeo = new THREE.PlaneGeometry(200, 200);
const bgMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0x020205),
  side: THREE.BackSide,
  transparent: true,
  opacity: 1
});
const bgPlane = new THREE.Mesh(bgGeo, bgMat);
bgPlane.position.z = -30;
scene.add(bgPlane);

// --- Enigma Mesh (Logo Orb) ---
const enGeo = new THREE.IcosahedronGeometry(8, 2);
const enMat = new THREE.MeshBasicMaterial({
  color: 0x7928CA,
  wireframe: true,
  transparent: true,
  opacity: 0.6
});
const enMesh = new THREE.Mesh(enGeo, enMat);
scene.add(enMesh);

// Inner Glow Sphere
const glowGeo = new THREE.SphereGeometry(5, 32, 32);
const glowMat = new THREE.MeshBasicMaterial({
  color: 0x00F0FF,
  transparent: true,
  opacity: 0.15
});
const glowSphere = new THREE.Mesh(glowGeo, glowMat);
scene.add(glowSphere);

// Streak Mesh (energy field around orb)
const streakGeo = new THREE.SphereGeometry(10, 64, 64);
const streakMat = new THREE.MeshBasicMaterial({
  color: 0x7928CA,
  transparent: true,
  opacity: 0.08,
  wireframe: true,
  side: THREE.DoubleSide
});
const streakMesh = new THREE.Mesh(streakGeo, streakMat);
scene.add(streakMesh);

// Expanding Rings
function createRing(radius, color, opacity) {
  const ringGeo = new THREE.RingGeometry(radius - 0.2, radius, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color, transparent: true, opacity,
    side: THREE.DoubleSide, blending: THREE.AdditiveBlending
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);
  return ring;
}
const ring1 = createRing(12, 0x7928CA, 0.3);
const ring2 = createRing(18, 0x00F0FF, 0.2);
const ring3 = createRing(24, 0xFF00E5, 0.15);

// Twinkling Stars / Particles
const starCount = 1500;
const starGeo = new THREE.BufferGeometry();
const positions = new Float32Array(starCount * 3);
const colors = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 250;
  positions[i+1] = (Math.random() - 0.5) * 250;
  positions[i+2] = (Math.random() - 0.5) * 250;
  const c = Math.random() * 0.5 + 0.5;
  colors[i] = c; colors[i+1] = c * 0.9; colors[i+2] = c;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const starMat = new THREE.PointsMaterial({
  size: 0.15, vertexColors: true, transparent: true, opacity: 0.6
});
const particles = new THREE.Points(starGeo, starMat);
scene.add(particles);

// --- Slideshow ---
const slides = [
  { color: [0.01, 0.01, 0.03], streakSpeed: 0.4, bloom: 0.7 },
  { color: [0.02, 0.01, 0.04], streakSpeed: 0.7, bloom: 0.8 },
  { color: [0.01, 0.02, 0.03], streakSpeed: 0.5, bloom: 0.7 },
  { color: [0.02, 0.02, 0.03], streakSpeed: 0.6, bloom: 0.75 },
  { color: [0.03, 0.01, 0.04], streakSpeed: 0.8, bloom: 0.85 },
  { color: [0.01, 0.03, 0.02], streakSpeed: 0.5, bloom: 0.7 },
];

let currentStreakSpeed = 0.4;

function playSlide(index) {
  const s = slides[index % slides.length];
  gsap.to(bgPlane.material.color, {
    r: s.color[0], g: s.color[1], b: s.color[2], duration: 1.2
  });
  gsap.to(bloomPass, { strength: s.bloom, duration: 1.2 });
  gsap.to({ val: currentStreakSpeed }, {
    val: s.streakSpeed, duration: 1.2,
    onUpdate: function () { currentStreakSpeed = this.targets()[0].val; }
  });
  setTimeout(() => playSlide(index + 1), 8000);
}
playSlide(0);

// --- Resize ---
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  composer.setSize(w, h);
  fxaaPass.material.uniforms['resolution'].value.set(1 / w, 1 / h);
}
window.addEventListener('resize', resize);
resize();

// --- Animation Loop ---
let last = performance.now();
let ringPhase = 0;

function animate(now) {
  const dt = (now - last) / 1000;
  last = now;

  // Logo orb rotation
  enMesh.rotation.y += dt * 0.15;
  enMesh.rotation.x = Math.sin(now * 0.0005) * 0.02;

  // Sync streak mesh with logo
  streakMesh.rotation.y = enMesh.rotation.y;
  streakMesh.rotation.x = enMesh.rotation.x;

  // Animate streak texture
  if (streakMesh.material.map) {
    if (!streakMesh.material.map.offset) {
      streakMesh.material.map.offset = new THREE.Vector2();
    }
    streakMesh.material.map.offset.x += currentStreakSpeed * dt * 0.04;
  }

  // Rings pulse animation
  ringPhase += 0.005;
  const pulse = Math.sin(ringPhase) * 0.3 + 0.7;
  ring1.material.opacity = 0.3 * pulse;
  ring2.material.opacity = 0.2 * pulse;
  ring3.material.opacity = 0.15 * pulse;
  ring1.scale.set(1 + pulse * 0.05, 1 + pulse * 0.05, 1);
  ring2.scale.set(1 + pulse * 0.08, 1 + pulse * 0.08, 1);
  ring3.scale.set(1 + pulse * 0.12, 1 + pulse * 0.12, 1);

  // Slow particle rotation
  particles.rotation.y += dt * 0.01;

  // GSAP logo glow pulse
  const glowLevel = Math.sin(now * 0.001) * 0.15 + 0.15;
  glowSphere.material.opacity = glowLevel;

  // Render with post-processing
  composer.render();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

console.log('🌍 ENIGMA 3D Scene — Glowing Orb + Slideshow + Bloom Active! ✅');
