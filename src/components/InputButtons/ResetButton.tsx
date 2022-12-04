const SubmitButton = (props: { setSequence: Function }) => {
  const handleClick = () => {
    props.setSequence('');
  };
  return (
    <button
      onClick={handleClick}
      className='bg-purple-500 p-5 rounded-xl w-full'>
      Wyczysc
    </button>
  );
};

export default SubmitButton;
