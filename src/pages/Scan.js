import QrReader from "react-qr-reader";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import fc_logo_md from "../assets/fc_logo_md.png";

function Scan() {
  const history = useHistory();
  const [result, setResult] = useState("No result");

  const handleScan = (data) => {
    if (data) {
      const id = data.split("/")[data.split("/").length - 1];
      console.log(id, "ini id nya");
      setResult(id);
      history.push("/product/" + id);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container mx-auto p-6 text-center">
      <div className="flex justify-center">
        <img src={fc_logo_md} className="w-96" alt="logo"></img>
      </div>
      {/* <h1 className="logo-fc text-2xl text-blue-700 leading-tight">
        <span className="logo-food-color">Food</span> Chronicles
      </h1> */}
      <h2 className="text-lg">Scan your product</h2>
      {/* <div className="flex justify-content-center "> */}
      <div>
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
        </div>
      </div>
    </div>
  );
}

export default Scan;
