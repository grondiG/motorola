import ResetButton from './ResetButton';
import SubmitButton from './SubmitButton';

const ButtonContainer = (props: {
  sequence: string;
  setSequence: Function;
}) => {
  return (
    <div
      className='absolute right-0 w-96 flex justify-between items-center gap-6'
      style={{
        top: `calc(16rem + ${
          props.sequence.length > 0
            ? Math.floor((props.sequence.length - 1) / 27) * 1.5
            : 0
        }rem)`,
      }}>
      <ResetButton setSequence={props.setSequence} />
      <SubmitButton />
    </div>
  );
};

export default ButtonContainer;
