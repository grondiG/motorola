import { ReactNode } from 'react';

const AnimatedLetter = (props: { children: ReactNode }) => {
  return (
    <span className='animate-fade-from-bottom inline-block'>
      {props.children}
    </span>
  );
};

export default AnimatedLetter;
