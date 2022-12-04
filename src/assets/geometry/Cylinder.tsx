import {useEffect, useRef} from "react";
import Tube from "./Tube";

const Cylinder = (props: any) => {
    const mesh = useRef<any>(null);
    let color:string = "";

    switch(props.last){
        case 'A':
            color = "#DD7AD4";
            break;
        case 'C':
            color = "#D9DD7A";
            break;
        case 'G':
            color = "#7A8EDD";
            break;
        case 'U':
            color = "#7ADD7D";
            break;
    }

    useEffect(() => {
        mesh.current.rotation.z = 90 * Math.PI/180;
        mesh.current.position.x = 0;
        
    console.log(color);
    });
    return (
        <mesh ref={mesh}>
            <cylinderGeometry args={[0.4,0.4,10,32]}/>
            <meshLambertMaterial color={color} />
        </mesh>
    )
}

export default Cylinder;