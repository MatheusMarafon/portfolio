import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Float, Environment, ContactShadows } from '@react-three/drei';

function Model({ url }) {
  const group = useRef();
  // Carrega modelo e animações
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Tenta dar play na primeira animação que encontrar
    if (actions && animations.length > 0) {
        const firstAnim = Object.keys(actions)[0];
        console.log("Animação encontrada:", firstAnim);
        actions[firstAnim]?.reset().fadeIn(0.5).play();
    }
  }, [actions, animations]);

  useFrame((state) => {
    // Se não tiver animação interna, faz ele girar suavemente via código
    if (group.current && animations.length === 0) {
        const t = state.clock.getElapsedTime();
        group.current.rotation.y = Math.sin(t * 0.5) * 0.3; // Olha para os lados
        group.current.position.y = Math.sin(t * 1) * 0.1;   // Flutua
    }
  });

  return (
    <group ref={group} dispose={null}>
      {/* AJUSTE DE ESCALA AQUI:
         Se ainda estiver grande, diminua esse número (ex: 0.2).
         Se ficar pequeno, aumente (ex: 1.5).
         position-y desce ele um pouco para centralizar.
      */}
      <primitive 
        object={scene} 
        scale={0.5} 
        position={[0, -1, 0]} 
        rotation={[0, 0.5, 0]} 
      />
    </group>
  );
}

const Robot3D = () => {
  return (
    <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#3b82f6" />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#bd00ff" />
            
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <Model url="/roboter_cute.glb" />
            </Float>

            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} color="#000000" />
        </Canvas>
    </div>
  );
};

useGLTF.preload('/roboter_cute.glb');

export default Robot3D;