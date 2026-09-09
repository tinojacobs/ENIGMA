// ==============================================
// ✅ ENIGMA — 3D Background & Global Animations
// ==============================================

(function () {
  'use strict';

  // --- Check if Three.js is loaded ---
  if (typeof THREE === 'undefined') {
    console.warn('⚠️ Three.js not loaded — skipping 3D effects');
    return;
  }

  // --- Canvas Setup ---
  const canvas = document.getElementById('canvas3d');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- Scene & Camera ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 50;

  // --- Lights ---
  const ambient = new THREE.AmbientLight(0x6366f1, 0.5);
  scene.add(ambient);

  const pointLight = new THREE.PointLight(0xa855f7, 2, 100);
  pointLight.position.set(0, 0, 30);
  scene.add(pointLight);

  // --- Floating Particles ---
  const particles = [];
  const geometry = new THREE.SphereGeometry(0.15, 8, 8);
  const material = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    transparent: true,
    opacity: 0.7
  });

  for (let i = 0; i < 150; i++) {
    const particle = new THREE.Mesh(geometry, material.clone());
    particle.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      Math.random() * -50
    );
    particle.userData.speed = 0.02 + Math.random() * 0.05;
    particle.material.opacity = 0.3 + Math.random() * 0.5;
    scene.add(particle);
    particles.push(particle);
  }

  // --- Animation Loop ---
  function animate() {
    requestAnimationFrame(animate);

    particles.forEach(p => {
      p.position.z += p.userData.speed;
      if (p.position.z > 10) p.position.z = -50;
    });

    camera.rotation.z += 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  // --- Resize Handler ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  console.log('✨ ENIGMA 3D — Live & Glowing!');
})();
