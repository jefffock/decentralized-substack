import NavBar from "../components/NavBar";
import AuthorList from "../components/AuthorList"

const Discover = () => {
  return (
    <>
    <NavBar activePage={"discover"}/>
    <div>Discover Authors</div>
    <div className="flex justify-center">
    <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Discover Authors</h3>
      <AuthorList />
    </div>
    </div>
    </>
  );
};

export default Discover;