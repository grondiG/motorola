import { useEffect, useState } from 'react';
import InputField from './components/InputField/InputField';
import { Canvas } from '@react-three/fiber';
import Rna from './assets/Rna';
import AcidType from './components/AcidType/AcidType';
import InputCaption from './components/InputCaption/InputCaption';
import ButtonContainer from './components/InputButtons/ButtonContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Result from './components/Result/Result';

function App() {
  const [sequence, setSequence] = useState('');
  const [type, setType] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);
  const [proteinInfo, setProteinInfo] = useState<any[]>([]);
  const [splitSequence, setSplitSequence] = useState<string[]>([]);

  const getSequence = (seq: string) => {
    for(let i=0;i<seq.length;i++){
        if(seq.slice(i,i+3) === "AUG" || seq.slice(i,i+3) === "ATG"){
            seq = seq.slice(i);
            break;
        }
    }
    seq = seq.replaceAll("T","U");
    const split = seq.match(/(AUG(?:[AUGC]{3,3})*?(?:UAG|UAA|UGA))/g) || [];
    setSplitSequence(split);
    if(split.length===0){
      let temp = seq.match(/.{1,3}/g);
      if(!temp?.find(item=>item==="AUG" || item==="ATG")){
        toast.error("Brak kodonu startu");
      }
      if(!temp?.find(item=>item==="UAG" || item==="UAA" || item==="UGA")){
        toast.error("Brak kodonu stopu");
      }
      toast.error("Niepoprawna sekwencja białka");
      setIsSubmited(false);
      return;
    }
    axios.get(`https://www.grondihub.live/api/sequences/${seq}`).then((response) => {
      setProteinInfo(response.data.sequences);
      toast.dismiss();
      scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      })}).catch(e=>{
      console.log(e);
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
    setSplitSequence([]);
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
              setIsSubmited={setIsSubmited}
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
              <Result seq={seq} setIsSubmited={setIsSubmited} isSubmited={isSubmited} index={index}
              proteinInfo={proteinInfo[index]} length={splitSequence.length}/>
          )
        }))
      }
      </div>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
