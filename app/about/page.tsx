import React from 'react';

export default function page() {
  return <section className="text-lg">
      <h1 className="text-6xl mt-48 mb-2 font-bold text-veganLightGreen">About</h1>
      <p>Is That Vegan is a free tool that helps determine whether food ingredients are vegan using AI and image parsing. AI-generated results may not always be accurate, so always verify ingredient information independently.</p>

      <h2 className="text-2xl mt-4 mb-0 font-bold text-veganLightGreen">Attribution</h2>
      <p>No attribution is required for using this tool.</p>

      <h2 className="text-2xl mt-4 mb-0 font-bold text-veganLightGreen">Privacy</h2>
      <p>We do not store, track, or share any of your data. However, when you submit an image, it is parsed using tesseract.js to extract the text. The extracted text is processed using Groq AI, which has its own privacy policy. To learn more about their data handling, see their privacy policy <a className="underline text-veganLightGreen" href="https://groq.com/privacy-policy/">here</a>.</p>

      <h2 className="text-2xl mt-4 mb-0 font-bold text-veganLightGreen">Copyright</h2>
      <p>The code for this tool is open source and licensed under the MIT License.</p>
      <p>The plant SVGs for the design can be found <a className="underline text-veganLightGreen" href="https://www.figma.com/community/file/1126755378374434524" target="_blank">here</a> and licensed by <a className="underline text-veganLightGreen" href="https://creativecommons.org/licenses/by/4.0/">CC 4.0 BY</a>.</p>
    </section>
}