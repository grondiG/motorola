import {useRef} from "react";
import {useFrame} from "@react-three/fiber";

const Box = (props: any) => {
    const mesh = useRef<any>(null);
    useFrame(() => {
        if(!mesh.current){
            return;
        }
        mesh.current.rotation.x += 0.01;
        mesh.current.rotation.y += 0.01;
    });
    return (
        <mesh ref={mesh}>
            <boxGeometry args={[1, 1, 1]} />
            <meshLambertMaterial color="#9E68A7" />
        </mesh>
    )
}

export default Box;