import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryData = response.data.map((country) => ({
        name: country.name.common,
        code: country.cca2.toLowerCase(),
        population: country.population,
      }));
      setCountries(countryData);
    };

    fetchCountries();
  }, []);

  return countries;
};

export default useFetchCountries;
