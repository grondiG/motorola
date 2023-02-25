import { useState } from "react";
import ResultChart from "../ResultChart/ResultChart";
import ResultProteinChain from "../ResultProteinChain/ResultProteinChain";

const Result = (props:{
    setIsSubmited:Function,
    isSubmited:boolean,
    length:number,
    proteinInfo:any,
    seq:string,
    index:number,
}) =>{

    const [isChartVisible,setIsChartVisible] = useState<boolean>(false);

    return (
        <div className={`result-item`}>
            <ResultProteinChain setIsChartVisible={setIsChartVisible} seq={props.seq} setIsSubmited={props.setIsSubmited}
               isSubmited={props.isSubmited} length={props.length} index={props.index}/>
            <ResultChart proteinInfo={props.proteinInfo} isChartVisible={isChartVisible}/>
        </div>
    )
}

export default Result;