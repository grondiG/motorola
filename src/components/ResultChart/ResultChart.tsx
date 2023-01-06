import NavigationArrowUp from '../NavigationArrows/NavigationArrowUp';

import {
    LineChart,
    Line, Tooltip, CartesianGrid, YAxis, XAxis,
    AreaChart, Area, ResponsiveContainer,
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
            console.log(props.proteinInfo.info);
            setGraphDimensons({height:graphParent.current.offsetHeight, width: graphParent.current.offsetWidth});
        }
    },[graphParent.current, props.isChartVisible, props.proteinInfo]);

  return (
    <div className='w-screen h-screen'>
      <NavigationArrowUp />
        {props.proteinInfo && <div className='flex w-full h-full'>
            {props.isChartVisible&&<table className='mt-2 h-min w-full'>
          <thead>
            <tr>
              <th className='text-white text-2xl'> </th>
              {props.proteinInfo.info.map((acid:any, index:number) =>(
                      <th key={index} style={{width: `${100/props.proteinInfo.info.length}%`}}
                          className={`text-white text-2xl px-1.5 ${index<props.proteinInfo.sequence.length-1?'border-r-2 border-r-white':''}`}>{acid.letter}</th>
             ))}
            </tr>
          </thead>
            <tbody>
                <tr>
                    <td className='text-white text-2xl px-1.5'>Masa</td>
                    <td colSpan={props.proteinInfo.sequence.length} className='w-full' ref={graphParent}>
                        <AreaChart margin={{top:20, left:-20, right:30}}
                                   width={graphDimensions.width} height={150} data={props.proteinInfo.info}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8748b8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8748b8" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="letter" />
                            <YAxis />
                            <Tooltip itemStyle={{color:"#000000"}} contentStyle={{color:"#581C87"}}/>
                            <Area type="monotone" dataKey="weight" stroke="#8748b8" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </td>
                </tr>
                <tr>
                    <td className='text-white text-2xl px-1.5'>Indeks hydrofobowy</td>
                    <td colSpan={props.proteinInfo.sequence.length} className='w-full' ref={graphParent}>
                        <AreaChart margin={{top:20, left:-20, right:30}}
                                   width={graphDimensions.width} height={150} data={props.proteinInfo.info}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8748b8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8748b8" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="letter" />
                            <YAxis />
                            <Tooltip itemStyle={{color:"#000000"}} contentStyle={{color:"#581C87"}}/>
                            <Area type="monotone" dataKey="hydropathyIndex" stroke="#8748b8" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </td>
                </tr>
                <tr>
                    <td className='text-white text-2xl px-1.5'>pKa</td>
                    <td colSpan={props.proteinInfo.sequence.length} className='w-full' ref={graphParent}>
                        <AreaChart margin={{top:20, left:-20, right:30}}
                                   width={graphDimensions.width} height={150} data={props.proteinInfo.info}>
                            <defs>
                                <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8748b8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8748b8" stopOpacity={0.1}/>
                                </linearGradient>
                                <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#48b8a9" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#48b8a9" stopOpacity={0.1}/>
                                </linearGradient>
                                <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#b84848" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#b84848" stopOpacity={0.1}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="letter" />
                            <YAxis />
                            <Tooltip formatter={(value,name,props)=>[value,name.toString().substring(4,name.toString().length)]} itemStyle={{color:"#000000"}} contentStyle={{color:"#581C87"}}/>
                            <Area type="monotone" dataKey="pka.pka1" stroke="#8748b8" fillOpacity={1} fill="url(#color1)" />
                            <Area type="monotone" dataKey="pka.pka2" stroke="#48b8a9" fillOpacity={1} fill="url(#color2)" />
                            <Area type="monotone" dataKey="pka.pka3" stroke="#b84848" fillOpacity={1} fill="url(#color3)" />
                        </AreaChart>
                    </td>
                </tr>
            </tbody>
        </table>}
      </div>}
    </div>
  );
};

export default ResultChart;
