import React from "react";
import { Button, Ripple } from "./Components";

function Slide({ img, children }: { img: string; children: React.ReactNode }) {
  const slideRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <button
        ref={slideRef}
        style={{
          overflow: "hidden",
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "12rem",
          position: "relative",
          borderRadius: "8px",
        }}
        onClick={(e) => {
          Ripple(e, slideRef.current!, "#FFFFFF");
        }}
      >
        <p className="text-white absolute start-4 bottom-4">{children}</p>
      </button>
    </>
  );
}

export default function App() {
  const searchRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      {/* Sidebar (Mobile) */}
      {/* TODO: */}

      {/* Header */}
      <header className="bg-[#FFF9F3] p-8 w-full">
        <div className="flex justify-between items-center">
          {/* <img src="Logo.svg" alt="Depository logo" className="h-8" /> */}
          {/* TODO: Toggle sidebar for mobile */}
          <h1 className="text-primary font-bold text-2xl">Depository</h1>

          {/* These are put on sidebar on mobile */}
          <div className="flex items-center space-x-2">
            {/* <span className="hidden lg:block"><Button color="primary" textColor="white">Bantuan</Button></span> */}
            <Button img="Person.svg">
              <span className="hidden lg:block">Akun</span>
            </Button>
            <Button img="Bag.svg">
              <span className="hidden lg:block">Belanja</span>
            </Button>
          </div>
        </div>

        <br />

        <div className="flex space-x-4">
          <Button color="white" img="Filter.svg" />
          <form
            className="flex w-full items-center px-4 py-2 space-x-4 bg-white rounded-full hover:cursor-text text-sm relative"
            // onClick={(e) => {
            //   if (!categoryRef.current?.contains(e.target as Node)) {
            //     searchRef.current?.focus();
            //   }
            // }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchRef}
              type="text"
              placeholder="Cari produk..."
              className="px-4 py-2 border-0 rounded-full focus:outline-none w-full"
            />

            <img
              src="Search.svg"
              alt="Search icon"
              className="size-6 opacity-50 absolute end-4"
            />
          </form>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full flex justify-center p-8">
        <div className="container">
          {/* Slides */}
          <div className="grid grid-cols-12">
            {[
              {
                img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1298&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                text: "Fashion dan Sepatu",
              },

              {
                img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                text: "Perabotan Interior",
              },

              {
                img: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                text: "Seni dan Dekorasi",
              },
            ].map((item, index) => (
              <div className="me-2 col-span-12 lg:col-span-4">
                <Slide key={index} img={item.img}>
                  {item.text}
                </Slide>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className=""></footer>
    </>
  );
}
