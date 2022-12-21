import {useEffect, useRef} from "react";

const BallRight = (props: any) => {
    const mesh = useRef<any>(null);
    useEffect(() => {
        mesh.current.position.x = 6;
    });
    return (
        <mesh ref={mesh}>
            <sphereGeometry />
            <meshLambertMaterial color="#ffffff" />
        </mesh>
    )
}

export default BallRight;