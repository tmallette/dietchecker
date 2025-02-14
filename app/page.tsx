import ImageUploader from './components/ImageUploader';

export default function Home() {
  return <section className="flex flex-col items-center">
    <h1 className="text-6xl mt-48 md:mt-12 mb-16 font-bold text-veganLightGreen z-50">Is this vegan?</h1>
    <ImageUploader />
  </section>
}