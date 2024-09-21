import React from 'react';

const AppForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-[#f1f8ff] shadow-lg rounded-lg w-4/5 p-6 mt-8 mb-24">
        <div className="flex justify-between items-center my-16">
          <h1 className="text-4xl font-bold text-blue-900">Upgrade Your Account</h1>
          <div className="w-1/3 text-right">
            <div className="text-xs text-left text-blue-900">1 of 5 Completed</div>
            <div className="h-3 w-full border-solid border-2 rounded-full">
              <div className="h-2 w-1/5 bg-blue-900 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-24">
          {["Application date", "Tax residency", "Identity card", "Investibility", "Review"].map((item, index) => (
            <div key={index} className="flex items-center mx-8">
              <div className={`h-8 w-8 flex items-center justify-center rounded-full border-solid border-2  ${item === "Application date" ? "border-[#2152df]" : "border-gray-600"}`}>
                {item === "Application date" && <span className="text-blue"> <svg class="  w-6 h-6 text-[#2152df] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>

                </span>}
              </div>
              <span className={`ml-2 ${item === "Application date" ? "text-[#2152df]" : "text-gray-600"}`}>{item}</span>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">Application Data</h2>
        <p className="text-lg font-bold text-center text-blue-900">Please take a salfie with your document so that it's clearly</p>
        <p className="text-lg font-bold text-center mb-12 text-blue-900">visible anddoses not cover your face</p>

        <form className='px-32'>
          {["First and Last Name", "Email", "Phone", "Education", "Company Name", "Address Line", "City", "State", "Postcode", "Company Number"].map((placeholder, index) => (
            <div className="mb-4" key={index}>
              <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-[#cbe6fb] placeholder-blue-900 border border-gray-300 p-2 rounded"
              />
            </div>
          ))}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Company Number"
              className="flex-1 bg-[#cbe6fb] placeholder-blue-900 border border-gray-300 p-2 rounded mr-2"
            />
            <select className="flex-1 bg-[#cbe6fb] text-blue-900 border border-gray-300 p-2 rounded">
              <option value="">Select Country</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-blue-900">Show Country?</label>
            <div className="flex items-center">
              <label className="mr-2 text-blue-900">Yes</label>
              <input type="radio" name="yes_no" value="yes" className="mr-4" />
              <label className="mr-2 text-blue-900">No</label>
              <input type="radio" name="yes_no" value="no" />
            </div>
          </div>
        </form>
        <div className="flex items-end mb-4">
            <img src="https://png.pngtree.com/png-clipart/20230914/original/pngtree-student-at-desk-clipart-cartoon-vector-boy-sitting-at-his-desk-png-image_12147939.png" alt="Cartoon" className="h-1/3 w-1/3 mr-4" />
            <button className="ml-auto bg-blue-900 text-white px-12 py-2 rounded">Next</button>
          </div>
      </div>
    </div>
  );
};

export default AppForm;