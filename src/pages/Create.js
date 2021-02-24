import FormCreate from "../components/FormCreate";
import fc_logo_md from "../assets/fc_logo_md.png";

function Create() {
  return (
    <div className="container mx-auto p-6 text-center">
      <div className="flex justify-center">
        <img src={fc_logo_md} className="w-96" alt="logo"></img>
      </div>
      <h2 className="text-lg">Create new entry</h2>
      <div className="mx-auto max-w-xl p-6 bg-gray-100 my-10 rounded-lg shadow-xl">
        <div className="pt-1 flex-grow">
          <FormCreate />
        </div>
      </div>
    </div>
  );
}

export default Create;
