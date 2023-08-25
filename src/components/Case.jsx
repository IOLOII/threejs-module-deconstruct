import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useAtom } from "jotai";
import * as THREE from "three"
import { exploredAtom } from "./UI";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { DynamicTween, easeInOutCubic } from "twon";
export function Case() {
  const { nodes, materials } = useGLTF('./models/case.glb')
  const [explored, setExplored] = useAtom(exploredAtom)

  const back = useRef()
  const front = useRef()

  const [tween] = useState(() => {
    return new DynamicTween(0, { ease: easeInOutCubic, duration: 2000 })
  })

  useEffect(() => {
    if (tween)
      tween.to(explored ? 1 : 0)
  }, [explored])

  useFrame(() => {
    back.current.position.z = tween.getValue() * - 2.5
    front.current.position.z = tween.getValue() * 2
  })

  return (
    <>
      <mesh
        ref={back}
        geometry={nodes.caseBack.geometry}
      >
        <MeshTransmissionMaterial
          normalMap={materials.case.normalMap}
          normalMap-colorSpace={THREE.LinearSRGBColorSpace}
          normalMapType={THREE.ObjectSpaceNormalMap}
          background={new THREE.Color("#000000")}
        />
      </mesh>
      <mesh
        ref={front}
        geometry={nodes.caseFront.geometry}
      >
        <MeshTransmissionMaterial
          normalMap={materials.case.normalMap}
          normalMap-colorSpace={THREE.LinearSRGBColorSpace}
          normalMapType={THREE.ObjectSpaceNormalMap}
          background={new THREE.Color("#000000")}
        />
      </mesh>
    </>
  )
}