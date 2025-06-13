import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

const CountriesList = ({ query }) => {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    const data = await fetch("https://restcountries.com/v3.1/independent");
    const json = await data.json();
    setCountries(json);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (!countries.length) {
    return <CountriesListShimmer />;
  }

  return (
    <div className="countries-container">
      {countries
        .filter(
          (country) =>
            country.name.common.toLowerCase().includes(query) ||
            country.region.toLowerCase().includes(query)
        )
        .map((country) => (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            flag={country.flags.svg}
            population={country.population}
            region={country.region}
            capital={country.capital}
            data={country}
          />
        ))}
    </div>
  );
};

export default CountriesList;
