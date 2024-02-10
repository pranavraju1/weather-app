import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PastLine from "../lineGraphs/PastLine";
import "./home.scss";
import Button from "react-bootstrap/Button";

const Home = () => {
  const [place, setPlace] = useState("London");
  const [data, setData] = useState({});
  const [inplace, setInPlace] = useState("");
  const [tempC, setTempC] = useState({ min: 0, max: 0 });
  const [tempF, setTempF] = useState({ min: 0, max: 0 });
  const [weatherDesc, setWeatherDesc] = useState("");
  const [wind, setWind] = useState(0);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [TEMPM, setTEMPM] = useState(true);
  const [TEMPMIN, setTEMPMIN] = useState(true);

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=d0708f31eafc28b957db3c332fbde63f&q=${place}`;
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setData(res.data);
      celsius(res.data);
      farenheit(res.data);
      setWeatherDesc(() => res.data.weather[0].description);
      setWind(() => res.data.wind.speed);
      setLat(() => res.data.coord.lat);
      setLon(() => res.data.coord.lon);
    } catch (error) {
      // toast(error.code);
      toast.error(error.code, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
  };

  const fetchDaily = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d0708f31eafc28b957db3c332fbde63f`;
    try {
      const res = await axios.get(url);
      console.log(res.data);
      getDailyData(res.data);
    } catch (error) {
      toast.error(error.code, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(error);
    }
  };

  const getDailyData = (daily) => {
    let labels = [];
    let data = [];
    daily.list.forEach((item) => {
      let time = getTime(item.dt_txt);
      if (time === "12") {
        let date = item.dt_txt.slice(0, 10);
        let temp = kelvinToCelsius(Math.floor(item.main.temp));
        labels.push(date);
        data.push(temp);
      }
    });
    setChartData({
      labels: labels,
      datasets: [
        { label: "temp in Celsius", data: data, borderColor: "black" },
      ],
    });
  };

  useEffect(() => {
    console.log(chartData);
  }, [chartData]);

  const getTime = (bigTime) => {
    let time = bigTime.slice(11, 13);
    return time;
  };

  useEffect(() => {
    fetchData();
    fetchDaily();
  }, [place]);

  const handleForm = (e) => {
    e.preventDefault();
    setPlace(inplace);
  };

  const celsius = (temp) => {
    setTempC({
      max: kelvinToCelsius(Math.floor(temp.main.temp_max)),
      min: kelvinToCelsius(Math.floor(temp.main.temp_min)),
    });
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273;
  };

  const farenheit = (temp) => {
    setTempF({
      max: Math.floor(kelvinToCelsius(temp.main.temp_max) * 1.8 + 32),
      min: Math.floor(kelvinToCelsius(temp.main.temp_min) * 1.8 + 32),
    });
  };
  return (
    <div className="homeContainer">
      <ToastContainer />
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Enter location..."
          name="place"
          value={inplace}
          onChange={(e) => setInPlace(e.target.value)}
        />
        <Button type="sumbit" variant="dark">
          Search
        </Button>
      </form>
      <div className="details">
        {data && (
          <>
            <div className="temp">
              {TEMPM ? (
                <h1>
                  Maximum Temp in Celsius: <int>{tempC.max}</int>
                </h1>
              ) : (
                <h1>
                  Maximum Temp in Fahrenheit: <int>{tempF.max}</int>
                </h1>
              )}
              <Button
                style={{ fontWeight: "bold" }}
                variant="dark"
                onClick={() => setTEMPM(!TEMPM)}
                className="butto"
              >
                {TEMPM ? "Fahrenheit" : "Celsius"}
              </Button>
            </div>
            <div className="temp">
              {TEMPMIN ? (
                <h1>
                  Minimum Temp in Celsius: <int>{tempC.min}</int>
                </h1>
              ) : (
                <h1>
                  Minimum Temp in Fahrenheit: <int>{tempF.min}</int>
                </h1>
              )}
              <Button
                style={{ fontWeight: "bold" }}
                variant="dark"
                onClick={() => setTEMPMIN(!TEMPMIN)}
                className="butto"
              >
                {TEMPMIN ? "Fahrenheit" : "Celsius"}
              </Button>
            </div>
            <div>
              <h1 className="others">
                <b>
                  Weather Description: <int>{weatherDesc}</int>
                </b>
              </h1>
            </div>
            <div>
              <h1 className="others">
                <b>
                  Wind Speed: <int>{wind} m/s</int>
                </b>
              </h1>
            </div>
          </>
        )}
      </div>
      <h1 style={{ marginTop: "20px" }}>
        <b>
          <u>FORECAST</u>
        </b>
      </h1>
      {chartData && (
        <div className="past">
          <PastLine chartdata={chartData} />
        </div>
      )}
    </div>
  );
};

export default Home;
