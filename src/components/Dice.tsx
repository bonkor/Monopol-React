// src/components/Dice.tsx

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Dice({ onRoll }: { onRoll: (value: number) => void }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(200, 200);
    mountRef.current?.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    let frame = 0;
    const animate = () => {
      if (frame < 60) {
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        renderer.render(scene, camera);
        frame++;
        requestAnimationFrame(animate);
      } else {
        const result = Math.floor(Math.random() * 6) + 1;
        onRoll(result);
      }
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
}
