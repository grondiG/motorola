import ResetButton from './ResetButton';
import SubmitButton from './SubmitButton';

const ButtonContainer = (props: {
  sequence: string;
  setSequence: Function;
  setIsSubmited: Function;
}) => {
  return (
    <div
      className='absolute right-0 w-96 flex justify-between items-center gap-6'
      style={{
        top: `calc(16rem + ${
          props.sequence.length > 0
            ? (Math.ceil(props.sequence.length / 29) - 1) * 1.5
            : 0
        }rem)`,
      }}
    >
      <ResetButton setSequence={props.setSequence} />
      <SubmitButton setIsSubmited={props.setIsSubmited} />
    </div>
  );
};

export default ButtonContainer;
