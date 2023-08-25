import { useGLTF } from "@react-three/drei"
import { useAtom } from "jotai"
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { DynamicTween, easeInOutCubic } from "twon";
import { exploredAtom } from "./UI"
export function Screw() {
  const { scene,materials, nodes } = useGLTF('./models/screw.glb')

  const [explored, setExplored] = useAtom(exploredAtom)

  const [ tween ] = useState(() =>
    {
        return new DynamicTween(0, { ease: easeInOutCubic, duration: 2000 })
    })

    useEffect(() =>
    {
        if(tween)
            tween.to(explored ? 1 : 0)
    }, [ explored ])

    useFrame(() =>
    {
        nodes.Scene.position.z = tween.getValue() * - 4
        nodes.screw.rotation.z = - tween.getValue() * 10
    })

  useEffect(() =>
    {
        scene.traverse((_child) =>
        {
            if(_child.isMesh)
            {
                _child.castShadow = true
                _child.receiveShadow = true
            }
        })
    }, [])

    return <>
        <primitive object={ nodes.Scene } />
    </>
}