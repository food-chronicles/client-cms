import FormCreate from "../components/FormCreate";

function Create() {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="logo-fc text-2xl text-blue-700 leading-tight">
        <span className="logo-food-color">Food</span> Chronicles
      </h1>
      <h2 className="text-lg">Create new entry</h2>
      {/* <div className="flex justify-content-center "> */}
        <div className="max-w-lg mx-auto p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
          <div className="ml-6 pt-1 flex-grow">
            <FormCreate />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Create;
