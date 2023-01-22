import {useRef} from "react";

const Tube = (props: any) => {
    const mesh = useRef<any>(null);
    return (
        <mesh ref={mesh}>
            <tubeGeometry args={[]} />
            <meshLambertMaterial color="#9E68A7" />
        </mesh>
    )
}

export default Tube;