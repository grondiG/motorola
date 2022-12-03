import { useEffect, useState } from 'react';

const AcidType = (props: {
  sequence: string;
  type: string;
  setType: Function;
}) => {
  const styleRNA = {
    width: '50%',
    left: 0,
  };

  const styleDNA = {
    width: '50%',
    left: '50%',
  };

  useEffect(() => {
    if (props.sequence.includes('T')) {
      props.setType('DNA');
    } else if (props.sequence.includes('U')) {
      props.setType('RNA');
    } else {
      props.setType('');
    }
  }, [props.sequence]);

  return (
    <div className='flex border p-5 rounded-xl border-purple-700 absolute right-[400px]'>
      <div className='pr-2'>RNA</div>
      <div className='pl-2'>DNA</div>
      <div
        style={
          props.type === 'RNA'
            ? styleRNA
            : props.type === 'DNA'
            ? styleDNA
            : undefined
        }
        className='w-full h-full absolute bg-purple-700 rounded-xl top-0 left-0 flex items-center text-2  xl text-extrabold justify-center transition-all duration-500'>
        {props.type == '' && <span>?</span>}
      </div>
    </div>
  );
};

export default AcidType;
