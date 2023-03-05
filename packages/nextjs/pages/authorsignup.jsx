import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import deployYourContract from "../../hardhat/deploy/00_deploy_your_contract";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";

const AuthorSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { address, isConnecting, isDisconnected } = useAccount()

  // const { config } = usePrepareContractWrite({
  //   //change to our contract
  //   address: address,
  //   abi: '',
  //   functionName: "feed",
  // });
  // const { data, isLoading, isSuccess, write } = useContractWrite(config);

  async function onSubmit(data) {
    console.log("data in author signup", data);
    await deployYourContract(address, data.name, Number(data.price), data.publicationName)
    const deployer = address
    const authorsContract = await ethers.getContract("YourContract", deployer);
    console.log('authorsContract', authorsContract)

    //call YourContract to add new author

    //take resulting data, call AuthorsContract
    // const { config } = usePrepareContractWrite({
    //   //change to our contract
    //   address: '',
    //   abi: '',
    //   functionName: "addAuthor",
    //   args: ['author name', 'author address']
    // });
    // const { data, isLoading, isSuccess, write } = useContractWrite(config);

  }

  return (
    <>
      <NavBar activePage={"authorsignup"} />
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mx-auto px-2 max-w-lg">
          <p className="text-2xl text-center">Author Signup</p>
          {/* author name */}
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 pt-4">
            Your Name
          </label>
          <div className="mt-2 pb-8">
            <input
              name="name"
              id="name"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && <span className="block">This field is required</span>}
          {/* publication name */}
          <label htmlFor="publication-name" className="block text-sm font-medium leading-6 text-gray-900">
            Publication Name
          </label>
          <div className="mt-2 pb-8">
            <input
              name="publication-name"
              id="publication-name"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              {...register("publicationName", { required: true })}
            />
          </div>
          {errors.publicationName && <span className="block">This field is required</span>}
          {/* name */}
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Subscription Price
          </label>
          <div className="mt-2 pb-8">
            <input
              name="price"
              id="price"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              {...register("price", { required: true })}
            />
          </div>
          {errors.price && <span className="block">This field is required</span>}
          <div className="mx-auto w-fit">
            <button className="btn btn-primary" type="submit" disabled={ !address || errors.name || errors.price || errors.subscriptionName }>
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AuthorSignup;
