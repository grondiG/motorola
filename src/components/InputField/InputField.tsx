import { useEffect } from 'react';
import AnimatedLetter from './AnimatedLetter';

const InputField = (props: {
  sequence: string;
  setSequence: Function;
  type: string;
  setType: Function;
}) => {
  const { sequence: value, setSequence: setValue } = props;

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        setValue((prev: string) => prev.slice(0, -1));
      } else if (event.key === 'Enter') {
        alert('Submited');
      } else if (event.key.match(/^[a-zA-Z]$/)) {
        if (props.type === 'RNA' && event.key === 'T') {
          return;
        } else if (props.type === 'DNA' && event.key === 'U') {
          return;
        } else {
          setValue((prev: string) => prev + event.key.toLocaleUpperCase());
        }
      }
    };

    window.addEventListener('keydown', handleEvent, false);

    return () => {
      window.removeEventListener('keydown', handleEvent, false);
    };
  }, []);

  return (
    <div className='p-5 w-96 rounded-xl absolute right-0 text-white border-purple-500 border-2'>
      {value.length > 0
        ? [...value].map((value, index) => {
            return (
              <>
                <AnimatedLetter key={index}>{value}</AnimatedLetter>
              </>
            );
          })
        : '\u00A0'}
    </div>
  );
};

export default InputField;
