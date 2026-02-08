import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 1000 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;
      
      const t = (particle.time += speed);
      
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      dummy.scale.set(1, 1, 1);
      dummy.rotation.set(Math.sin(t) / 10, Math.sin(t) / 10, Math.cos(t) / 10);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#7000FF" emissive="#7000FF" emissiveIntensity={0.5} />
      </instancedMesh>
    </>
  );
}

function AnimatedSphere() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2;
    meshRef.current.rotation.y = clock.elapsedTime * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#A64DFF"
        attach="material"
        distort={0.6}
        speed={1.5}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function Scene3D() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#7000FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00F0FF" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} color="#A64DFF" />
        
        <AnimatedSphere />
        <Particles count={500} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
