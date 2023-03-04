import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";

const AuthorSignup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <NavBar activePage={"authorsignup"}/>
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && <span className="block">This field is required</span>}
          {/* substack name */}
          <label htmlFor="substack-name" className="block text-sm font-medium leading-6 text-gray-900">
            Substack Name
          </label>
          <div className="mt-2 pb-8">
            <input
              name="substack-name"
              id="substack-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              {...register("substackName", { required: true })}
            />
          </div>
          {errors.substackName && <span className="block">This field is required</span>}
          {/* name */}
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Subscription Price
          </label>
          <div className="mt-2 pb-8">
            <input
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder=""
              {...register("price", { required: true })}
            />
          </div>
          {errors.name && <span className="block">This field is required</span>}
          <div className="mx-auto w-fit">
            <button className="btn btn-primary" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AuthorSignup;
