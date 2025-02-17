export function Footer() {
  return <>
    <div className="bg-[url('/images/plant3.svg')] bg-right-bottom w-full h-[300px] bg-no-repeat pointer-events-none"></div>
    <footer className="w-full bg-base-200 py-4 z-50">
      <div className="container mx-auto text-center text-md text-gray-500">
        © {new Date().getFullYear()} Is that vegan? All rights reserved.
      </div>
    </footer>
  </>
}