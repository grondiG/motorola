import { useEffect } from 'react';
import AnimatedLetter from './AnimatedLetter';

const InputField = (props: { value: string; setValue: any }) => {
  const { value, setValue } = props;

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        setValue((prev: string) => prev.slice(0, -1));
      } else if (event.key.match(/^[a-zA-Z]$/)) {
        setValue((prev: string) => prev + event.key.toLocaleUpperCase());
      }
    };

    window.addEventListener('keydown', handleEvent, false);

    return () => {
      window.removeEventListener('keydown', handleEvent, false);
    };
  }, []);

  return (
    <div className='p-5 w-96 absolute right-10 top-[47%] rounded-xl text-white border-purple-500 border-2'>
      {value.length > 0
        ? [...value].map((value) => {
            return <AnimatedLetter key={value}>{value}</AnimatedLetter>;
          })
        : '\u00A0'}
    </div>
  );
};

export default InputField;
