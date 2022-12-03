import {useEffect, useRef} from "react";
import Tube from "./Tube";

const Cylinder = (props: any) => {
    const mesh = useRef<any>(null);
    useEffect(() => {

        mesh.current.rotation.z = 90 * Math.PI/180;
        mesh.current.position.x = 0;
    });
    return (
        <mesh ref={mesh}>
            <cylinderGeometry args={[0.4,0.4,10,32]}/>
            <meshLambertMaterial color="#9E68A7" />
        </mesh>
    )
}

export default Cylinder;