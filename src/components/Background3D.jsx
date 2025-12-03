import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function ParticleField() {
  const ref = useRef();
  
  // Gerar posições aleatórias manualmente para não depender de libs externas complexas
  const count = 2000;
  const positions = new Float32Array(count * 3);
  for(let i=0; i<count*3; i++) {
    positions[i] = (Math.random() - 0.5) * 3; // Spread in 3D space
  }

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 20;
        ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4f46e5"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />
    </div>
  );
};

export default Background3D;