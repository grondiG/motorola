const SubmitButton = (props: { setIsSubmited: Function; sequence: string; }) => {
  const handleSubmit = () => {
    if(props.sequence.length > 0){
      props.setIsSubmited(true);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className='bg-purple-500 p-5 rounded-xl w-full'
    >
      Przeslij
    </button>
  );
};

export default SubmitButton;
