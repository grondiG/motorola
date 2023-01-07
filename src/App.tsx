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
  const [proteinInfo, setProteinInfo] = useState('');
  const [isChartVisible, setIsChartVisible] = useState(false);

  const getSequence = (seq: string) => {
    axios.get(`https://www.grondihub.live/api/sequence/${seq}`).then((response) => {
      setProteinInfo(response.data);
    })
  }

  useEffect(() => {
    console.log(window.scrollY);
    if (isSubmited) {
      getSequence(sequence);
      scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
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
            <AcidType sequence={sequence} type={type} setType={setType} />
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
      {isSubmited && (
        <>
          <ResultProteinChain setIsChartVisible={setIsChartVisible} seq={sequence} setIsSubmited={setIsSubmited} isSubmited={isSubmited} />
          <ResultChart proteinInfo={proteinInfo} isChartVisible={isChartVisible}/>
        </>
      )}
    </>
  );
}

export default App;
