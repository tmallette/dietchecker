'use client';

import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import { requestGroq } from '@/app/actions/actions';

export default function ImageUploader() {
    const [isMobile, setIsMobile] = useState(false);
    const [diet, setDiet] = useState('vegan');
    const [results, setResults] = useState('');
    const [extracted, setExtracted] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const userAgent = navigator.userAgent.toLowerCase();
          setIsMobile(/android|iPhone|iPad|iPod|opera mini|mobile|blackberry/i.test(userAgent));
        }
      }, []);

    const handleImageChange = async (ev : React.ChangeEvent<HTMLInputElement>) => {
        const file = ev?.target?.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            await performOCR(imageUrl);
        }
    };

    const handleDrop = async (ev : React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        const file = ev.dataTransfer.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            await performOCR(imageUrl);
        }
    };

    const handleDragOver = (ev : React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
    };

    const performOCR = async (imageUrl : string) => {
        setLoading(true);
        setResults("");

        let imageResults = null;

        try {
            const { data: { text } } = await Tesseract.recognize( imageUrl, 'eng' );
            imageResults = text;

            setExtracted(text);

        } catch(err) {
            setExtracted('Unable to extract text from image.');
        }

        if(imageResults && imageResults.trim() !== '~~') {
            try {
                const messageFromGroq = await requestGroq(diet, imageResults);
                setResults(`${messageFromGroq.choices[0].message.content}`);
            } catch(err) {
                setResults('Unable to retrieve data from AI.');
            } finally {
                setLoading(false);
            }
        } else {
            setExtracted('Unable to extract text from image.');
            setLoading(false);
        }
        /*try {
            const { data: { text } } = await Tesseract.recognize( imageUrl, 'eng' );
            imageResults = text;

            
            const messageFromGroq = await requestGroq(text);

            setText(`${messageFromGroq.choices[0].message.content}`);
        } catch (error) {
            console.error('Error performing OCR:', error);
            setText('Error extracting text.');
        } finally {
            setLoading(false);
        }*/
    };

    const handleSelect = (ev : React.ChangeEvent<HTMLSelectElement>) => {
        const value = ev.target.value;

        setDiet(value);
    }

    const dietOptions = [{
        name: 'Vegan',
        value: 'vegan'
    },{
        name: 'Vegetarian',
        value: 'vegetarian'
    },{
        name: 'Gluten-free',
        value: 'gluten-free'
    }];

    return (
        <>
        <div className='w-full flex justify-center mt-20'>
            <select defaultValue='vegan' className="select select-primary w-full max-w-xs" onChange={handleSelect}>

                {dietOptions.map((diet)=> {
                    return (<option key={diet.value} value={diet.value}>{diet.name}</option>)
                })}
            </select>
        </div>

        <div className='flex flex-col items-center w-full text-center text-base-content'>
            <div onDrop={handleDrop} onDragOver={handleDragOver} className='p-4 m-4 mt-8 cursor-pointer bg-base-200 border-dashed border-2 border-base-300 w-[90%]'>
                <div>Drop and image file here</div>
                <div className='mb-2'>or</div>
                <label className='btn btn-secondary'>
                    <span>{isMobile ? 'A take picture' : 'Browse' }</span>
                    <input name='image' type='file' accept='image/*' capture='environment' onChange={handleImageChange} className='absolute -z-10 w-1 h-1' />
                </label>
            </div>

            {loading ? (<span className="loading loading-dots loading-lg text-secondary"></span>) : (<>
                {extracted ? (<>
                    <div className='text-2xl mt-8 mb-2'>Text extracted from image</div>
                    <div className='flex items-center justify-center bg-neutral-content min-h-32 w-[90%] border-2 border-base-300 p-2'>
                        {extracted}
                    </div>
                </>):null}

                {results ? (<>
                    <div className='text-2xl mt-8 mb-2'>AI results</div>
                    <div className='flex items-center justify-center bg-neutral-content min-h-32 w-[90%] border-2 border-base-300 p-2'>
                        {loading ? (<span className="loading loading-dots loading-lg text-secondary"></span>) : (results && <p className='m-4'>{results}</p>)}
                    </div>
                    <div className='flex items-center justify-center text-primary mt-4'>
                        Your image is read with Tesseract.js and then those results are sent to Groq AI. Your image won't always be read correctly and AI can be wrong. Always verify results.
                    </div>
                </>):null}
            </>)}
        </div>
        </>
    );
}