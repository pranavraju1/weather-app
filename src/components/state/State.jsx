import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Doughnuts from "../doughnut/Doughnut";

const State = () => {
  const [state, setState] = useState([]);
  const [nchartData, setnChartData] = useState(null);
  const [schartData, setsChartData] = useState(null);
  const nlabels = [];
  const ndata = [];
  const slabels = [];
  const sdata = [];
  const fetchData = async (place) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=d0708f31eafc28b957db3c332fbde63f&q=${place}`;
    try {
      const res = await axios.get(url);
      console.log(place, res.data);
      let name = res.data.name;
      let temp = Math.floor(kelvinToCelsius(res.data.main.temp));
      if (
        name === "Kolkata" ||
        name === "Delhi" ||
        name === "Jaipur" ||
        name === "Lucknow" ||
        name === "Indore" ||
        name === "Surat"
      ) {
        nlabels.push(name);
        ndata.push(temp);
      } else {
        slabels.push(name);
        sdata.push(temp);
      }
      let humidity = res.data.main.humidity;
      let weather = res.data.weather[0].description;
      let obj = { name, temp, humidity, weather };
      // Update state with the new object
      setState((prevState) => [...prevState, obj]);
    } catch (error) {
      // Handle error
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

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273;
  };

  useEffect(() => {
    // fetchData("mumbai");
    // fetchData("Bengaluru");
    // fetchData("kolkata");
    // fetchData("goa");
    // fetchData("kerala");
    // fetchData("chennai");
    // fetchData("delhi");
    // fetchData("lucknow");
    // fetchData("jaipur");
    // fetchData("indore");
    // fetchData("hyderabad");
    // fetchData("surat");
    getChartData(nlabels, sdata);
    getSChartdata(slabels, sdata);
  }, []);

  function getChartData(lable, data) {
    if (lable) {
      setnChartData({
        labels: lable,
        datasets: [
          {
            label: "Temp in C",
            data: ndata,
            backgroundColor: [
              "black",
              "pink",
              "red",
              "green",
              "blue",
              "orange",
            ],
            borderColor: ["black"],
            hoverOffset: 4,
          },
        ],
      });
    }
  }
  function getSChartdata(lable, data) {
    if (lable) {
      setsChartData({
        labels: lable,
        datasets: [
          {
            label: "Temp in C",
            data: sdata,
            backgroundColor: [
              "red",
              "pink",
              "black",
              "orange",
              "blue",
              "green",
            ],
            borderColor: ["black"],
          },
        ],
      });
    }
  }

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log("North data", nchartData);
  }, [nchartData]);

  function tempColor(givenState) {
    var foundItem = state.find((item) => item.name === givenState);
    if (foundItem) {
      if (foundItem.temp >= 30) {
        return { backgroundColor: "red" };
      } else if (foundItem.temp < 30 && foundItem.temp >= 25) {
        return { backgroundColor: "pink" };
      } else if (foundItem.temp < 25 && foundItem.temp >= 20) {
        return { backgroundColor: "aqua" };
      } else if (foundItem.temp < 20) {
        return { backgroundColor: "rgba(0, 0, 255, 0.543)" };
      }
    } else {
      return { backgroundColor: "gray" };
    }
  }

  function toolInfo(item) {
    return (
      <>
        <div>
          Temp: <strong>{item.temp} C</strong>
          <br />
          Humidity: <strong>{item.humidity}</strong>
          <br />
          Weather: <strong>{item.weather}</strong>
        </div>
      </>
    );
  }

  return (
    <div className="Scontainer">
      <div className="states">
        <div className="colu1">
          <OverlayTrigger
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-top`}>
                {state &&
                  state.map((item, index) => {
                    if (item.name === "Delhi") {
                      return (
                        <React.Fragment key={index}>
                          {toolInfo(item)}
                        </React.Fragment>
                      );
                    } else {
                      return null;
                    }
                  })}
              </Tooltip>
            }
          >
            <div style={state && tempColor("Delhi")}>New Delhi</div>
          </OverlayTrigger>
          <OverlayTrigger
            placement={"bottom"}
            overlay={
              <Tooltip id={`tooltip-top`}>
                {state &&
                  state.map((item, index) => {
                    if (item.name === "Kolkata") {
                      return (
                        <React.Fragment key={index}>
                          {toolInfo(item)}
                        </React.Fragment>
                      );
                    } else {
                      return null;
                    }
                  })}
              </Tooltip>
            }
          >
            <div style={state && tempColor("Kolkata")}>Kolkata</div>
          </OverlayTrigger>
        </div>
        <div className="colu2">
          <OverlayTrigger
            placement={"top"}
            overlay={
              <Tooltip id={`tooltip-top`}>
                {state &&
                  state.map((item, index) => {
                    if (item.name === "Mumbai") {
                      return (
                        <React.Fragment key={index}>
                          {toolInfo(item)}
                        </React.Fragment>
                      );
                    } else {
                      return null;
                    }
                  })}
              </Tooltip>
            }
          >
            <div style={state && tempColor("Mumbai")}>Mumbai</div>
          </OverlayTrigger>
          <OverlayTrigger
            placement={"bottom"}
            overlay={
              <Tooltip id={`tooltip-top`}>
                {state &&
                  state.map((item, index) => {
                    if (item.name === "Kerala") {
                      return (
                        <React.Fragment key={index}>
                          {toolInfo(item)}
                        </React.Fragment>
                      );
                    } else {
                      return null;
                    }
                  })}
              </Tooltip>
            }
          >
            <div style={state && tempColor("Kerala")}>Kerala</div>
          </OverlayTrigger>
        </div>
        <div className="colu3">
          <div className="colu3r1">
            <OverlayTrigger
              placement={"top"}
              overlay={
                <Tooltip id={`tooltip-top`}>
                  {state &&
                    state.map((item, index) => {
                      if (item.name === "Bengaluru") {
                        return (
                          <React.Fragment key={index}>
                            {toolInfo(item)}
                          </React.Fragment>
                        );
                      } else {
                        return null;
                      }
                    })}
                </Tooltip>
              }
            >
              <div style={state && tempColor("Bengaluru")}>Bengaluru</div>
            </OverlayTrigger>
            <OverlayTrigger
              placement={"top"}
              overlay={
                <Tooltip id={`tooltip-top`}>
                  {state &&
                    state.map((item, index) => {
                      if (item.name === "Goa") {
                        return (
                          <React.Fragment key={index}>
                            {toolInfo(item)}
                          </React.Fragment>
                        );
                      } else {
                        return null;
                      }
                    })}
                </Tooltip>
              }
            >
              <div style={state && tempColor("Goa")}>Goa</div>
            </OverlayTrigger>
          </div>
          <div className="colu3r2">
            <div className="colu3r2c1">
              <div>
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      {state &&
                        state.map((item, index) => {
                          if (item.name === "Surat") {
                            return (
                              <React.Fragment key={index}>
                                {toolInfo(item)}
                              </React.Fragment>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </Tooltip>
                  }
                >
                  <div style={state && tempColor("Surat")}>Surat</div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      {state &&
                        state.map((item, index) => {
                          if (item.name === "Hyderabad") {
                            return (
                              <React.Fragment key={index}>
                                {toolInfo(item)}
                              </React.Fragment>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </Tooltip>
                  }
                >
                  <div style={state && tempColor("Hyderabad")}>Hyderabad</div>
                </OverlayTrigger>
              </div>
              <div>
                <OverlayTrigger
                  placement={"bottom"}
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      {state &&
                        state.map((item, index) => {
                          if (item.name === "Jaipur") {
                            return (
                              <React.Fragment key={index}>
                                {toolInfo(item)}
                              </React.Fragment>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </Tooltip>
                  }
                >
                  <div style={state && tempColor("Jaipur")}>Jaipur</div>
                </OverlayTrigger>
                <OverlayTrigger
                  placement={"bottom"}
                  overlay={
                    <Tooltip id={`tooltip-top`}>
                      {state &&
                        state.map((item, index) => {
                          if (item.name === "Lucknow") {
                            return (
                              <React.Fragment key={index}>
                                {toolInfo(item)}
                              </React.Fragment>
                            );
                          } else {
                            return null;
                          }
                        })}
                    </Tooltip>
                  }
                >
                  <div style={state && tempColor("Lucknow")}>Lucknow</div>
                </OverlayTrigger>
              </div>
            </div>
            <div className="colu3r2c2">
              <OverlayTrigger
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    {state &&
                      state.map((item, index) => {
                        if (item.name === "Chennai") {
                          return (
                            <React.Fragment key={index}>
                              {toolInfo(item)}
                            </React.Fragment>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </Tooltip>
                }
              >
                <div style={state && tempColor("Chennai")}>Chennai</div>
              </OverlayTrigger>
              <OverlayTrigger
                placement={"bottom"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    {state &&
                      state.map((item, index) => {
                        if (item.name === "Indore") {
                          return (
                            <React.Fragment key={index}>
                              {toolInfo(item)}
                            </React.Fragment>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </Tooltip>
                }
              >
                <div style={state && tempColor("Indore")}>Indore</div>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
      <div className="details">
        <div>
          <h1>
            <u>
              <b>North India Temp</b>
            </u>
          </h1>
          {nchartData && <Doughnuts chartdata={nchartData} />}
        </div>
        <div>
          <h1>
            <u>
              <b>South India Temp</b>
            </u>
          </h1>
          {schartData && <Doughnuts chartdata={schartData} />}
        </div>
      </div>
    </div>
  );
};

export default State;
