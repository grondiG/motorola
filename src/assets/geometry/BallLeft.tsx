import {useEffect, useRef} from "react";

const BallLeft = (props: any) => {
    const mesh = useRef<any>(null);
    useEffect(() => {
        mesh.current.position.x = -5;
    });
    return (
        <mesh ref={mesh}>
            <sphereGeometry />
            <meshLambertMaterial color="#9E68A7" />
        </mesh>
    )
}

export default BallLeft;