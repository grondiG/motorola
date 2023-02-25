import axios from 'axios';
import {useEffect, useState} from 'react';
import { MoonLoader } from 'react-spinners';
import NavigationArrowDown from '../NavigationArrows/NavigationArrowDown';
import NavigationArrowUp from '../NavigationArrows/NavigationArrowUp';
import NavigationArrowRight from '../NavigationArrows/NavigationArrowRight';
import NavigationArrowLeft from '../NavigationArrows/NavigationArrowLeft';

const ResultProteinChain = (props: {
  seq: string;
  setIsSubmited: Function;
  isSubmited: boolean;
  setIsChartVisible: Function;
  index: number;
  length: number;
}) => {
  const [img, setImg] = useState('');
  const [width, setWidth] = useState(0);
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);
  const [weight, setWeight] = useState(0);
  const [errorMessage,setErrorMessage] = useState("");

  function handleReset() {
    props.setIsSubmited(false);
  }

  function blobToDataURL(blob: any, callback: any) {
    let a = new FileReader();
    a.onload = function (e) {
      callback(e.target?.result);
    };
    a.readAsDataURL(blob);
  }

  const getImg = (img:any, callback:any) =>{
      setIsLoading(true);
      const blob = URL.createObjectURL(img);
      const image = new Image();
      image.src = blob;
        image.onload = () => {
            callback(image);
            setIsLoading(false)
        }
  }
  const queryImg = async()=>{
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
          }).catch(()=>{
              setIsLoading(false);
              setIsError(true);
          })
  }
  const queryWeight = async()=>{
        await axios
            .get(
                `https://www.grondihub.live/api/proteinWeight/${props.seq}`,
            )
            .then((response) => {
                setWeight(response.data.weight);
            })
            .catch(e=>{
                setIsLoading(false);
                setIsError(true);
                if(e.response){
                    console.log(e.response)
                    setErrorMessage(e.response.data);
                }
            })
  }

  useEffect(() => {
      queryImg().then(r => console.log(r)).catch(e => setIsError(true));
      queryWeight().then(r => console.log(r)).catch(e => setIsError(true));
  }, []);

  return (
    <div className='w-screen h-screen bg-purple-900 relative'>
      {props.index === 0 ?
        <NavigationArrowUp onClick={handleReset} />
      :<div className='m-[5%]'></div>
      }
      {props.index !== props.length - 1 && (
        <NavigationArrowRight />
      )
      }
      {
          (props.index <= props.length - 1 && props.length - 1 !== 0 && props.index !==0) && (
          <NavigationArrowLeft />
        )
      }
      <div className='h-[80%]'>
        {isLoading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <MoonLoader />
          </div>
        ) : isError ? (
          <div className='w-full h-full flex justify-center items-center'>
            <h1 className='text-5xl font-bold text-center'>
                {errorMessage.toString()}
            </h1>
          </div>
        ) : (
          <div className='w-full h-full'>
            <h1 className='text-5xl font-bold text-center mb-8 '>Sekwencja:</h1>
            <div style={{height:"42vh",width:"100%",overflowX:"auto",padding:"2rem 0"}}
            className={(window.innerWidth<=width?'':'flex justify-center')}>
                <div style={{height:"100%", width:(width<window.innerWidth?width:width*0.6),whiteSpace:"nowrap",padding:"0 2rem"}}>
                    <img src={img} style={{height:"100%",whiteSpace:"nowrap",margin:(width<window.innerWidth?'auto auto':'0 0')}} />
                </div>
            </div>
              <div className={'flex justify-center items-center'}>
              <p>Masa: {weight.toFixed(4)} <sup>g</sup>&frasl;<sub>mol</sub></p>
                </div>
              <div className='flex w-screen justify-center mt-5'>
              <button
                className='bg-black text-white font-bold p-5 my-5 mr-5 rounded-xl opacity'
                onClick={() => {
                  window.open(img,'Image');
                }}
              >
                Otwórz w nowej karcie
              </button>
                  <a href={img} download>
              <button className='bg-black text-white font-bold p-5 my-5 mr-5 rounded-xl opacity'>
                Pobierz
              </button>
                  </a>
            </div>
          </div>
        )}
      </div>
      <NavigationArrowDown setIsChartVisible={props.setIsChartVisible}/>
    </div>
  );
};

export default ResultProteinChain;
