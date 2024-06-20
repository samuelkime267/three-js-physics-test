/* eslint-disable */

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, BallCollider } from "@react-three/rapier";

const Experience = () => {
  const pointerObj = useRef();
  const vec = new THREE.Vector3();
  const boxCount = 20;

  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < boxCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
    }
    return positions;
  });
  useFrame(({ mouse, viewport }) => {
    pointerObj.current?.setNextKinematicTranslation(
      vec.set(
        (mouse.x * viewport.width) / 2,
        (mouse.y * viewport.height) / 2,
        0
      )
    );
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <RigidBody ref={pointerObj} colliders={false} type="kinematicPosition">
        <BallCollider args={[0.4]} />
      </RigidBody>

      {positions.map((position, index) => (
        <Box position={position} key={index} />
      ))}
    </>
  );
};

export default Experience;

const Box = ({ position }) => {
  const colors = ["red", "blue", "yellow", "green", "orange", "black"];
  const boxObj = useRef();
  const vec = new THREE.Vector3();
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta);
    boxObj.current?.applyImpulse(
      vec.copy(boxObj.current.translation()).negate().multiplyScalar(0.01)
    );
  });

  const index = Math.trunc(Math.random() * 5);

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={0.1}
      friction={0.1}
      position={position}
      ref={boxObj}
      colliders={"cuboid"}
    >
      <mesh>
        <meshStandardMaterial color={colors[index]} />
        <boxGeometry args={[0.2, 0.2, 0.2]} />
      </mesh>
    </RigidBody>
  );
};
