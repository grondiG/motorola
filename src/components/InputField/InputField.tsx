import {FormEvent, useEffect, useRef} from 'react';
import AnimatedLetter from './AnimatedLetter';
import {DocumentTextIcon} from "@heroicons/react/20/solid";
import './style.css'

const InputField = (props: {
  sequence: string;
  setSequence: Function;
  type: string;
  setIsSubmited: Function;
  minInput: any;
}) => {
  const { sequence: value, setSequence: setValue } = props;
  const input = useRef(null);

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if(props.minInput.current !== document.activeElement) {
        if (event.key === 'Backspace') {
          setValue((prev: string) => prev.slice(0, -1));
        } else if (event.key === 'Enter') {
          if (props.sequence.length > 0) {
            props.setIsSubmited(true);
          }
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
        // @ts-ignore
        input.current.scroll({left: 0, top: input.current.scrollHeight, behavior: 'smooth'});
      }
    };

    document.addEventListener('keydown', handleEvent, false);

    return () => {
      document.removeEventListener('keydown', handleEvent, false);
    };


  }, [props.type]);

  const handleInput=(e:any)=>{
    const fileLoad:FileReader = new FileReader()
    fileLoad.readAsText(e.target.files[0]);
    fileLoad.onload = () =>{
      let temp = fileLoad.result?.toString().replace(/[tT]/,"U");
      temp = temp?.replace(/(\r\n|\n|\r)/gm, "");
      props.setSequence(temp?.replace(/(?![AUGCaugc])[A-z]/g, "").toUpperCase());
    }
  }

  return (
    <>
      <input type="file" className='hidden' id='file' accept='.txt' onInput={(e)=>handleInput(e)} />
      <div className='p-5 w-96 rounded-xl absolute right-0 text-white border-purple-500 border-2 inputContent'
      ref={input}>
        {value.length > 0
          ? [...value].map((value, index) => {
              return (
                <>
                  <AnimatedLetter key={index}>{value}</AnimatedLetter>
                </>
              );
            })
          : '\u00A0'}
        <label htmlFor="file">
        <DocumentTextIcon className='btnIcon'/>
        </label>
      </div>
    </>
  );
};

export default InputField;
