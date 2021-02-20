import FormUpdate from "../components/FormUpdate";
import QrReader from "react-qr-reader";
import { useState } from "react";

function Scan() {
  const [result, setResult] = useState("No result");
  const [inputKey, setInputKey] = useState("");
  const [itemHistory, setItemHistory] = useState([
    {
      index: 0,
      timestamp: 0,
      data: "01/01/2017",
      previousHash: "Genesis block",
      hash: "8163cbd8feafd38a96cd193f2b44940473c22b21ddbb7445bd99ee310dac28ae",
      nonce: 0,
    },
    {
      index: 1,
      timestamp: "12/25/2017",
      key: "String",
      data: {
        name: "Biji kedelai",
        status: "Mentah",
        amount: 5,
      },
      previousHash:
        "8163cbd8feafd38a96cd193f2b44940473c22b21ddbb7445bd99ee310dac28ae",
      hash: "744ce201216f78bba5b87e371579898b97e473ac644d6a13ddda9cdbe05100f6",
      nonce: 0,
    },
    {
      index: 2,
      timestamp: "12/26/2017",
      key: "String", // Apakah diinput pada pembuatan chain pertama atau random
      data: {
        name: "Tahu",
        amount: 5,
      },
      previousHash:
        "744ce201216f78bba5b87e371579898b97e473ac644d6a13ddda9cdbe05100f6",
      hash: "9e3cf69ee7a3f3f651b33500ea3f32ccf1a13590115c6739dda74920d54702c8",
      nonce: 0,
    },
  ]);
  const [isValidated, setIsValidated] = useState(false);

  const handleScan = (data) => {
    if (data) setResult(data);
  };

  const handleInputKey = (e) => {
    setInputKey(e.target.value);
  };

  const handleInputKeySubmit = (e) => {
    e.preventDefault();
    setIsValidated(true);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="logo-fc text-2xl text-blue-700 leading-tight">
        <span className="logo-food-color">Food</span> Chronicles
      </h1>
      <h2 className="text-lg">Scan your product</h2>
      {/* <div className="flex justify-content-center "> */}
      <div className={isValidated ? "grid grid-cols-1 lg:grid-cols-2" : ""}>
        <div className="mx-auto max-w-lg p-6 bg-gray-100 my-10 rounded-lg shadow-xl">
          <QrReader
            className="justify-items-center justify-center mx-auto w-full md:w-2/3"
            delay={300}
            onError={handleError}
            onScan={handleScan}
          />
          <div className="relative bottom-10">
            <p className="inline border rounded-md px-2 py-1 bg-white text-xs">
              <span>QR Code: </span>
              {JSON.stringify(result)}
            </p>
          </div>
          <div className="">
            <form onSubmit={handleInputKeySubmit}>
              <div className="flex flex-row mb-4 justify-center">
                <label
                  className="form-text mr-2 font-bold text-lg self-center"
                  htmlFor="name"
                >
                  Key
                </label>
                <input
                  className="border border-blue-400 rounded-md py-2 px-3 text-grey-darknest"
                  onChange={handleInputKey}
                  placeholder="Insert unique key"
                  value={inputKey}
                  type="text"
                  name="key"
                  id="key"
                  required
                />
                <input
                  type="submit"
                  value="?"
                  className="border rounded-md bg-blue-400 text-white border-blue-400 py-1 px-3 mx-4"
                />
              </div>
            </form>
          </div>
        </div>

        {isValidated && (
          <div className="mx-auto max-w-lg p-6 bg-gray-100 my-10 rounded-lg shadow-xl">
            <FormUpdate />
          </div>
        )}
      </div>
      {/* </div> */}
      <div className="container mx-auto p-6 text-center">
        <div className="mx-auto max-w-lg p-6 bg-gray-100 rounded-lg shadow-xl">
          <h1 className="form-text font-bold text-lg">History</h1>
          {/* <p>{JSON.stringify(itemHistory)}</p> */}
          {itemHistory.map((history) => {
            return (
              <div className="mx-auto max-w-lg p-6 mt-4 bg-white rounded-lg shadow-xl">
                <div className="grid grid-cols-2">
                  <p>{history.timestamp ? history.timestamp : history.data}</p>
                  <div>
                    <p>{typeof history.data === "string" 
                    ? "Genesis Block"
                    : <div>
                      {
                        // JSON.stringify(Object.keys(history.data))
                        Object.keys(history.data).map(key => {
                          return (<p>{key}: {history.data[key]}</p>)
                        })
                      }
                    </div>
                    }</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Scan;
