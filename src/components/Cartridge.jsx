import { Float } from "@react-three/drei";
import { Circuit } from "./Circuit";
import { Case } from "./Case";
import { Screw } from "./Screw";
import { Sticker } from "./Sticker";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Cartridge = () => {
  const group = useRef()

  useFrame((state) => {
    // 每帧旋转
    group.current.rotation.y = state.clock.elapsedTime * 0.1
  })
  return (
    <group ref={group}>
      {/* 添加浮动 */}
      <Float speed={0.3} rotation-y={Math.PI * 0}>
        <Circuit />
        <Case />
        <Screw />
        <Sticker />
      </Float>
    </group>
  )
}

export default Cartridge;