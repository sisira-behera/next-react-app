import React, { useState } from "react";

export default function TipCalculator() {
  // 1. Initialize State
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(15); // 15% default
  const [people, setPeople] = useState(1);

  // 2. Calculate values
  const billAmount = parseFloat(bill) || 0;
  const tipTotal = billAmount * (tipPercent / 100);
  const totalBill = billAmount + tipTotal;
  const totalPerPerson = people > 0 ? totalBill / people : 0;
  const tipPerPerson = people > 0 ? tipTotal / people : 0;

  const handleReset = () => {
    setBill("");
    setTipPercent(15);
    setPeople(1);
  };

  return (
    <>
      {/* <!-- Calculator Container --> */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl m-2 overflow-hidden flex flex-col md:flex-row">
        {/* <!-- Input Section --> */}
        <div className="p-8 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            3. Tip Calculator
          </h1>

          {/* <!-- Bill Amount --> */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                $
              </span>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="0.00"
                id="bill"
                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 font-semibold"
                min="0"
              />
            </div>
          </div>

          {/* <!-- Tip Percentage --> */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Tip %
            </label>

            <div className="relative w-full max-w-xs">
              <select
                value={tipPercent}
                onChange={(e) => setTipPercent(Number(e.target.value))}
                className="w-full pl-4 pr-10 py-2.5 text-sm text-gray-800 rounded-lg border border-gray-300 appearance-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={10}>10%</option>
                <option value={15}>15%</option>
                <option value={18}>18%</option>
                <option value={20}>20%</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12l-4-4h8l-4 4z" />
                </svg>
              </div>
            </div>
          </div>

          {/* <!-- Number of People --> */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Number of People
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </span>
              <input
                type="number"
                value={people}
                onChange={(e) =>
                  setPeople(Math.max(1, parseInt(e.target.value) || 1))
                }
                min="1"
                id="people"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 font-semibold"
                placeholder="1"
              />
            </div>
          </div>
        </div>

        {/* <!-- Output/Results Section --> */}
        <div className="bg-indigo-950 p-8 w-full md:w-1/2 flex flex-col justify-between rounded-t-none rounded-3xl md:rounded-r-3xl md:rounded-l-none">
          <div>
            {/* <!-- Tip Amount --> */}
            <div className="flex justify-between items-center mb-8 border-b border-indigo-900 pb-6">
              <h2 className="text-white font-medium">Tip Amount / person</h2>{" "}
              <br />
              <div className="text-4xl font-extrabold text-indigo-400">
                <span id="tipPerPerson">${tipPerPerson.toFixed(2)}</span>
              </div>
            </div>

            {/* <!-- Total Per Person --> */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-medium">Total / person</h2> <br />
              <div className="text-4xl font-extrabold text-indigo-400">
                <span id="totalPerPerson">${totalPerPerson.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* <!-- Reset Button --> */}
          <button
            id="reset"
            onClick={handleReset}
            className="w-full mt-6 bg-indigo-800 hover:bg-indigo-700 text-indigo-200 hover:text-white transition py-4 rounded-xl font-bold tracking-wide"
          >
            RESET
          </button>
        </div>
      </div>
    </>
  );
}
