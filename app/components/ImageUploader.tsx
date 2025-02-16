'use client';

import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { requestGroq } from '@/app/actions/actions';
import { useProfanityChecker } from 'glin-profanity';

export default function ImageUploader() {
  const [isMobile, setIsMobile] = useState(false);
  const [diet, setDiet] = useState('vegan');
  const [results, setResults] = useState('');
  const [extracted, setExtracted] = useState('');
  const [loading, setLoading] = useState(false);
  const {result, checkText } = useProfanityChecker();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMobile(
        /android|iPhone|iPad|iPod|opera mini|mobile|blackberry/i.test(userAgent)
      );
    }
  }, [])

  const handleImageChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev?.target?.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      await performOCR(imageUrl);
    }
  }

  const handleDrop = async (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const file = ev.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      await performOCR(imageUrl);
    }
  }

  const handleDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  }

  useEffect(() => {
    const fetchData = async () => {
      if (result !== null && !result?.containsProfanity) {
        try {
          // Trying to beat the eslint boss. Eslint really wants diet and extracted to be in the dependency array, but I only want to re-render when result is updated.
          const localDiet = diet;
          const localExtracted = extracted;

          const messageFromGroq = await requestGroq(localDiet, localExtracted);
          setResults(`${messageFromGroq.choices[0].message.content}`);
        } catch {
          setResults('Unable to retrieve data from AI.');
        } finally {
          setLoading(false);
        }
      } else if(result?.containsProfanity) {
        setExtracted('There was profanity found in the image. Please try another image.');
        setResults('');
        setLoading(false);
      }
    }
  
    fetchData();
  }, [result]);

  const performOCR = async (imageUrl: string) => {
    setLoading(true);
    setResults('');
    let imageResults = null;

    try {
      const {data:{text}} = await Tesseract.recognize(imageUrl, 'eng');
      imageResults = text;
      setExtracted(text);
    } catch {
      setExtracted('Unable to extract text from image.');
    }

    if (imageResults && imageResults.trim() !== '~~') {
      checkText(imageResults);
    } else {
      setExtracted('Unable to extract text from image.');
      setLoading(false);
    }
  }

  const handleSelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value;
    setDiet(value);
  }

  const dietOptions = [{
      name: 'Vegan',
      value: 'vegan'
    },{
      name: 'Gluten-free',
      value: 'gluten-free'
  }]

  return <>
    <div className="w-full flex justify-center z-50">
      <select defaultValue="vegan" className="select border-veganLightGreen border-2 focus:border-veganLightGreen w-full max-w-xs focus:outline-none" onChange={handleSelect}>
        {dietOptions.map((diet) => {
          return <option key={diet.value} value={diet.value}>
              {diet.name}
            </option>
        })}
      </select>
    </div>
    <div className="flex flex-col items-center w-full text-center text-base-content z-50">
      <div onDrop={handleDrop} onDragOver={handleDragOver} className="relative min-h-[300px] p-4 m-4 mt-8 cursor-pointer bg-base-200 border-dashed border-2 border-base-300 w-full flex flex-col items-center justify-center">
        <div className="absolute md:left-[60px] top-[60px] md:top-auto max-w-[200px] rotate-[-20deg] border-2 border-veganDarkGreen p-4 pointer-events-none">
          <div className="border-b-2 border-veganDarkGreen text-veganDarkGreen text-2xl font-bold">100% JUICE</div>
          <div className="text-veganDarkGreen"><span className="font-bold">Ingredients:</span> Orange juice from concentrate (Filtered water, and orange juice concentrate ).</div>
        </div>
        <div className="mt-72 md:mt-0">Drop an image file of an ingredients list</div>
        <div className="mb-2">or</div>
        <label className="btn btn-secondary w-fit">
          <span>{isMobile ? "A take picture of an ingredients list" : "Browse"}</span>
          <input name="image" type="file" accept="image/*" capture="environment" onChange={handleImageChange} className="absolute -z-10 w-1 h-1" />
        </label>
      </div>
      {loading ? <span className="loading loading-dots loading-lg text-secondary"></span>:<>
        {extracted ? <>
          <div className="text-2xl mt-8 mb-2">Text extracted from image</div>
          <div className="flex items-center justify-center bg-neutral-content min-h-32 border-2 border-base-300 p-2 w-full">{extracted}</div>
        </>:null}
        {results ? <>
          <div className="text-2xl mt-8 mb-2">AI results</div>
          <div className="flex items-center justify-center bg-neutral-content min-h-32 border-2 border-base-300 p-2">
            {loading ? <span className="loading loading-dots loading-lg text-secondary"></span>:
              results && <p className="m-4">{results}</p>}
          </div>
          <div className="flex items-center justify-center text-primary mt-4">Your image won&#39;t always be read correctly and AI can be wrong. Always verify results!</div>
        </>:null}
      </>
      }
    </div>
  </>
}