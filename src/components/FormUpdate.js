import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { createBlockchain } from "../store/actions/blockchainAction";

function FormCreate() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [isDuplicateKey, setIsDuplicateKey] = useState(false);
  const [inputList, setInputList] = useState([]);
  const dispatch = useDispatch();
  const { blockchainDetail, qrCodeLink, isLoading, error } = useSelector(
    (state) => state.blockchain
  );

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
    // let isDuplicate = false;

    if (!name) {
      return setNameError(true);
    } else {
      setNameError(false);
    }

    if (!amount) {
      return setAmountError(true);
    } else {
      setAmountError(false);
    }

    setIsDuplicateKey(false);

    inputList.forEach((item) => {
      if (!additionalInfo[item.key]) {
        additionalInfo[item.key] = item.value;
      } else {
        setIsDuplicateKey(true);
      }
    });

    if (!isDuplicateKey) {
      setNameError(false);
      setAmountError(false);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let payload = {
              name,
              data: {
                amount,
                ...additionalInfo,
              },
              position: position.coords,
            };
            dispatch(createBlockchain(payload));
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        console.log("Please allow browser to access location");
      }
    } else {
      console.log("duplicate keys");
    }
  }

  return (
    <div className="max-w-md mx-auto flex justify-center p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
      {!qrCodeLink && <form className="flex flex-col">
        <div className="flex flex-row mb-4 justify-between">
          <label className="form-text mr-2 font-bold text-lg" htmlFor="name">
            Name
          </label>
          <div>
            <input
              className="border border-blue-400 rounded-md py-2 px-3 text-grey-darknest"
              onChange={handleName}
              type="text"
              name="username"
              id="username"
              required
            />
            {nameError && <p className="text-red-500">Name must be filled</p>}
          </div>
        </div>

        <div className="flex flex-row mb-4 justify-between">
          <label className="form-text mr-3 font-bold text-lg" htmlFor="amount">
            Amount
          </label>
          <div>
            <input
              className="border border-blue-400 rounded-md py-2 px-3 text-grey-darknest"
              onChange={handleAmount}
              type="number"
              name="amount"
              id="amount"
              required
            />
            {amountError && (
              <p className="text-red-500">Amount must be filled</p>
            )}
          </div>
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
      </form>}
      {qrCodeLink && (
        <div>
          <p>Your QR Code:</p>
          <div className="flex justify-center mx-auto m-5">
            <QRCode value={qrCodeLink} />
          </div>
          <p>Unique key to update:</p>
          <p>{blockchainDetail.chain[blockchainDetail.chain.length-1].key}</p>
          
        </div>
      )}
    </div>
  );
}

export default FormCreate;
