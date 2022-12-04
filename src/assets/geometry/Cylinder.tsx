import {useEffect, useRef} from "react";
import Tube from "./Tube";

const Cylinder = (props: any) => {
    const mesh = useRef<any>(null);
    const mesh2 = useRef<any>(null);
    let color:string = "";
    let color2:string = "";

    switch(props.last){
        case 'A':
            color = "#DD7AD4";
            color2 = "#7ADD7D";
            break;
        case 'C':
            color = "#D9DD7A";
            color2 = "#7A8EDD";
            break;
        case 'G':
            color = "#7A8EDD";
            color2 = "#D9DD7A";
            break;
        case 'U':
            color = "#7ADD7D";
            color2 = "#DD7AD4";
            break;
        case 'T':
            color = "#7ADD7D";
            color2 = "#DD7AD4";
            break;
    }

    useEffect(() => {
        mesh.current.rotation.z = 90 * Math.PI/180;
        mesh.current.position.x = -2.5;
        console.log(props.last)
        mesh2.current.rotation.z = 90 * Math.PI/180;
        mesh2.current.position.x = 2.5;
        
    console.log(color);
    });
    return (
        <>
        <mesh ref={mesh}>
            <cylinderGeometry args={[0.4,0.4,5,35]}/>
            <meshLambertMaterial color={color} />
        </mesh>
        <mesh ref={mesh2}>
            <cylinderGeometry args={[0.4,0.4,5,35]}/>
            <meshLambertMaterial color={color2} />
        </mesh>
        </>
    )
}

export default Cylinder;