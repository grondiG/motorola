import {useEffect, useRef} from "react";

const BallLeft = (props: any) => {
    const mesh = useRef<any>(null);
    useEffect(() => {
        mesh.current.position.x = -5;
    });
    return (
        <mesh ref={mesh}>
            <sphereGeometry />
            <meshLambertMaterial color="#ffffff" />
        </mesh>
    )
}

export default BallLeft;