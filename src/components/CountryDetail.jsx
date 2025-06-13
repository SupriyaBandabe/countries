import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";

import "./CountryDetail.css";
import { Link } from "react-router-dom";
import CountryDetailShimmer from "./CountryDetailShimmer";
import { useTheme } from "../utils/useTheme";

const CountryDetail = () => {
  const params = useParams();
  const { state } = useLocation();
  const countryName = params.country;
  const [isDark] = useTheme();

  const [countryDetails, setcountryDetails] = useState(null);

  const updateCountryDetail = (json) => {
    setcountryDetails({
      name: json.name.common,
      nativeName: Object.values(json.name.nativeName)[0].common,
      population: json.population.toLocaleString("en-IN"),
      region: json.region,
      subregion: json.subregion,
      capital: json.capital,
      flag: json.flags.svg,
      tld: json.tld,
      languages: Object.values(json.languages).join(", "),
      currencies: Object.values(json.currencies)
        .map((currency) => currency.name)
        .join(", "),
      borders: [],
    });

    if (!json.borders) {
      json.borders = [];
    }

    Promise.all(
      json.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) =>
      setcountryDetails((prevState) => ({ ...prevState, borders }))
    );
  };

  useEffect(() => {
    if (state) {
      updateCountryDetail(state);
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([json]) => {
        updateCountryDetail(json);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, [countryName]);

  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>

        {countryDetails === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-details">
            <img
              src={countryDetails.flag}
              alt={`${countryDetails.name} flag`}
            />
            <div className="details-text-container">
              <h1>{countryDetails.name}</h1>
              <div className="details-text">
                <p>
                  <b>
                    Native Name:
                    {countryDetails.nativeName || countryDetails.name}
                  </b>
                  <span className="native-name"></span>
                </p>
                <p>
                  <b>
                    Population:
                    {countryDetails.population}
                  </b>
                  <span className="population"></span>
                </p>
                <p>
                  <b>Region: {countryDetails.region}</b>
                  <span className="region"></span>
                </p>
                <p>
                  <b>Sub Region: {countryDetails.subregion}</b>
                  <span className="sub-region"></span>
                </p>
                <p>
                  <b>Capital: {countryDetails.capital?.join(", ")}</b>
                  <span className="capital"></span>
                </p>
                <p>
                  <b>Top Level Domain: {countryDetails.tld}</b>
                  <span className="top-level-domain"></span>
                </p>
                <p>
                  <b>Currencies: {countryDetails.currencies}</b>
                  <span className="currencies"></span>
                </p>
                <p>
                  <b>Languages: {countryDetails.languages}</b>
                  <span className="languages"></span>
                </p>
              </div>
              {countryDetails.borders.length !== 0 && (
                <div className="border-countries">
                  <b>Border Countries: </b>&nbsp;
                  {countryDetails.borders.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CountryDetail;
