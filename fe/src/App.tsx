import React from "react";
import { Button } from "./Components";

export default function App() {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const categoryRef = React.useRef<HTMLSelectElement>(null);

  return (
    <>
      {/* Header */}
      <header className="bg-[#FFF9F3] p-8">
        {/* Row 1 */}
        <div className="flex justify-between items-center mb-8">
          {/* <img src="Logo.svg" alt="Depository logo" className="h-8" /> */}
          <h1 className="text-primary font-bold text-2xl">Depository</h1>

          <div className="flex items-center space-x-2">
            <Button color="primary" textColor="white">
              Help
            </Button>
            <Button img="Person.svg">Account</Button>
            <Button img="Bag.svg">Shopping</Button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex space-x-4">
          <Button color="white" img="Filter.svg" />

          <form
            className="flex w-full items-center px-4 py-2 space-x-4 bg-white rounded-full hover:cursor-text text-sm relative"
            onClick={() => {
              if (!categoryRef.current?.contains(event.target)) {
                // Deprecation is just a suggestion
                searchRef.current?.focus();
              }
            }}
          >
            <select
              ref={categoryRef}
              className="px-4 py-1 bg-gray-200 border-r-[12px] border-gray-200 rounded-full focus:outline-none hover:cursor-pointer transition duration-300 hover:bg-gray-300 hover:border-gray-300"
            >
              <option value="All">All</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </select>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border-0 rounded-full focus:outline-none"
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
      <main className=""></main>

      {/* Footer */}
      <footer className=""></footer>
    </>
  );
}
