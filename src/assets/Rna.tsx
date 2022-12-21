import React, {useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import Cylinder from "./geometry/Cylinder";
import BallRight from "./geometry/BallRight";
import BallLeft from "./geometry/BallLeft";
import {useThree} from "@react-three/fiber";
import RnaBranch from "./geometry/RnaBranch";
import { OrbitControls } from "@react-three/drei";

const Rna = (props: any) => {
    const mesh = useRef<any>(null);
    const light:any = useRef();
    const Controls=(props:any)=>{
        const ref:any = useRef();
        const {camera} = useThree();
        
        useFrame(()=>{
            if(ref.current) {
                ref.current.minPolarAngle = Math.PI / 2;
                ref.current.maxPolarAngle = Math.PI / 2;
                ref.current.target.set(0, -30, 0);
                ref.current.update();
                light.current.position.copy(camera.position);
            }
        });
        return <OrbitControls ref={ref} args={[camera]} {...props} enableZoom={false} />
    }
    useFrame(() => {
        if(!mesh.current){
            return;
        }
        mesh.current.rotation.y += 0.01;

    });
    return (
        <>
        <group ref={mesh}>
            { props.seq.split('').map((text:string, i:number) => {
                console.log(text.length)
                return (
                <>
                <RnaBranch i={i} last={text.slice(-1)}  />
                </>
                )})
            }

        <Controls/>

        </group>
            <pointLight
        position={[20, -30, 0]}
        intensity={1.5}
        ref={light}
    />
    </>
    )
}

export default Rna;