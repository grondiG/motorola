import { useEffect } from 'react';
import AnimatedLetter from './AnimatedLetter';
import InputCaption from './InputCaption';

const InputField = (props: {
  sequence: string;
  setSequence: Function;
  type: string;
}) => {
  const { sequence: value, setSequence: setValue } = props;

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        setValue((prev: string) => prev.slice(0, -1));
      } else if (event.key === 'Enter') {
        alert('Submited');
      } else if (event.key.match(/^[acguACGUtT]$/)) {
        if (props.type === 'DNA' && event.key.toLocaleUpperCase() === 'T') {
          setValue((prev: string) => prev + 'U');
        } else if (
          props.type === 'RNA' &&
          event.key.toLocaleUpperCase() === 'U'
        ) {
          setValue((prev: string) => prev + 'T');
          return;
        } else {
          setValue((prev: string) => prev + event.key.toLocaleUpperCase());
        }
      }
    };

    document.addEventListener('keydown', handleEvent, false);

    return () => {
      document.removeEventListener('keydown', handleEvent, false);
    };
  }, [props.type]);

  return (
    <>
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
      <InputCaption />
    </>
  );
};

export default InputField;
