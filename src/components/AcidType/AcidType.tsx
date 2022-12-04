import { useEffect, useState } from 'react';

const AcidType = (props: {
  sequence: string;
  type: string;
  setType: Function;
}) => {
  const styleDNA = {
    width: '50%',
    left: 0,
  };

  const styleRNA = {
    width: '50%',
    left: '50%',
  };

  useEffect(() => {
    if (props.sequence.includes('T')) {
      props.setType('RNA');
    } else if (props.sequence.includes('U')) {
      props.setType('DNA');
    } else {
      props.setType('');
    }
  }, [props.sequence]);

  return (
    <div className='flex border p-5 rounded-xl border-purple-500 absolute right-[400px]'>
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
        className='w-full h-full absolute bg-purple-500 rounded-xl top-0 left-0 flex items-center text-extrabold justify-center transition-all duration-500'>
        {props.type == '' && <span>Nieznany</span>}
      </div>
    </div>
  );
};

export default AcidType;
