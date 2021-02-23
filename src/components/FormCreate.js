import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import { createBlockchain } from "../store/actions/blockchainAction";
import { storage } from "../firebase";
import { successToaster, errorToaster } from "../utils/toaster";

function FormCreate() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
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

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (!image) {
      errorToaster("Missing field!", "Please choose your image file first");
    } else {
      const uploadTask = storage
        .ref(`images/${localStorage.access_token + image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error, "ini error upload image");
        },
        () => {
          storage
            .ref("images")
            .child(localStorage.access_token + image.name)
            .getDownloadURL()
            .then((url) => {
              setImageUrl(url);
              successToaster("Upload success", "Your image has been saved");
            });
        }
      );
    }
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
      return errorToaster("Missing field!", "Product name is required");
    }

    if (!amount) {
      return errorToaster("Missing field!", "Amount is required");
    }

    if (!imageUrl) {
      return errorToaster("Missing field!", "Image must be uploaded");
    }

    setIsDuplicateKey(false);

    inputList.forEach((item) => {
      if (!additionalInfo[item.key]) {
        additionalInfo[item.key] = item.value;
      } else {
        setIsDuplicateKey(true);
      }
    });

    if (isDuplicateKey) {
      return errorToaster("Oops!", "Duplicate entry titles");
    }

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
              image_url: imageUrl,
              position: position.coords,
            };
            dispatch(createBlockchain(payload));
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        return errorToaster(
          "Oops!",
          "Please allow browser to access location info"
        );
      }
    }
  }

  return (
    <div>
      {!qrCodeLink && (
        <form className="flex flex-col">
          <div className="flex flex-col md:flex-row mb-4 items-center justify-between">
            <label className="form-text mr-2 font-bold text-lg" htmlFor="name">
              Name
            </label>
            <div className="justify-center">
              <input
                className="border border-blue-400 w-full rounded-md py-2 px-3 text-grey-darknest"
                onChange={handleName}
                type="text"
                name="username"
                id="username"
                required
              />
              {nameError && <p className="text-red-500">Name must be filled</p>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-4 items-center justify-between">
            <label
              className="form-text mr-3 font-bold text-lg"
              htmlFor="amount"
            >
              Amount
            </label>
            <div>
              <input
                className="border border-blue-400 w-full rounded-md py-2 px-3 text-grey-darknest"
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
          <div className="flex flex-col md:flex-row items-center justify-between">
            <label className="form-text mr-3 font-bold text-lg" htmlFor="image">
              Image
            </label>
            <div>
              <input
                className="border border-blue-400 w-full rounded-md py-2 px-3 text-grey-darknest"
                onChange={handleImage}
                type="file"
                name="image"
                id="image"
                required
              />
            </div>
            <button
              onClick={handleImageUpload}
              className="border rounded-md border-blue-400 py-1 px-3 m-4 self-center"
            >
              Upload
            </button>
          </div>
          <div className="m-4 flex justify-center">
            <progress value={uploadProgress} max="100" />
          </div>
          {inputList.map((x, i) => {
            return (
              <div key={i}>
                <div className="flex flex-col md:flex-row mb-4 items-center justify-between align-center">
                  <input
                    className="border border-blue-400 w-full mt-2 rounded-md py-2 px-3 mr-2 text-grey-darknest"
                    name="key"
                    placeholder="Enter Title"
                    value={x.firstName}
                    onChange={(e) => handleInputChange(e, i)}
                    required
                  />
                  <input
                    className="border border-blue-400 w-full mt-2 rounded-md py-2 px-3 mr-2 text-grey-darknest"
                    name="value"
                    placeholder="Enter Information"
                    value={x.lastName}
                    onChange={(e) => handleInputChange(e, i)}
                    required
                  />
                  <div className="self-center">
                    <button
                      className="border rounded-md border-blue-400 mt-2 py-1 px-3 mr-1"
                      onClick={(e) => handleRemoveClick(e, i)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <p className="">
            <button
              className="border w-20 h-10 sm:h-10 sm:w-10 rounded-md border-blue-400 py-1 px-3 m-4 "
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
          </p>
        </form>
      )}
      {qrCodeLink && (
        <div>
          <p>Your QR Code:</p>
          <div className="flex justify-center mx-auto m-5">
            <QRCode value={qrCodeLink} />
          </div>
          <p>Unique key to update:</p>
          <p>{blockchainDetail.chain[blockchainDetail.chain.length - 1].key}</p>
        </div>
      )}
    </div>
  );
}

export default FormCreate;
