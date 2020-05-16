import React, { Component } from "react";
import axios from "axios";
import m_ticket_logo from "../logos/m_ticket_logo.svg";
import food_logo from "../logos/food_logo.svg";
import Navbar from "./navbarBookByShow";
class BookMovie extends Component {
  state = {
    Movie: {},
    genres: [],
    activeBtn: 0,
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    prices: ["0-100", "100-200", "200-300", "More Than 300"],
    showtimes: ["Morning", "Afternoon", "Evening", "Night"],
    selectedPrices: [],
    selectedShowtimes: [],
  };
  async componentDidMount() {
    //console.log(this.props);
    const { city } = this.props.match.params;
    //console.log(city);
    let { id } = this.props.match.params;
    //console.log(id);
    let { data: Movie } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/" +
        city +
        "/" +
        id
    );
    let genres = Movie.genre.split(",");
    this.setState({ Movie, genres });
  }
  handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { currentTarget: input } = e;
      let path = "/movies";
      let q = "?q=" + input.value;
      const { city } = this.props.match.params;
      if (city) path = path + "/" + city;
      this.props.history.push({ pathname: path, search: q });
    }
  };
  handleDates = (day) => {
    let d = new Date();
    let { months } = this.state;
    if (day === 0) {
      return d.getDate() + " Today";
    } else {
      return d.getDate() + day + " " + months[d.getMonth()];
    }
  };
  handleActiveBtn = (btn) => {
    this.setState({ activeBtn: btn });
  };
  /*makeCbStructure(array, selectedOpt) {
    let temp = array.map((n1) => ({
      name: n1,
      isSelected: false,
    }));
    let cname = selectedOpt.split(",");
    for (let i = 0; i < cname.length; i++) {
      let obj = temp.find((n1) => n1.name === cname[i]);
      if (obj) obj.isSelected = true;
    }
    return temp;
  }*/
  handleChange = (e) => {
    const { currentTarget: input } = e;
    let { selectedPrices, selectedShowtimes } = this.state;
    console.log(input.name, input.value, input.id);
    if (input.name === "price") {
      if (input.checked) {
        selectedPrices.push(input.id);
      } else {
        selectedPrices = selectedPrices.filter((val) => val !== input.id);
      }
    } else if (input.name === "showtime") {
      if (input.checked) {
        selectedShowtimes.push(input.id);
      } else {
        selectedShowtimes = selectedShowtimes.filter((val) => val !== input.id);
      }
    }
    this.setState({ selectedPrices, selectedShowtimes });
  };
  filterMovieTimings = (movie) => {
    let { activeBtn, selectedPrices } = this.state;
    for (let i = 0; i < selectedPrices.length; i++) {
      if (selectedPrices[i] === "0-100") {
        movie["showTiming"][activeBtn] = movie["showTiming"][activeBtn].map(
          (showT) =>
            showT
              ? (showT = {
                  name: showT.name,
                  timings: showT["timings"].filter(
                    (m) => m.price < 100 && m.price > 0
                  ),
                })
              : ""
        );
      } else if (selectedPrices[i] === "100-200") {
        movie["showTiming"][activeBtn] = movie["showTiming"][activeBtn].map(
          (showT) =>
            showT
              ? (showT = {
                  name: showT.name,
                  timings: showT["timings"].filter(
                    (m) => m.price < 200 && m.price >= 100
                  ),
                })
              : ""
        );
      } else if (selectedPrices[i] === "200-300") {
        movie["showTiming"][activeBtn] = movie["showTiming"][activeBtn].map(
          (showT) =>
            showT
              ? (showT = {
                  name: showT.name,
                  timings: showT["timings"].filter(
                    (m) => m.price <= 300 && m.price >= 200
                  ),
                })
              : ""
        );
      } else if (selectedPrices[i] === "More Than 300") {
        movie["showTiming"][activeBtn] = movie["showTiming"][activeBtn].map(
          (showT) =>
            showT
              ? (showT = {
                  name: showT.name,
                  timings: showT["timings"].filter((m) => m.price > 300),
                })
              : ""
        );
      }
    }
    return movie;
  };
  handleSelectTime = (show, index) => {
    const { Movie, activeBtn } = this.state;
    let showIndex = Movie["showTiming"][activeBtn].findIndex(
      (val) => val.name === show.name
    );
    const { city, id } = this.props.match.params;
    this.props.history.push({
      pathname:
        "/bookMovie/" +
        city +
        "/" +
        id +
        "/buyTicket" +
        "/" +
        showIndex +
        "/" +
        index +
        "/" +
        activeBtn,
      search: "time= " + this.handleDates(activeBtn),
    });
  };
  render() {
    let {
      Movie,
      genres,
      activeBtn,
      showtimes,
      prices,
      selectedPrices,
      selectedShowtimes,
    } = this.state;
    let tempMovie = Object.assign({}, Movie);
    let movie = Object.assign({}, tempMovie);
    // let priceCheckbox = this.makeCbStructure(prices, selectedPrices);
    //let showtimeCheckbox = this.makeCbStructure(showtimes, selectedShowtimes);
    /*if(selectedShowtimes.length>0)
    {
      for(let i=0;i<selectedShowtimes.length;i++)
      {
        movie=movie.filter(mov=>mov)
      }
    }*/
    //console.log(movie["showTiming"]);
    //console.log(movie["showTiming"][0].timings);
    if (selectedPrices.length > 0 && movie) {
      movie = this.filterMovieTimings(movie);
    } else {
      movie = Object.assign({}, tempMovie);
    }
    // console.log(movie);
    //console.log(Movie);
    let btnClass = "btn btn-sm btn-light m-1 ";
    return (
      <React.Fragment>
        <Navbar handleSearch={this.handleSearch} />
        <div className="container-fluid">
          <div className="row bg-secondary text-white pt-4">
            <div className="col">
              <h3>{movie.title}</h3>
            </div>
          </div>
          <div className="row bg-secondary text-white">
            <div className="col">
              <i className="fa fa-heart" style={{ color: "#d6181f" }} />
              &nbsp;
              <span style={{ fontSize: "20px" }}>
                <strong>{movie.rating}</strong>
              </span>
              &nbsp; &nbsp;
              <span className="circle">{genres[0]}</span>
              &nbsp; &nbsp;
              <span className="circle">{genres[1]}</span>
            </div>
          </div>
          <div className="row bg-secondary text-white">
            <div className="col">
              <span style={{ fontSize: "12px" }}>{movie.votes} votes</span>
            </div>
          </div>
          <div className="row bg-light pt-2 pb-2">
            <div className="col-lg-5">
              <button
                className={
                  btnClass + (activeBtn === 0 ? "btn-outline-primary" : "")
                }
                onClick={() => this.handleActiveBtn(0)}
              >
                {this.handleDates(0)}
              </button>
              <button
                className={
                  btnClass + (activeBtn === 1 ? "btn-outline-primary" : "")
                }
                onClick={() => this.handleActiveBtn(1)}
              >
                {this.handleDates(1)}
              </button>
              <button
                className={
                  btnClass + (activeBtn === 2 ? "btn-outline-primary" : "")
                }
                onClick={() => this.handleActiveBtn(2)}
              >
                {this.handleDates(2)}
              </button>
            </div>
            <div className="col-lg-2 border-right d-none d-lg-block">
              <div className="dropdown">
                <div className="dropbtn1">
                  Filter Price &nbsp;
                  <span>
                    <i
                      className="fa fa-chevron-down"
                      id="onhover"
                      style={{ fontSize: "10px", color: "light-grey" }}
                    />
                  </span>
                </div>
                <div className="dropdown-content">
                  <div>
                    <form>
                      {prices.map((price) => (
                        <div className="form-check ml-1" key={price}>
                          <input
                            type="checkbox"
                            id={price}
                            name="price"
                            onChange={this.handleChange}
                            className="form-check-input"
                          />
                          <label htmlFor={price} className="form-check-label">
                            {"Rs. " + price}
                          </label>
                        </div>
                      ))}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 border-right d-none d-lg-block">
              <div className="dropdown">
                <div className="dropbtn1">
                  Showtimes &nbsp;
                  <span>
                    <i
                      className="fa fa-chevron-down"
                      id="onhover"
                      style={{ fontSize: "10px", color: "light-grey" }}
                    />
                  </span>
                </div>
                <div className="dropdown-content">
                  <div>
                    <form>
                      {showtimes.map((showtime) => (
                        <div className="form-check ml-1" key={showtime}>
                          <input
                            type="checkbox"
                            id={showtime}
                            name="showtime"
                            onChange={this.handleChange}
                            className="form-check-input"
                          />
                          <label
                            htmlFor={showtime}
                            className="form-check-label"
                          >
                            {showtime}
                          </label>
                        </div>
                      ))}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 col-12">
              <div className="row" style={{ backgroundColor: "#f5bfa9" }}>
                <div className="col-lg-6 col-6 border-right">
                  <div className="row ml-1">
                    <span className="logo nav-item">
                      <img src={m_ticket_logo} alt="M-Ticket" />
                    </span>
                  </div>
                  <div className="row ml-1" style={{ fontSize: "10px" }}>
                    <span>M-Ticket Available</span>
                  </div>
                </div>
                <div className="col-lg-6 col-6 border-right">
                  <div className="row ml-1">
                    <span className="logo nav-item">
                      <img src={food_logo} alt="Food_logo" />
                    </span>
                  </div>
                  <div className="row ml-1" style={{ fontSize: "10px" }}>
                    <span>Food Available</span>
                  </div>
                </div>
              </div>
              <div>
                {movie["showTiming"]
                  ? movie["showTiming"][activeBtn].map((show) =>
                      show.timings.length > 0 ? (
                        <div
                          className="row border-bottom-1 pt-1 m-2"
                          key={show.name + show.timings.length}
                        >
                          <div className="col-lg-1 col-1">
                            <i className="fa fa-heart-o" />
                          </div>
                          <div
                            className="col-lg-3 col-6"
                            style={{ fontSize: "12px" }}
                          >
                            <div className="row">
                              <strong>{show.name}</strong>
                            </div>
                            <div className="row">
                              <span className="logo nav-item">
                                <img src={m_ticket_logo} alt="" />
                                M-Ticket
                              </span>
                              &nbsp;&nbsp;
                              <span className="logo nav-item">
                                <img src={food_logo} alt="" />
                                F&B
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-7 col-12">
                            {show.timings.map((time, index) => (
                              <React.Fragment key={time.name + time.price}>
                                <button
                                  className="btn btn-outline-secondary text-primary btn-sm border-muted m-1"
                                  style={{
                                    marginBottom: "12px",
                                    maxHeight: "40px",
                                    fontSize: "12px",
                                  }}
                                  onClick={() =>
                                    this.handleSelectTime(show, index)
                                  }
                                >
                                  <span
                                    data-toggle="tooltip"
                                    title={time.price}
                                  >
                                    {time.name}
                                  </span>
                                </button>
                              </React.Fragment>
                            ))}
                            <ul style={{ fontSize: "12px" }}>
                              <li>Cancellation Available</li>
                            </ul>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </div>
            </div>
            <div className="col-2 mt-1 d-none d-lg-block">
              <img
                src="https://i.ibb.co/JqbbCJz/1331654202504679967.jpg"
                className="img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BookMovie;
