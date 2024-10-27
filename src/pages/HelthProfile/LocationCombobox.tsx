import React, { useState} from "react";
import ReactCountryFlag from "react-country-flag";
interface LocationComboboxProps {
  value: string;
  onChange: (value: string) => void;
}
const countries = [
  { code: "GB", name: "England" },
  { code: "US", name: "USA" },
  { code: "DE", name: "Germany" },
  // Add more countries as needed
];

const LocationCombobox: React.FC<LocationComboboxProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
  };

  return (
    <div className="relative z-[999]">
      <label className="block mb-2 text-xs text-primary-text">
        Location:
      </label>
      <div
      
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between  border border-main-border rounded-md px-4 py-2 bg-white dark:bg-black-secondary dark:text-secondary-text cursor-pointer"
      >
        <button  className=" text-xs text-left">
          {value || "Choose"}
        </button>
        <img
          className={`${isOpen && "rotate-180"} transition-transform`}
          src="./Themes/Aurora/icons/chevron-down.svg"
          alt=""
        />
      </div>
      {isOpen && (
        <ul           
        className="absolute z-[999] rounded-md rounded-tl-none rounded-tr-none  w-full bg-white dark:bg-black-secondary border border-main-border ">
          {countries.map((country) => (
            <li
              key={country.code}
              onClick={() => handleSelect(country.name)}
              className="flex items-center px-4 py-2 cursor-pointer text-xs font-light text-primary-text hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ReactCountryFlag
                countryCode={country.code}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  marginRight: "0.5em",
                }}
                title={country.name}
              />
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationCombobox;
