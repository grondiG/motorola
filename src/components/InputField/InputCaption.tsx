import { useState } from 'react';

const InputCaption = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className='absolute right-0 -bottom-24 cursor-help'>
      <p
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}>
        Jak mam to zrobic?
      </p>
      {showTooltip && (
        <div className='w-52 absolute right-0 top-6 bg-gray-800 p-5 rounded-lg transition-all animate-fade-in'>
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
