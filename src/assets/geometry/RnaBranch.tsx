import {useEffect, useRef} from "react";
import Tube from "./Tube";
import Cylinder from "./Cylinder";
import BallRight from "./BallRight";
import BallLeft from "./BallLeft";
import {useFrame} from "@react-three/fiber";

const RnaBranch = (props: any) => {
    const mesh = useRef<any>(null);

    let py = -1.5*props.i;
    let ry = .2*props.i;

    useEffect(() => {
        mesh.current.rotation.y = .2*(props.i-1);
        mesh.current.position.y = (props.i-1)*-1.5;
    },[]);
    useFrame(()=>{
       if(mesh.current.position.y > py){
           mesh.current.position.y  -= 0.1;
       }
       if(mesh.current.rotation.y < ry){
           mesh.current.rotation.y += 0.01;
       }
    });
    return (
        <group ref={mesh}>
            <Cylinder last={props.last}/>
            <BallRight />
            <BallLeft />
        </group>
    )
}

export default RnaBranch;