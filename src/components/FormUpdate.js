import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlockchain } from "../store/actions/blockchainAction";
import { useParams } from "react-router-dom";
import { storage } from "../firebase";
import { successToaster, errorToaster } from "../utils/toaster";
import Lottie from "lottie-react";
import LoadingBall from "../assets/4316-loading-gaocaisheng.json";

const style = {
  height: 500,
  width: 500,
};

function FormUpdate() {
  const dispatch = useDispatch();
  const params = useParams();
  const blockchainId = params.id;

  const [uniqueKey, setUniqueKey] = useState("");
  const [UniqueKeyError, setUniqueKeyError] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDuplicateKey, setIsDuplicateKey] = useState(false);
  const [inputList, setInputList] = useState([]);
  const [toggleUpdateForm, setToggleUpdateForm] = useState(false);

  const { blockchainDetail, qrCodeLink, isLoading, error } = useSelector(
    (state) => state.blockchain
  );

  const handleKey = (e) => {
    setUniqueKey(e.target.value);
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

  function handleUpdate(e) {
    e.preventDefault();
    let additionalInfo = {};

    if (!uniqueKey) {
      return errorToaster("Missing field!", "Key is required");
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
      setUniqueKeyError(false);
      setAmountError(false);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let payload = {
              key: uniqueKey,
              data: {
                amount,
                ...additionalInfo,
              },
              image_url: imageUrl,
              position: position.coords,
            };
            dispatch(updateBlockchain(blockchainId, payload));
            console.log(payload);
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

  function handleCancel(e) {
    e.preventDefault();
    setUniqueKey("");
    setAmount("");
    setUploadProgress(0);
    setInputList([]);
    setToggleUpdateForm(false);
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center h-screen">
        <p>
          <Lottie animationData={LoadingBall} style={style} />;
        </p>
        ;
      </div>
    );
  }
  return (
    <>
      {!toggleUpdateForm && (
        <button
          className="button-form p-2 my-2 rounded-md"
          onClick={() => setToggleUpdateForm(!toggleUpdateForm)}
        >
          Update
        </button>
      )}
      {toggleUpdateForm && (
        <div className="max-w-xl mx-auto flex justify-center p-6 bg-gray-100 my-10 rounded-lg shadow-xl">
          <form className="flex flex-col">
            <div className="flex flex-col md:flex-row mb-4 items-center justify-between">
              <label className="form-text mr-2 font-bold text-lg" htmlFor="key">
                Key
              </label>
              <div>
                <input
                  className="border border-blue-400 w-full rounded-md py-2 px-3 text-grey-darknest"
                  onChange={handleKey}
                  value={uniqueKey}
                  type="text"
                  name="key"
                  id="key"
                  required
                />
                {UniqueKeyError && (
                  <p className="text-red-500">Name must be filled</p>
                )}
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

            <div className="flex flex-col md:flex-row mb-4 items-center justify-between">
              <label
                className="form-text mr-3 font-bold text-lg"
                htmlFor="image"
              >
                Image
              </label>
              <div>
                <input
                  className="border border-blue-400  w-full rounded-md py-2 px-3 text-grey-darknest"
                  onChange={handleImage}
                  type="file"
                  name="image"
                  id="image"
                  required
                />
                {/* {amountError && (
                <p className="text-red-500">Amount must be filled</p>
              )} */}
              </div>
              <button
                onClick={handleImageUpload}
                className="border rounded-md border-blue-400 py-1 px-3 md:m-4 mt-4  self-center"
              >
                Upload
              </button>
            </div>

            {uploadProgress!== 0 && <div className="mb-4 flex gap-4 justify-center">
            <progress value={uploadProgress} max="100" />
            <small>Upload Progress: {uploadProgress}%</small>
          </div>}

            {inputList.map((x, i) => {
              return (
                <div key={i}>
                  <div className="flex flex-col md:flex-row mb-4 items-center justify-between align-center">
                    <input
                      className="border border-blue-400 w-full mb-2 rounded-md py-2 px-3 mr-2 text-grey-darknest"
                      name="key"
                      placeholder="Enter Title"
                      value={x.firstName}
                      onChange={(e) => handleInputChange(e, i)}
                      required
                    />
                    <input
                      className="border border-blue-400  w-full mb-2 rounded-md py-2 px-3 mr-2 text-grey-darknest"
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
                className="border w-20 h-10 sm:h-10 sm:w-10 rounded-md border-blue-400 py-1 px-3 m-4 "
                onClick={(e) => handleAddClick(e)}
              >
                +
              </button>
              <button
                onClick={handleUpdate}
                className="button-form py-2 px-4 rounded-lg m-4"
                type="submit"
              >
                Update
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white py-2 px-4 my-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default FormUpdate;
