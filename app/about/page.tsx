import React from 'react';

export default function page() {
  return (
    <section className="text-lg">
      <h1 className="text-6xl mt-48 mb-8 font-bold text-veganLightGreen">About</h1>
      <p>This site doesn&apos;t save or do anything with your data.</p>
      <p>When you upload an image, the image is fed into tesseract.js which will extract the text from the image and send it over to Groq AI to see if the ingredients are vegan.</p>
      <br />
      <p>The plant SVGs for the design can be found <a className="underline text-veganLightGreen" href="https://www.figma.com/community/file/1126755378374434524" target="_blank">here</a>.</p>
    </section>
  );
}