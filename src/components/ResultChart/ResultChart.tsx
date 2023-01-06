import NavigationArrowUp from '../NavigationArrows/NavigationArrowUp';
import {
    LineChart,
    Line, Tooltip, CartesianGrid, YAxis, XAxis
} from "recharts";
import {Ref, useEffect, useRef, useState} from "react";

const ResultChart = (props:{
  proteinInfo: any;
  isChartVisible: boolean;
}) => {
    const graphParent:Ref<any> = useRef(null);
    const [graphDimensions, setGraphDimensons] = useState({width: 0, height: 0});

    useEffect(()=>{
        if(graphParent.current){
            console.log(graphParent.current.offsetWidth);
            setGraphDimensons({height:graphParent.current.offsetHeight, width: graphParent.current.offsetWidth});
        }
    },[graphParent.current, props.isChartVisible, props.proteinInfo]);

  return (
    <div className='w-screen h-screen'>
      <NavigationArrowUp />
        {props.proteinInfo && <div className='flex w-full h-full'>
        <table className='mt-2 h-min w-full'>
          <thead>
            <tr>
              <th className='text-white text-2xl'> </th>
              {props.proteinInfo.info.map((acid:any, index:number) =>(
                      <th key={index} className='text-white text-2xl px-1.5 text-left'>{acid.letter}</th>
             ))}
            </tr>
          </thead>
            <tbody>
    <tr>
        <td className='text-white text-2xl px-1.5'>Masa</td>
        <td colSpan={props.proteinInfo.sequence.length} ref={graphParent}>
            {props.isChartVisible&&<LineChart margin={{top:20, left:-20, right:30}}
                    width={graphDimensions.width} height={150} data={props.proteinInfo.info}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="letter" />
                    <YAxis />
                    <Tooltip itemStyle={{color:"#000000"}} contentStyle={{color:"#000000"}}/>
                    <Line type="monotone" dataKey="weight" stroke="#ffffff" />
                </LineChart>}
        </td>
    </tr>
            </tbody>
        </table>
      </div>}
    </div>
  );
};

export default ResultChart;
