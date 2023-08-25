import { useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { DynamicTween, easeInOutCubic } from "twon";
import { useAtom } from "jotai";
import { exploredAtom } from "./UI";

export function Sticker() {
  const { scene, nodes, materials } = useGLTF('./models/sticker.glb')
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
        nodes.Scene.position.z = tween.getValue() * 4.5
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
        <primitive object={ scene } />
    </>
}