import FormUpdate from "../components/FormUpdate";
import QrReader from "react-qr-reader";
import { useState } from "react";

function Scan() {
  const [result, setResult] = useState("No result");
  const [key, setKey] = useState("");
  const [validated, setValidated] = useState(false);

  const handleScan = (data) => {
    if (data) setResult(data);
  };

  const handleKey = (e) => {
    setKey(e.target.value);
  };

  const handleKeySubmit = (e) => {
    e.preventDefault()
    setValidated(true);
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
      <div className={validated ? "grid grid-cols-1 lg:grid-cols-2" : ""}>
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
            <form onSubmit={handleKeySubmit}>
              <div className="flex flex-row mb-4 justify-center">
                <label
                  className="form-text mr-2 font-bold text-lg self-center"
                  htmlFor="name"
                >
                  Key
                </label>
                <input
                  className="border border-blue-400 rounded-md py-2 px-3 text-grey-darknest"
                  onChange={handleKey}
                  placeholder="Insert unique key"
                  value={key}
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

        {validated && (
          <div className="mx-auto max-w-lg p-6 bg-gray-100 my-10 rounded-lg shadow-xl">
            <FormUpdate />
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
}

export default Scan;
