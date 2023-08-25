import { useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { exploredAtom } from "./UI";
import { DynamicTween, easeInOutCubic } from "twon";
import { useFrame } from "@react-three/fiber";

export function Circuit() {
  const { nodes, materials } = useGLTF('./models/circuit.glb')
  // 使用jotai状态管理
  const [explored, setExplored] = useAtom(exploredAtom)

  useEffect(() => {
    nodes.Scene.traverse((_child) => {
      if (_child.isMesh) {
        _child.castShadow = true
        _child.receiveShadow = true
      }
    })
  }, [])

  // 定义时间过渡
  const [tween] = useState(() => {
    return new DynamicTween(0, { ease: easeInOutCubic, duration: 2000 })
  })

  useEffect(() => {
    // 通过改变explored的值改变tween
    if (tween) {
      tween.to(explored ? 1 : 0)
    }

  }, [explored])

  useFrame(() => {
    // 每帧让对应的物体的z值改变
    nodes.board.position.z = tween.getValue() * (0 / 5 * 1.5 - 1)
    nodes.battery.position.z = tween.getValue() * (1 / 5 * 1.5 - 1)
    nodes.chipset1.position.z = tween.getValue() * (2 / 5 * 1.5 - 1)
    nodes.chipset2.position.z = tween.getValue() * (3 / 5 * 1.5 - 1)
    nodes.chipset3.position.z = tween.getValue() * (4 / 5 * 1.5 - 1)
    nodes.chipset4.position.z = tween.getValue() * (5 / 5 * 1.5 - 1)
  })

  return (
    <>
      <primitive object={nodes.Scene} />
    </>
  )
}