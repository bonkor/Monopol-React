import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Dice() {
  const ref = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    // Вращаем куб
    let frameId: number;
    const animate = () => {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
      frameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Dice3D() {
  return (
    <Canvas camera={{ position: [2, 2, 2] }}>
      <ambientLight />
      <directionalLight position={[3, 3, 3]} />
      <Dice />
      <OrbitControls />
    </Canvas>
  );
}
