import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";

const people = [
  {
    name: 'Lindsay Walton',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80',
  },
  // More people...
]
const activityItems = [
  { id: 1, person: people[0], project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
  // More items...
]


const NewPost = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <>
<<<<<<< HEAD
    <NavBar />
    <div>New Post</div>
    <div>
      <ul role="list" className="divide-y divide-gray-200">
        {activityItems.map((activityItem) => (
          <li key={activityItem.id} className="py-4">
            <div className="flex space-x-3">
              <img className="h-6 w-6 rounded-full" src={activityItem.person.imageUrl} alt="" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{activityItem.person.name}</h3>
                  <p className="text-sm text-gray-500">{activityItem.time}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Deployed {activityItem.project} ({activityItem.commit} in master) to {activityItem.environment}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
=======
      <NavBar activePage={"newpost"}/>
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
>>>>>>> cd580d9 (New author and new post form skeletons, nav bar shows active page)
    </>
  );
};

export default NewPost;
