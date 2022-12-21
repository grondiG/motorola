import axios from 'axios';
import { resolve } from 'node:path/win32';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';
import NavigationArrowDown from '../NavigationArrows/NavigationArrowDown';
import NavigationArrowUp from '../NavigationArrows/NavigationArrowUp';

const ResultProteinChain = (props: {
  seq: string;
  setIsSubmited: Function;
}) => {
  const [img, setImg] = useState('');

  function handleReset() {
    props.setIsSubmited(false);
  }

  function blobToDataURL(blob: any, callback: any) {
    var a = new FileReader();
    a.onload = function (e) {
      callback(e.target?.result);
    };
    a.readAsDataURL(blob);
  }

  const { isLoading, error, data } = useQuery(
    'getSequenceImg',
    async () =>
      await axios
        .get(`https://motorola-service.onrender.com/api/sequenceimg/${props.seq}`, { responseType: 'blob' })
        .then((response) => {
          blobToDataURL(response.data, (dataUrl: any) => {
            setImg(dataUrl);
          });
        })
  );

  return (
    <div className='w-screen h-screen bg-purple-900'>
      <NavigationArrowUp onClick={handleReset} />
      <div className='h-[80%]'>
        {isLoading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <MoonLoader />
          </div>
        ) : error ? (
          <div className='w-full h-full flex justify-center items-center'>
            <h1 className='text-5xl font-bold text-center'>
              Nie można przetworzyć wpisanej sekwencji
            </h1>
          </div>
        ) : (
          <div className='w-full h-full'>
            <h1 className='text-5xl font-bold text-center'>Sekwencja:</h1>
            <img src={img} />
            {/* TODO: Totalnie rozjebane okok */}
            <button
              onClick={() => {
                const image = new Image();
                image.src = img;

                const w = window.open('');
                w?.document.write(image.outerHTML);
              }}
            >
              Otwórz w nowej karcie
            </button>
            <button>Pobierz</button>
          </div>
        )}
      </div>
      <NavigationArrowDown />
    </div>
  );
};

export default ResultProteinChain;
