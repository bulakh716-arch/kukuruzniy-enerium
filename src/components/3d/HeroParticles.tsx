'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { type MotionValue } from 'framer-motion';
import * as THREE from 'three';

/* ── Fibonacci sphere distribution ── */
function fibonacciSphere(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const r = 1.8;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

/* ── Particle sphere component ── */
function ParticleSphere({ scrollProgress, isMobile }: { scrollProgress?: MotionValue<number>; isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = isMobile ? 800 : 1800;

  const { geometry } = useMemo(() => {
    const positions = fibonacciSphere(count);
    const colors = new Float32Array(count * 3);

    const baseColor = new THREE.Color('#B7F46B');
    const dimColor = new THREE.Color('#6DAE2C');

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const color = baseColor.clone().lerp(dimColor, t * 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return { geometry: geo };
  }, [count]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.016,
    sizeAttenuation: true,
    transparent: true,
    opacity: 1,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    // Slow rotation — fully GPU-side, no per-particle CPU work
    pointsRef.current.rotation.y += delta * 0.07;
    pointsRef.current.rotation.x += delta * 0.025;

    // Subtle mouse parallax
    pointsRef.current.rotation.y += pointer.x * 0.002;
    pointsRef.current.rotation.x += pointer.y * 0.0015;

    // Fade out on scroll
    material.opacity = THREE.MathUtils.lerp(1, 0, (scrollProgress?.get() ?? 0) * 1.2);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

/* ── Scene ── */
function Scene({ scrollProgress, isMobile }: { scrollProgress?: MotionValue<number>; isMobile: boolean }) {
  return (
    <>
      <ParticleSphere scrollProgress={scrollProgress} isMobile={isMobile} />
    </>
  );
}

/* ── Exported wrapper ── */
export default function HeroParticles({ scrollProgress }: { scrollProgress?: MotionValue<number> }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="hero-reveal absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        frameloop="always"
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Scene scrollProgress={scrollProgress} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
