import { HiChevronDown, HiSearch } from "react-icons/hi";
const SearchBox = ({ countries, onChange }) => {
 

  return (
    <div className="pt-7">
      <form className="relative">
        <div className="flex items-center">
          <span className="absolute left-0 pl-4">
            <HiSearch className="h-6 w-6 text-gray-500" />
          </span>

          <input
            type="text"
            list="citynames"
            className="w-full h-12 pl-12 pr-12 rounded-full text-gray-700 bg-white focus:outline-none"
            onChange={onChange}
            placeholder="Search..."
          />
          <datalist id="citynames" className="absolute w-full bg-white shadow-md rounded-lg mt-1 z-10">
            {countries.map((country) => (
              <option key={country.code} value={country.name} />
            ))}
          </datalist>

          <span className="absolute top-1/2 transform -translate-y-1/2 right-0 pr-4">
            <HiChevronDown className="h-6 w-6 text-gray-500" />
          </span>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
