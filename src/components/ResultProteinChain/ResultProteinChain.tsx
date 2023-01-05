import axios from 'axios';
import { resolve } from 'node:path/win32';
import React, {useEffect, useRef, useState} from 'react';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';
import NavigationArrowDown from '../NavigationArrows/NavigationArrowDown';
import NavigationArrowUp from '../NavigationArrows/NavigationArrowUp';

const ResultProteinChain = (props: {
  seq: string;
  setIsSubmited: Function;
  isSubmited: boolean;
}) => {
  const [img, setImg] = useState('');
  const [width, setWidth] = useState(0);
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);

  const imgRef:any = useRef();

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

  const getImg = (img:any, callback:any) =>{
      const blob = URL.createObjectURL(img);
      const image = new Image();
      image.src = blob;
        image.onload = () => {
            callback(image);
            console.log(image);
        }
  }
  const query = async()=>{
      await axios
          .get(
              `https://www.grondihub.live/api/sequenceImg/${props.seq}`,
              { responseType: 'blob' }
          )
          .then((response) => {

              blobToDataURL(response.data, (dataUrl: any) => {
                  setImg(dataUrl);

                  getImg(response.data, (image:any) => {
                      setWidth(image.width);
                  });
              });
          })
  }

  useEffect(() => {
      query().then(r => setIsLoading(false)).catch(e => setIsError(true));
  }, []);

  // const { isLoading, error, data } = useQuery(
  //   'getSequenceImg',
  //   async () =>
  //
  // );


  return (
    <div className='w-screen h-screen bg-purple-900'>
      <NavigationArrowUp onClick={handleReset} />
      <div className='h-[80%]'>
        {isLoading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <MoonLoader />
          </div>
        ) : isError ? (
          <div className='w-full h-full flex justify-center items-center'>
            <h1 className='text-5xl font-bold text-center'>
              Nie można przetworzyć wpisanej sekwencji
            </h1>
          </div>
        ) : (
          <div className='w-full h-full'>
            <h1 className='text-5xl font-bold text-center mb-8'>Sekwencja:</h1>
            <div style={{height:"40vh",width:"100%",overflowX:"auto"}}>
                <div style={{height:"100%", width:width,marginLeft:"1rem"}}>
                    <img ref={imgRef} src={img} style={{height:"100%"}} />
                </div>
            </div>
            <div className='flex w-screen justify-center mt-5'>
              <button
                className='bg-black text-white font-bold p-5 my-5 mr-5 rounded-xl'
                onClick={() => {
                  const image = new Image();
                  image.src = img;
                  const w = window.open('/'+image.src);
                  w?.document.write(image.outerHTML);
                }}
              >
                Otwórz w nowej karcie
              </button>
              <button className='bg-black text-white font-bold p-5 my-5 mr-5 rounded-xl'>
                Pobierz
              </button>
            </div>
          </div>
        )}
      </div>
      <NavigationArrowDown />
    </div>
  );
};

export default ResultProteinChain;
