
import { Canvas } from '@react-three/fiber'
import './App.css'
import Cartridge from './components/Cartridge'
import { CameraControls, Loader, OrbitControls } from '@react-three/drei'
import { Stage } from './components/Stage'
import { Suspense } from 'react'
import UI from './components/UI'

function App() {

  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
          position: [8, -3, 8]
        }}
      >
        <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
        {/* 导入物体 */}
        <Suspense>
          <Cartridge />
        </Suspense>
        {/* 环境 */}
        <Stage />
      </Canvas>
      {/* 导入UI按钮 */}
      <UI />
    </>
  )
}

export default App
