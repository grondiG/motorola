import {useEffect, useRef} from "react";
import {useFrame} from "@react-three/fiber";
import Cylinder from "./geometry/Cylinder";
import BallRight from "./geometry/BallRight";
import BallLeft from "./geometry/BallLeft";
import {useThree} from "@react-three/fiber";
import RnaBranch from "./geometry/RnaBranch";

const Rna = (props: any) => {
    const mesh = useRef<any>(null);
    const {camera} = useThree();
    // const tubeGeometry = new THREE.TubeGeometry(
    useEffect(()=>{
        camera.position.z = 25;
        camera.position.y=-20;
    })
    useFrame(() => {
        if(!mesh.current){
            return;
        }
        mesh.current.rotation.y += 0.01;
    });
    return (
        <group ref={mesh}>
            { [...Array(30)].map((_, i) => (
                <>
                <RnaBranch i={i} />
                </>
                ))
            }
        </group>
    )
}

export default Rna;