'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { requestGroq } from '@/app/actions/actions';

export default function ImageUploader() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

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
        setText("");

        try {
            const { data: { text } } = await Tesseract.recognize( imageUrl, 'eng' );
            const messageFromGroq = await requestGroq(text);

            setText(`${messageFromGroq.choices[0].message.content}`);
        } catch (error) {
            console.error('Error performing OCR:', error);
            setText('Error extracting text');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center w-full text-center text-base-content'>
            <div onDrop={handleDrop} onDragOver={handleDragOver} className='p-4 m-4 mt-20 cursor-pointer bg-base-200 border-dashed border-2 border-base-300 w-96 min-w-fit'>
                <div>Drop and image file here</div>
                <div className='mb-2'>or</div>
                <label className='btn btn-secondary'>
                    <span>Browse</span>
                    <input name='image' type='file' accept='image/*' capture='environment' onChange={handleImageChange} className='absolute -z-10 w-1 h-1' />
                </label>
            </div>

            <div className='flex items-center justify-center bg-neutral-content min-h-32 mt-20 w-[90%] border-2 border-base-300'>
                {loading ? (<span className="loading loading-dots loading-lg text-secondary"></span>) : (text && <p className='m-4'>{text}</p>)}
            </div>
        </div>
    );
}