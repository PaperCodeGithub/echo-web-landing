import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw } from 'lucide-react';

const SCREENS = [
  { id: 'radar', title: 'Echo Radar', image: '/assets/screen_shots/echo_radar.jpeg' },
  { id: 'whisper', title: 'Whisper Feed', image: '/assets/screen_shots/whisper_feed.jpeg' },
  { id: 'chat', title: 'Chat', image: '/assets/screen_shots/chat_screen.jpeg' },
  { id: 'profile', title: 'Profile', image: '/assets/screen_shots/profile_screen.jpeg' },
  { id: 'login', title: 'Login', image: '/assets/screen_shots/login_screen.jpeg' },
];

export default function CinematicMockup() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const phoneGroupRef = useRef(null);
  const screenMeshRef = useRef(null);
  const texturesRef = useRef({});
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    rendererRef.current = renderer;

    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);
    phoneGroupRef.current = phoneGroup;

    // Lighting — clean, no colored point lights
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const dir = new THREE.DirectionalLight(0xffffff, 1.8);
    dir.position.set(4, 6, 5);
    scene.add(dir);
    const rim = new THREE.DirectionalLight(0xffffff, 0.6);
    rim.position.set(-3, -2, 4);
    scene.add(rim);

    // Load textures
    const loader = new THREE.TextureLoader();
    SCREENS.forEach((s, i) => {
      loader.load(s.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        texturesRef.current[i] = tex;
        if (i === 0 && screenMeshRef.current) {
          screenMeshRef.current.material.map = tex;
          screenMeshRef.current.material.needsUpdate = true;
        }
      });
    });

    // Phone body — rounded rectangle extrude
    const pw = 3.1, ph = 6.4, pd = 0.22, cr = 0.45;
    const shape = new THREE.Shape();
    const x0 = -pw / 2, y0 = -ph / 2;
    shape.moveTo(x0 + cr, y0);
    shape.lineTo(x0 + pw - cr, y0);
    shape.quadraticCurveTo(x0 + pw, y0, x0 + pw, y0 + cr);
    shape.lineTo(x0 + pw, y0 + ph - cr);
    shape.quadraticCurveTo(x0 + pw, y0 + ph, x0 + pw - cr, y0 + ph);
    shape.lineTo(x0 + cr, y0 + ph);
    shape.quadraticCurveTo(x0, y0 + ph, x0, y0 + ph - cr);
    shape.lineTo(x0, y0 + cr);
    shape.quadraticCurveTo(x0, y0, x0 + cr, y0);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: pd, bevelEnabled: true, bevelSegments: 4,
      steps: 1, bevelSize: 0.06, bevelThickness: 0.06
    });
    geo.center();

    const body = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      color: 0x111111, metalness: 0.85, roughness: 0.3,
    }));
    phoneGroup.add(body);

    // Screen
    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.0, 6.3),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    screenMesh.position.z = pd / 2 + 0.08;
    phoneGroup.add(screenMesh);
    screenMeshRef.current = screenMesh;

    // Camera dot
    const dot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.015, 24),
      new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.1 })
    );
    dot.rotation.x = Math.PI / 2;
    dot.position.set(0, 2.9, pd / 2 + 0.09);
    phoneGroup.add(dot);

    // Initial angle
    phoneGroup.rotation.y = -0.25;
    phoneGroup.rotation.x = 0.08;

    // Drag
    const onDown = (e) => {
      isDraggingRef.current = true;
      const p = e.touches ? e.touches[0] : e;
      prevMouseRef.current = { x: p.clientX, y: p.clientY };
    };
    const onMove = (e) => {
      if (!isDraggingRef.current || !phoneGroupRef.current) return;
      const p = e.touches ? e.touches[0] : e;
      const dx = p.clientX - prevMouseRef.current.x;
      const dy = p.clientY - prevMouseRef.current.y;
      phoneGroupRef.current.rotation.y += dx * 0.006;
      phoneGroupRef.current.rotation.x += dy * 0.006;
      // Clamp x rotation
      phoneGroupRef.current.rotation.x = Math.max(-0.5, Math.min(0.5, phoneGroupRef.current.rotation.x));
      prevMouseRef.current = { x: p.clientX, y: p.clientY };
    };
    const onUp = () => { isDraggingRef.current = false; };

    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    // Animate
    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (phoneGroupRef.current) {
        phoneGroupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
        if (!isDraggingRef.current) {
          phoneGroupRef.current.rotation.y += 0.002;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  // Update texture on screen change
  useEffect(() => {
    if (texturesRef.current[activeIndex] && screenMeshRef.current) {
      screenMeshRef.current.material.map = texturesRef.current[activeIndex];
      screenMeshRef.current.material.needsUpdate = true;
    }
  }, [activeIndex]);

  const resetView = () => {
    if (phoneGroupRef.current) {
      phoneGroupRef.current.rotation.set(0.08, -0.25, 0);
    }
  };

  return (
    <section id="showcase" className="py-24 border-t border-[#181818]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <p className="text-[#FF9500] text-sm font-medium mb-3">Interactive Preview</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Explore the app in 3D
          </h2>
          <p className="text-[#999] text-base leading-relaxed">
            Drag to rotate the device. Select a screen below to load it onto the phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 3D Canvas */}
          <div
            ref={containerRef}
            className="lg:col-span-7 relative h-[480px] sm:h-[560px] rounded-2xl bg-[#111] border border-[#222] overflow-hidden"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing block"
              style={{ touchAction: 'none' }}
            />

            {/* Minimal control */}
            <button
              onClick={resetView}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-[#999] hover:text-white transition-colors"
              title="Reset view"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Current screen label */}
            <div className="absolute bottom-4 left-4 text-xs text-[#666]">
              Viewing: <span className="text-white font-medium">{SCREENS[activeIndex].title}</span>
            </div>
          </div>

          {/* Screen selector */}
          <div className="lg:col-span-5 space-y-2">
            <p className="text-xs text-[#666] uppercase tracking-wider font-medium mb-3">App Screens</p>
            {SCREENS.map((screen, i) => (
              <button
                key={screen.id}
                onClick={() => setActiveIndex(i)}
                className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center gap-4 ${
                  activeIndex === i
                    ? 'bg-[#1A1A1A] border border-[#FF9500]/40 text-white'
                    : 'bg-transparent border border-transparent hover:bg-[#141414] text-[#999] hover:text-white'
                }`}
              >
                {/* Thumbnail */}
                <img
                  src={screen.image}
                  alt={screen.title}
                  className="w-10 h-[22px] rounded object-cover object-top flex-shrink-0"
                />
                <span className="text-sm font-medium">{screen.title}</span>
                {activeIndex === i && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF9500]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
