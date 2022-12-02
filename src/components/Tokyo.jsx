import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

import { format } from "date-fns";
import { addSeconds } from "date-fns/esm";

export default function Tokyo() {
  const [location, setLocation] = useState({
    input: "New york",
  });

  const [weatherdata, setWeatherdata] = useState({
    coord: {},
    weather: [{}],
    base: "",
    main: {
      temp: 0,
      feels_like: 0,
    },
    visibility: null,
    wind: {},
    clouds: {
      all: null,
    },
    dt: null,
    sys: {
      sunrise: 0,
      sunset: 0,
    },
    timezone: 0,
    id: null,
    name: null,
    cod: null,
  });

  const fetchWeather = async () => {
    if (location.input.length > 0) {
      try {
        let response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=New%20york&APPID=d8c1d59ba76391993c1907b87e3a58e5&units=metric`
        );
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          setWeatherdata(data);
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const onChangeHandler = (value) => {
  //   setLocation({
  //     input: value,
  //   });
  // };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log("submitted");
  //   fetchWeather();
  //   setLocation({
  //     input: "",
  //   });
  // };

  useEffect(() => {
    console.log("mounted!!!!!!");
    fetchWeather();
  }, []);

  const currentTime = addSeconds(new Date(), weatherdata.timezone - 3600);
  const sunset = addSeconds(currentTime, weatherdata.sys.sunrise - 18000);
  const sunrise = addSeconds(currentTime, weatherdata.sys.sunset - 3600);

  return (
    <Card className="cardOuterFixed">
      <div className="cardImageFront">
        {weatherdata.visibility ? (
          <div className="contentFixed">
            {/* Date and Location */}
            <div>
              <h2 className="locationH2">
                {weatherdata.name}, {weatherdata.sys.country}
              </h2>
              <h3 className="text-white mt-4">
                {format(currentTime, "h:mm aa")}
              </h3>
              <h6 className="text-white">
                {format(new Date(), "do MMMM yyyy")}
              </h6>
            </div>
            {/* Degrees */}
            <div className="mb-5">
              <h1 className="degreesH1 mt-4 mb-0 ">
                {weatherdata.main.temp.toFixed(1)}°C
              </h1>
              <p className="feelsLike my-0">
                Feels like {weatherdata.main.feels_like.toFixed(1)}°C
              </p>
              <p className="descriptionWeather mt-4">
                {weatherdata.weather[0].description}
              </p>
            </div>
            {/* Special Data */}
            <div className="specialData mt-2">
              <p className="pt-4 mb-0">Coordinates</p>
              <Row>
                <Col xs={6}>
                  <div>
                    <div className="term">Latitude</div>
                    <div className="valueOutput">{weatherdata.coord.lat}</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div>
                    <div className="term">Longitude</div>
                    <div className="valueOutput">{weatherdata.coord.lon}</div>
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <div className="hrLine my-3"></div>
              </div>
              <p className="mb-0">Wind</p>
              <Row>
                <Col xs={6}>
                  <div>
                    <div className="term">Degrees</div>
                    <div className="valueOutput">{weatherdata.wind.deg}°</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div>
                    <div className="term">Speed</div>
                    <div className="valueOutput">
                      {weatherdata.wind.speed} km/h
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <div className="hrLine my-3"></div>
              </div>
              <p className="mb-0">Sun</p>
              <Row className="pb-5">
                <Col xs={6}>
                  <div>
                    <div className="term">Sunrise</div>
                    <div className="valueOutput">
                      {format(sunrise, "h:mm aa")}
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div>
                    <div className="term">Sunset</div>
                    <div className="valueOutput">
                      {format(sunset, "h:mm aa")}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </Card>
  );
}
