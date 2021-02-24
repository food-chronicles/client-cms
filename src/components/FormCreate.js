import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlockchain,
  resetQRCodeLink,
} from "../store/actions/blockchainAction";
import { storage } from "../firebase";
import { successToaster, errorToaster } from "../utils/toaster";
import Lottie from "lottie-react";
import LoadingBall from "../assets/4316-loading-gaocaisheng.json";

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

    if (amount <= 0) {
      setAmount(1);
      return errorToaster("Faulty!", "Amount must be bigger than 0");
    }

    if (!imageUrl) {
      return errorToaster("Missing field!", "Image must be uploaded");
    }
    console.log("lolos dan cek duplicate key");

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
      console.log(isDuplicateKey, "ini setelah ecek status duplicate");
      if (navigator.geolocation) {
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position, "masuk nih");
            let payload = {
              name,
              data: {
                amount,
                ...additionalInfo,
              },
              image_url: imageUrl,
              position: position.coords,
            };
            // console.log(payload, "ini payload nya");
            dispatch(createBlockchain(payload));
          },
          (err) => {
            // console.log("gagal nih");
            console.log(err);
            errorToaster(
              "Oops!",
              "Please allow browser to access location info"
            );
          },
          { timeout: 10000 }
        );
      } else {
        return errorToaster(
          "Oops!",
          "Please allow browser to access location info"
        );
      }
    }
  }

  function handleCreateAnother() {
    setName("");
    setAmount("");
    setImage(null);
    setImageUrl("");
    setUploadProgress(0);
    setIsDuplicateKey(false);
    setInputList([]);
    dispatch(resetQRCodeLink());
  }

  const style = {
    height: 200,
    width: 200,
  };
  // console.log(isLoading, 'status loading')

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center">
        <Lottie animationData={LoadingBall} style={style} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>{JSON.stringify(error)}</p>;
      </div>
    );
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
                value={amount}
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
          {uploadProgress !== 0 && (
            <div className="m-4 flex gap-4 justify-center">
              <progress value={uploadProgress} max="100" />
              <small>Upload Progress: {uploadProgress}%</small>
            </div>
          )}
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
          <h1 className="text-md">Your QR Code:</h1>
          <div className="flex justify-center mx-auto m-5">
            <QRCode value={qrCodeLink} />
          </div>
          <h1 className="text-md">Unique key to update:</h1>
          <p className="text-lg italic font-bold">
            {blockchainDetail.chain[blockchainDetail.chain.length - 1].key}
          </p>
          <h1 className="text-md my-5">
            We've also sent this information to your email
          </h1>
          <button onClick={handleCreateAnother} className="button-form py-2 px-4 rounded-lg">
            Create another entry
          </button>
        </div>
      )}
    </div>
  );
}

export default FormCreate;
