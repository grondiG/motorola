import { useEffect, useState } from 'react';
import InputField from './components/InputField/InputField';

import { Canvas } from '@react-three/fiber';
import Box from './assets/Box';

function App() {
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log('updated value', value);
  }, [value]);

  return (
    <>
      <div className='w-screen h-screen grid grid-cols-2 grid-rows-1'>
        <div className='h-full w-full relative'>
          <h1 className='text-5xl font-bold absolute top-[30%] right-10'>
            Wprowadz sekwencje bialek{''}
            <span className='leading-tight font-mono block text-right font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-800 to-purple-400'>
              RNA
            </span>
          </h1>
          <InputField
            value={value}
            setValue={setValue}
          />
        </div>
        <Canvas className='h-full w-full'>
          <ambientLight />
          <Box />
        </Canvas>
      </div>
    </>
  );
}

export default App;
