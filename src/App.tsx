import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import InputField from './components/InputField/InputField';
import React from 'react';
import { Canvas, extend } from '@react-three/fiber';
import Rna from './assets/Rna';
import AcidType from './components/AcidType/AcidType';
import InputCaption from './components/InputCaption/InputCaption';
import ButtonContainer from './components/InputButtons/ButtonContainer';
import { OrbitControls } from '@react-three/drei';
import ResultProteinChain from './components/ResultProteinChain/ResultProteinChain';
import ResultChart from './components/ResultChart/ResultChart';
import axios from "axios";

function App() {
  const [sequence, setSequence] = useState('');
  const [type, setType] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);
  const [proteinInfo, setProteinInfo] = useState<any[]>([]);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [splitSequence, setSplitSequence] = useState<string[]>([]);

  const getSequence = (seq: string) => {
    for(let i=0;i<seq.length;i++){
        if(seq.slice(i,i+3) === "AUG" || seq.slice(i,i+3) === "ATG"){
            seq = seq.slice(i);
            break;
        }
    }
    seq = seq.replaceAll("T","U");
    const split = seq.match(/(AUG.*?[AUGC]{3,3}(?:UAG|UAA|UGA))/g) || [];
    console.log(split);
    setSplitSequence(split);
    split.forEach((item, index) => {
    axios.get(`/api/sequence/${item}`).then((response) => {
      console.log(response);
      setProteinInfo(oldData=>[...oldData, response.data]);
      scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }).catch(e=>{
      console.log(e);
    })
  });
    
  }

  useEffect(() => {
    scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
  },[]);

  useEffect(() => {
    setProteinInfo([]);
    if(isSubmited){
      getSequence(sequence);
    }
  }, [isSubmited]);

  return (
    <>
      <div className='w-screen h-screen grid grid-cols-2 grid-rows-1'>
        <div className='h-full w-full relative'>
          <div className='relative top-[30%] right-10'>
            <h1 className='text-5xl font-bold text-right'>
              Wprowadz sekwencje bialek{''}
              <span className='leading-tight font-mono block text-right font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-800 to-purple-400'>
                {type || 'RNA'}
              </span>
            </h1>
            <AcidType sequence={sequence} type={type} setType={setType} setSequence={setSequence} />
            <InputField
              sequence={sequence}
              setSequence={setSequence}
              type={type}
            />
            <ButtonContainer
              sequence={sequence}
              setSequence={setSequence}
              setIsSubmited={setIsSubmited}
            />
          </div>
        </div>

        <InputCaption />
        <Canvas className='h-full w-full'>
          <Rna seq={sequence} />
        </Canvas>
      </div>
      <div className={`result`}>
      {isSubmited && (
        splitSequence.map((seq, index) => {
          console.log(index,proteinInfo);
          return (
            <div className={`result-item`}>
              <ResultProteinChain setIsChartVisible={setIsChartVisible} seq={seq} setIsSubmited={setIsSubmited}
               isSubmited={isSubmited} length={splitSequence.length} index={index} />
              <ResultChart proteinInfo={proteinInfo[index]} isChartVisible={isChartVisible}/>
            </div>
          )
        }))
      }
      </div>
    </>
  );
}

export default App;
