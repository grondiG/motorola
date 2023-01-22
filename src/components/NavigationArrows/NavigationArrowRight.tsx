const NavigationArrowRight = () => {
  const handleClick = () => {
    window.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className='h-[10%] flex justify-center items-center rotate-[270deg] absolute top-[50%] translate-y-[-100%] right-5 opacity'>
      <div className='cursor-pointer'>
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
          className='w-16 h-16 p-4 bg-black rounded-full'
        >
          <line x1='12' y1='5' x2='12' y2='19'></line>
          <polyline points='5 12 12 19 19 12'></polyline>
        </svg>
      </div>
    </div>
  );
};

export default NavigationArrowRight;
