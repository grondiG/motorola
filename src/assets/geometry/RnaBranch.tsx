import {useEffect, useRef} from "react";
import Tube from "./Tube";
import Cylinder from "./Cylinder";
import BallRight from "./BallRight";
import BallLeft from "./BallLeft";

const RnaBranch = (props: any) => {
    const mesh = useRef<any>(null);
    useEffect(() => {
        mesh.current.position.y = -1.5*props.i;
        mesh.current.rotation.y = .2*props.i;
    });
    return (
        <group ref={mesh}>
            <Cylinder />
            <BallRight />
            <BallLeft />
        </group>
    )
}

export default RnaBranch;