import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Download, ArrowRight } from 'lucide-react';

const SHOTS = [
  {
    id: 'shot-01',
    headline: 'Discover who is nearby.',
    subhead: 'Real-time physical proximity from 300 meters to 10 kilometers. Instead of endless global feeds, your radar reveals active clusters walking the same streets as you.',
    image: '/assets/screen_shots/echo_radar.jpeg',
    phonePos: [0, 0, 0],
    phoneRot: [0.03, -0.06, 0.02],
    // Starts far left, slightly forward
    camStart: [-5.0, 2.5, 1.0], 
    // Perfectly framed final resting distance
    camEnd: [0, 0, 6.2], 
  },
  {
    id: 'shot-02',
    headline: 'Whisper to your neighborhood.',
    subhead: 'Drop short videos, audio confessions, and campus updates. Everything posted in Whisper is restricted to users within a strict 5-kilometer perimeter.',
    image: '/assets/screen_shots/whisper_feed.jpeg',
    phonePos: [0, 0, 0],
    phoneRot: [-0.02, 0.04, -0.01],
    // Starts bottom right
    camStart: [4.5, -2.5, 1.0],
    camEnd: [0, 0, 6.2],
  },
  {
    id: 'shot-03',
    headline: 'Connect in the moment.',
    subhead: 'Encrypted direct messaging with people walking the same streets. Reply to a Whisper or send a proximity ping to start a natural, local conversation.',
    image: '/assets/screen_shots/chat_screen.jpeg',
    phonePos: [0, 0, 0],
    phoneRot: [0.04, -0.03, 0.03],
    // Starts high top
    camStart: [0.0, 5.5, 1.0],
    camEnd: [0, 0, 6.2],
  },
  {
    id: 'shot-04',
    headline: 'Your local identity, verified.',
    subhead: 'Connect your Instagram, hobbies, and skills to people in your vicinity. Run an instant sonar scan for the exact profession or passion you need right now.',
    image: '/assets/screen_shots/profile_screen.jpeg',
    phonePos: [0, 0, 0],
    phoneRot: [-0.04, 0.02, -0.02],
    // Starts extreme left edge
    camStart: [-5.5, -1.0, 1.0],
    camEnd: [0, 0, 6.2],
  }
];

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export default function CinematicHero() {
  const [activeShotIdx, setActiveShotIdx] = useState(0);
  
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);

  const currentShot = SHOTS[activeShotIdx];

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060608);

    const aspect = width / height;
    const fov = aspect < 1 ? 45 : 36; 
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // --- Cinematic Studio Lighting ---
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 0.7);
    scene.add(ambientLight);

    const warmKeyLight = new THREE.DirectionalLight(0xfff5eb, 3.0);
    warmKeyLight.position.set(5, 5, 4);
    scene.add(warmKeyLight);

    const coolRimLight = new THREE.DirectionalLight(0x4F46E5, 2.5);
    coolRimLight.position.set(-5, -2, 3);
    scene.add(coolRimLight);

    const backLight = new THREE.DirectionalLight(0xff9e1b, 2.0);
    backLight.position.set(3, 4, -5);
    scene.add(backLight);

    // --- 3D Phone Mesh Construction ---
    const phoneGroup = new THREE.Group();
    // OPTIMIZED SCALE: 92% size creates the perfect balance of impact and padding
    phoneGroup.scale.set(0.92, 0.92, 0.92);
    scene.add(phoneGroup);

    const pw = 1.95;
    const ph = 4.15;
    const pd = 0.16;
    const cr = 0.32;

    const shape = new THREE.Shape();
    const x0 = -pw / 2;
    const y0 = -ph / 2;

    shape.moveTo(x0 + cr, y0);
    shape.lineTo(x0 + pw - cr, y0);
    shape.quadraticCurveTo(x0 + pw, y0, x0 + pw, y0 + cr);
    shape.lineTo(x0 + pw, y0 + ph - cr);
    shape.quadraticCurveTo(x0 + pw, y0 + ph, x0 + pw - cr, y0 + ph);
    shape.lineTo(x0 + cr, y0 + ph);
    shape.quadraticCurveTo(x0, y0 + ph, x0, y0 + ph - cr);
    shape.lineTo(x0, y0 + cr);
    shape.quadraticCurveTo(x0, y0, x0 + cr, y0);

    const extrudeSettings = {
      depth: pd,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04
    };

    const phoneGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    phoneGeo.center();

    // Premium Dark Titanium Material
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x16161c,
      metalness: 0.85,
      roughness: 0.25,
    });
    const phoneMesh = new THREE.Mesh(phoneGeo, chassisMat);
    phoneGroup.add(phoneMesh);

    // Screen Mesh
    const screenGeo = new THREE.PlaneGeometry(1.90, 4.08);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0xffffff }); 
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = pd / 2 + 0.05;
    phoneGroup.add(screenMesh);

    // Texture Loading
    const textures = [];
    const textureLoader = new THREE.TextureLoader();
    
    SHOTS.forEach((shot, i) => {
      textureLoader.load(shot.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.anisotropy = maxAnisotropy;
        textures[i] = tex;
        
        if (i === 0) {
          screenMesh.material.map = tex;
          screenMesh.material.needsUpdate = true;
        }
      });
    });

    // Front Camera Punch-hole
    const cameraDot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.02, 24),
      new THREE.MeshBasicMaterial({ color: 0x020204 })
    );
    cameraDot.rotation.x = Math.PI / 2;
    cameraDot.position.set(0, 1.86, pd / 2 + 0.06);
    phoneGroup.add(cameraDot);

    // Hardware Buttons
    const btnMat = new THREE.MeshStandardMaterial({ color: 0x242430, metalness: 0.9, roughness: 0.2 });
    const powerBtn = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.5, 0.06), btnMat);
    powerBtn.position.set(pw / 2 + 0.03, 0.6, 0);
    phoneGroup.add(powerBtn);

    const volUpBtn = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.4, 0.06), btnMat);
    volUpBtn.position.set(-pw / 2 - 0.03, 0.7, 0);
    phoneGroup.add(volUpBtn);

    const volDownBtn = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.4, 0.06), btnMat);
    volDownBtn.position.set(-pw / 2 - 0.03, 0.2, 0);
    phoneGroup.add(volDownBtn);

    // --- Animation Engine ---
    let animId;
    let currentShotNumber = 0;
    let shotTime = 0;
    const SHOT_DURATION = 7.0; 

    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      shotTime += delta;

      // Handle Scene Cut
      if (shotTime >= SHOT_DURATION) {
        shotTime = 0;
        currentShotNumber = (currentShotNumber + 1) % SHOTS.length;
        const newShot = SHOTS[currentShotNumber];

        phoneGroup.position.set(...newShot.phonePos);
        phoneGroup.rotation.set(...newShot.phoneRot);

        if (textures[currentShotNumber]) {
          screenMesh.material.map = textures[currentShotNumber];
          screenMesh.material.needsUpdate = true;
        }
        
        setActiveShotIdx(currentShotNumber);
      }

      const activeShotConfig = SHOTS[currentShotNumber];
      const normalizedTime = Math.min(1, shotTime / SHOT_DURATION);
      const easeProgress = easeOutQuart(normalizedTime);

      // CRITICAL FIX: The Orbital Arc Bump
      // This forces the camera to swing WIDE around the phone rather than flying in a straight 
      // line through the origin. This ensures the phone never gets "huge" in the middle.
      const arcBump = Math.sin(easeProgress * Math.PI) * 2.0;

      const startPos = activeShotConfig.camStart;
      const endPos = activeShotConfig.camEnd;
      
      camera.position.x = startPos[0] + (endPos[0] - startPos[0]) * easeProgress;
      camera.position.y = startPos[1] + (endPos[1] - startPos[1]) * easeProgress;
      camera.position.z = startPos[2] + (endPos[2] - startPos[2]) * easeProgress + arcBump;

      camera.lookAt(new THREE.Vector3(0, 0, 0)); 

      // Micro floating drift (organic feel)
      const microFloat = Math.sin(shotTime * 0.5) * 0.015;
      phoneGroup.position.y = activeShotConfig.phonePos[1] + microFloat;

      // DOM manipulation for Text Fades
      if (textContainerRef.current) {
        if (shotTime < 0.6) {
          const inAlpha = shotTime / 0.6;
          textContainerRef.current.style.opacity = inAlpha;
          textContainerRef.current.style.transform = `translateY(${20 * (1 - inAlpha)}px)`;
        } else if (shotTime > SHOT_DURATION - 0.4) {
          const outAlpha = (SHOT_DURATION - shotTime) / 0.4;
          textContainerRef.current.style.opacity = Math.max(0, outAlpha);
          textContainerRef.current.style.transform = `translateY(${-10 * (1 - outAlpha)}px)`;
        } else {
          textContainerRef.current.style.opacity = 1;
          textContainerRef.current.style.transform = `translateY(0px)`;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.fov = camera.aspect < 1 ? 45 : 36; 
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[700px] bg-[#060608] flex flex-col lg:flex-row pt-24 lg:pt-0 overflow-hidden border-b border-[#181818]">
      
      {/* Left Panel: 3D Canvas Mockup */}
      <div 
        ref={containerRef} 
        className="w-full lg:w-1/2 h-[45vh] lg:h-full relative flex items-center justify-center pointer-events-none"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block outline-none"
        />
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(6,6,8,0.9)] z-10" />
      </div>

      {/* Right Panel: Typography & Actions */}
      <div className="w-full lg:w-1/2 h-[55vh] lg:h-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 z-20 bg-gradient-to-t from-[#060608] to-transparent lg:bg-none">
        
        <div ref={textContainerRef} className="max-w-xl will-change-transform opacity-0">
          
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF9500] text-[10px] font-mono uppercase tracking-widest">
            {currentShot.id.replace('-', ' ')}
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6 drop-shadow-lg">
            {currentShot.headline}
          </h2>
          
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-10 max-w-md">
            {currentShot.subhead}
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.papercode.echo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF9500] text-black font-bold text-sm hover:bg-[#E68600] transition-colors shadow-[0_0_30px_-5px_rgba(255,149,0,0.4)]"
            >
              <Download className="w-4 h-4" />
              <span>Download on Android</span>
            </a>

            <a
              href="#split-showcase"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#121217] hover:bg-[#1A1A22] text-white font-medium text-sm transition-colors border border-white/10"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}