const NavigationArrowUp = (props: { onClick?: Function }) => {
  const handleClick = async () => {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: 'smooth',
    });
    setTimeout(() => {
      props.onClick && props.onClick();
    }, 1000);
  };

  return (
    <div className='w-screen h-[10%] p-2 flex justify-center '>
      <svg
        onClick={handleClick}
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='w-16 h-16 p-4 bg-black rounded-full cursor-pointer'
      >
        <line x1='12' y1='19' x2='12' y2='5'></line>
        <polyline points='5 12 12 5 19 12'></polyline>
      </svg>
    </div>
  );
};

export default NavigationArrowUp;
