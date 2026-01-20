import React from "react";

function Page2() {
  return (
    <div className="min-h-screen flex  items-center justify-center bg-red-200 p-4">
      
      {/* MAIN WRAPPER */}
      <div className="w-96 max-w-4xl">

        {/* 01 */}
        <div className="order-1 w-full p-6 bg-white text-center">
          <h1 className="text-2xl font-bold">01</h1>
        </div>

        {/* GRID START */}
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* LEFT COLUMN */}
          <div className="flex flex-col">

            <div className="order-2 bg-gray-500 h-12 flex items-center justify-center text-white ">
              02
            </div>

            <div className="order-4 bg-pink-200 h-36 flex items-center justify-center ">
              04
            </div>

            <div className="order-6 bg-green-200 h-20 flex items-center justify-center ">
              06
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col">

            <div className="order-3 bg-orange-500 h-32 flex items-center justify-center text-white ">
              03
            </div>

            <div className="order-5 bg-red-700 h-12 flex items-center justify-center text-white ">
              05
            </div>

            {/* NESTED GRID */}
            <div className="order-7 grid grid-cols-1 sm:grid-cols-2">
              <div className="bg-yellow-500 h-24 flex items-center justify-center text-white ">
                07
              </div>
              <div className="bg-pink-600 h-24 flex items-center justify-center text-white ">
                08
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Page2;


