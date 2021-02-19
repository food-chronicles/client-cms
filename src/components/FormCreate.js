import React, { useState } from "react";
import QRCode from "qrcode.react";

function FormCreate() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [inputList, setInputList] = useState([]);
  const [idQRCode, setIdQRCode] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveClick = (e, index) => {
    e.preventDefault();
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    setInputList([...inputList, { key: "", value: "" }]);
  };

  function handleCreate(e) {
    e.preventDefault();
    let additionalInfo = {};
    let isDuplicate = false;
    inputList.forEach((item) => {
      if (!additionalInfo[item.key]) {
        additionalInfo[item.key] = item.value;
      } else {
        isDuplicate = true;
      }
    });
    if (!isDuplicate) {
      let payload = { name, amount, ...additionalInfo };
      console.log(payload);
      setIdQRCode("123456");
    } else {
      console.log("duplicate key");
    }
  }

  return (
    <div>
      <form className="flex flex-col">
        <div className="flex flex-row mb-4 justify-between">
          <label className="form-text mr-2 font-bold text-lg" htmlFor="name">
            Name
          </label>
          <input
            className="border border-blue-400 rounded-md py-2 px-3 text-grey-darknest"
            onChange={handleName}
            type="text"
            name="username"
            id="username"
            required
          />
        </div>

        <div className="flex flex-row mb-4 justify-between">
          <label className="form-text mr-3 font-bold text-lg" htmlFor="amount">
            Amount
          </label>
          <input
            className="border border-blue-400 rounded-md py-2 px-3 text-grey-darknest"
            onChange={handleAmount}
            type="number"
            name="amount"
            id="amount"
            required
          />
        </div>
        {inputList.map((x, i) => {
          return (
            <div key={i}>
              <div className="flex flex-row mb-4 justify-between align-middle">
                <input
                  className="border border-blue-400 rounded-md py-2 px-3 mr-2 text-grey-darknest"
                  name="key"
                  placeholder="Enter Title"
                  value={x.firstName}
                  onChange={(e) => handleInputChange(e, i)}
                  required
                />
                <input
                  className="border border-blue-400 rounded-md py-2 px-3 mr-2 text-grey-darknest"
                  name="value"
                  placeholder="Enter Information"
                  value={x.lastName}
                  onChange={(e) => handleInputChange(e, i)}
                  required
                />
                <div className="self-center">
                  <button
                    className="border rounded-md border-blue-400 py-1 px-3 mr-1"
                    onClick={(e) => handleRemoveClick(e, i)}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="">
          <button
            className="border rounded-md border-blue-400 py-1 px-3 m-4 "
            onClick={(e) => handleAddClick(e)}
          >
            +
          </button>
          <button
            onClick={handleCreate}
            className="button-form py-2 px-4 rounded-lg"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
      {idQRCode && (
        <div>
          <p>Your QR Code:</p>
          <div className="flex justify-center mx-auto m-5">
            <QRCode value={idQRCode} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FormCreate;
