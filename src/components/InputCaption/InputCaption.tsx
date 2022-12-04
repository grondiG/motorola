import { useState } from 'react';

const InputCaption = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className='absolute left-8 bg-purple-700 bottom-8 w-16 h-16 rounded-full'>
      <p className='text-center  leading-[64px] text-xl text-extrabold'>?</p>
      {showTooltip && (
        <div className='w-52 absolute left-6 bottom-16 bg-gray-800 p-5 rounded-lg transition-all animate-fade-in'>
          <p>Wejscie przyjmuje nastepujace wartosci</p>
          <ul>
            <li>A - Adenina</li>
            <li>C - Cytozyna</li>
            <li>G - Guanina</li>
            <li>T - Tymina [RNA] </li>
            <li>U - Uracyl [DNA] </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputCaption;
