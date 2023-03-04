import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useAccount } from 'wagmi'

const NewPost = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { address, isConnecting, isDisconnected } = useAccount()

  async function onSubmit(formData) {
    console.log("newpost submit", formData);
    const dataToPin = JSON.stringify({
      pinataContent: {
        title: formData.title,
        text: formData.text,
      },
    });
    const pinataJWT = process.env.PINATA_JWT
    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiNDU0MDJkZS1hMGI1LTQxMjUtYjk2ZC0yZWEwMjE3OTJlNjQiLCJlbWFpbCI6ImJoYXZ5YUBjb2luZmVlZHMuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNTkwYTZkZWYwNGUwZjI2OTUyZGUiLCJzY29wZWRLZXlTZWNyZXQiOiI4MWNiMDMwNDU3NjljODI3MmQ5ODY0OWRiYWZjNDUwNTMxOWU1NGM4MGU1MWMwYjY4YmE4M2UyYTFkMjZiZWQ0IiwiaWF0IjoxNjc3ODcyNzIyfQ.T6z09Y6DmIoVl9po9m5DozIVe-i-lXprionx9AfTHlY",
      },
      data: dataToPin,
    };
    await fetch(config.url, config)
      .then((response) => response.json())
      .then((result) => {
        console.log('address', address)
        console.log("result from pinning", result);
      })
    //pin json to pinata/ipfs
    //get resulting hash
    //call YourContract to add new post

    // const { config } = usePrepareContractWrite({
    //   //change to our contract
    //   address: "",
    //   abi: "",
    //   functionName: "publishPost",
    //   args: [formData.title, formData.text],
    // });
    // const { data, isLoading, isSuccess, write } = useContractWrite(config);

    //what contract to add new post?
  }

  return (
    <>
      <NavBar activePage={"newpost"} />
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto px-2 max-w-lg">
          <p className="text-2xl text-center">New Post</p>
          {/* post title */}
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 pt-4">
            Title
          </label>
          <div className="mt-2 pb-8">
            <input
              name="title"
              id="title"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              {...register("title", { required: true })}
            />
          </div>
          {errors.title && <span className="block">This field is required</span>}
          {/* post text */}
          <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
            Body
          </label>
          <div className="mt-2 pb-8">
            <textarea
              name="text"
              id="text"
              rows={6}
              cols={50}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              {...register("text", { required: true })}
            />
          </div>
          {errors.text && <span className="block">This field is required</span>}
          <div className="mx-auto w-fit">
            <button className="btn btn-primary" type="submit">
              Add this post
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewPost;
