import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Physics } from "@react-three/rapier";
import "./style/App.css";

function App() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 2], fov: 70, near: 0.001, far: 1000 }}>
        <Physics gravity={[0, 0, 0]}>
          <Experience />
        </Physics>

        <directionalLight position={[1, 2, 3]} />
        <directionalLight position={[-1, 2, 3]} />
      </Canvas>
    </div>
  );
}

export default App;
