import React, { useEffect, useState } from "react";
import { Card, Form, FormControl, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { format, formatRelative, subDays, subMinutes } from "date-fns";

export default function Front() {
  const [location, setLocation] = useState({
    input: "",
  });

  const [weatherdata, setWeatherdata] = useState({
    coord: {},
    weather: [{}],
    base: "",
    main: {},
    visibility: null,
    wind: {},
    clouds: {
      all: null,
    },
    dt: null,
    sys: {},
    timezone: 0,
    id: null,
    name: null,
    cod: null,
  });

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fetchWeather = async () => {
    if (location.input.length > 0) {
      try {
        let response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${location.input}&APPID=d8c1d59ba76391993c1907b87e3a58e5&units=metric`
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

  const onChangeHandler = (value) => {
    setLocation({
      input: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
    fetchWeather();
    setLocation({
      input: "",
    });
  };

  useEffect(() => {
    console.log("mounted!!!!!!");
    fetchWeather();
  }, [weatherdata]);

  return (
    <Card className="cardOuter">
      {/* Search Area */}
      <div className="cardImageFront">
        <Form onSubmit={onSubmitHandler}>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text
                id="inputGroup-sizing-sm"
                className="bgNone searchIcon text-white mt-5 ml-3"
              >
                <Search />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              className="bgNone searchInputField mt-5 mr-3 text-white"
              placeholder="Search for location"
              value={location.input}
              onChange={(e) => onChangeHandler(e.target.value)}
            />
          </InputGroup>
        </Form>
        {/* Date */}
        <div>
          <h2>{weatherdata.name}</h2>
          <h3 className="text-white mt-4">
            {Capitalize(
              formatRelative(
                subDays(new Date(), 0),
                subMinutes(new Date(), weatherdata.timezone / 60)
              )
            )}
          </h3>
          <h6 className="text-white">{format(new Date(), "do MMMM yyyy")}</h6>
        </div>
        {/* Degrees */}
        <div>
          <h1 className="degreesH1 mt-4 mb-0 ">{weatherdata.main.temp}°C</h1>
          <p className="feelsLike my-0">
            Feels like {weatherdata.main.feels_like}°C
          </p>
        </div>
      </div>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
