import React, { Component } from "react";
import axios from "axios";
import screen_logo from "../logos/screen_logo.svg";
class BookSeat extends Component {
  state = {
    Seats: [],
    Movie: {},
    tickets: [],
    countTicket: 0,
    showName: 0,
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
  };
  async componentDidMount() {
    const { city, id, showName, showTime, dateId } = this.props.match.params;
    let { data: Movie } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/" +
        city +
        "/" +
        id
    );
    let { data: Seats } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/seats"
    );
    this.setState({
      Movie,
      showName,
      showTime,
      dateId,
      Seats,
    });
  }
  handleDates = (day) => {
    let d = new Date();
    let hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let postFix = d.getHours() > 12 ? "PM" : "AM";
    let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    let time = hours + ":" + minutes + " " + postFix;
    let { months } = this.state;
    if (+day === 0) {
      return d.getDate() + " Today, " + time;
    } else {
      return d.getDate() + +day + " " + months[d.getMonth()] + ", " + time;
    }
  };
  handleActiveSeatList = () => {
    let { showTime } = this.state;
    return showTime % 3;
  };
  handleShowTime = async (showTime) => {
    let { data: Seats } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/seats"
    );
    this.setState({ Seats, showTime, tickets: [], countTicket: 0 });
  };
  selectSeat = (rowName, price, index) => {
    let Seats = [...this.state.Seats];
    let { showTime, tickets } = this.state;
    let seatIndex = Seats[showTime % 3].seats.findIndex(
      (seat) => seat.rowName === rowName
    );
    if (Seats[showTime % 3].seats[seatIndex].seatList[index].booked === false) {
      Seats[showTime % 3].seats[seatIndex].seatList[index].booked = true;
      let seatNo = Seats[showTime % 3].seats[seatIndex].seatList[index].seatNo;
      let ticket = { name: rowName + seatNo, price: price };
      tickets.push(ticket);
    } else {
      Seats[showTime % 3].seats[seatIndex].seatList[index].booked = false;
      let seatNo = Seats[showTime % 3].seats[seatIndex].seatList[index].seatNo;
      let ticket = { name: rowName + seatNo, price: price };
      tickets = tickets.filter((tick) => tick.name !== ticket.name);
    }
    this.setState({ Seats, tickets, countTicket: tickets.length });
  };
  countTicketsPrice() {
    let { tickets } = this.state;
    let totalPrice = 0;
    for (let i = 0; i < tickets.length; i++) {
      totalPrice = totalPrice + tickets[i].price;
    }
    return totalPrice;
  }
  async bookTickets() {
    let d = new Date();
    let date = "";
    let { showTime, tickets, Movie, dateId, showName, months } = this.state;
    let totalTickets = [];
    let amount = this.countTicketsPrice();
    for (let i = 0; i < tickets.length; i++) {
      totalTickets.push(tickets[i].name);
    }
    let title = Movie.title;
    let movieHall = Movie["showTiming"][dateId][showName].name;
    let time = Movie["showTiming"][dateId][showName].timings[showTime].name;
    if (+dateId === 0) {
      date = d.getDate() + " Today";
    } else {
      date = d.getDate() + " " + months[d.getMonth()];
    }
    await axios.post(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/seat",
      {
        title,
        movieHall,
        tickets: totalTickets,
        amount,
        time,
        date,
      }
    );
    this.props.history.push({ pathname: "/payments" });
  }
  render() {
    let { Movie, showName, showTime, dateId, countTicket, Seats } = this.state;
    let ReclinerSeats = [];
    let GoldSeats = [];
    if (Seats.length > 0) {
      ReclinerSeats = Seats[this.handleActiveSeatList()].seats.filter(
        (seat) => seat.price >= 420
      );
      GoldSeats = Seats[this.handleActiveSeatList()].seats.filter(
        (seat) => seat.price < 420
      );
    }
    return (
      <div className="containe-fluid">
        <div className="row bg-dark pt-1 pb-3">
          <div
            className="col-lg-6  col-md-12 col-sm-12 text-left text-white"
            style={{ fontSize: "25px" }}
          >
            {Movie["showTiming"] ? (
              <div className="row">
                <div className="col-lg-1 col-md-1 col-2  pt-2">
                  <a onClick={() => this.props.history.goBack()}>
                    <i className="fa fa-chevron-left" />
                  </a>
                </div>
                <div className="col-lg-11 col-md-4 col-7">
                  <div className="row">
                    <span>{Movie.title}</span>
                  </div>
                  <div className="row" style={{ fontSize: "15px" }}>
                    {Movie["showTiming"][dateId][showName].name}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="col-lg-6 text-right text-white d-none d-lg-block">
            <div className="row pt-3 pr-3">
              <div className="col" style={{ fontSize: "12px" }}>
                {countTicket + " Tickets"} &nbsp;&nbsp;&nbsp;&nbsp;
                <a onClick={() => this.props.history.goBack()}>
                  <i className="fa fa-times" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row  pt-3 pb-3"
          style={{ backgroundColor: "#f5f5fa", fontSize: "14px" }}
        >
          <div className="col">
            <div className="row ml-2">
              <div className="col-lg-6 col-12 ml-1 text-center text-lg-left text-md-left">
                {this.handleDates(dateId)}
              </div>
            </div>
            {Movie["showTiming"] ? (
              <div className="row ml-2">
                <div className="col">
                  {Movie["showTiming"][dateId][showName].timings.map(
                    (timing, index) => (
                      <button
                        className={
                          +showTime === index
                            ? "btn btn-md btn btn-outline-success m-1 active"
                            : "btn btn-md btn btn-outline-success m-1"
                        }
                        style={{ fontSize: "12px" }}
                        key={timing.name}
                        onClick={() => this.handleShowTime(index)}
                      >
                        {timing.name}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="row pb-2 ml-4 mr-4 no-gutters">
          <div className="col text-secondary text-left border-bottom ml-5">
            {ReclinerSeats.length > 0
              ? "RECTLINER-" + ReclinerSeats[0].price
              : ""}
          </div>
        </div>
        {Seats.length > 0 ? (
          <div>
            {ReclinerSeats.map((rSeats) => (
              <div key={rSeats.rowName}>
                <div className="row ml-4 mr-4 no-gutters">
                  <div className="col-1 text-right mr-1">{rSeats.rowName}</div>
                  <div className="col-10">
                    {rSeats.seatList.map((st, index) => (
                      <div
                        className={
                          st.available
                            ? st.booked
                              ? "cell bg-success border d-flex justify-content-center"
                              : "cell border d-flex justify-content-center"
                            : " border d-flex justify-content-center bg-secondary text-white"
                        }
                        style={{
                          margin: "2px",
                          fontSize: "12px",
                          float: "left",
                          width: "22px",
                          height: "22px",
                          borderRadius: "5px",
                        }}
                        onClick={() =>
                          this.selectSeat(rSeats.rowName, rSeats.price, index)
                        }
                        key={st.seatNo}
                      >
                        {st.seatNo}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <br />
        <div className="row pb-2 ml-4 mr-4">
          <div className="col text-secondary text-left border-bottom ml-5">
            {GoldSeats.length > 0 ? "GOLD-" + GoldSeats[0].price : ""}
          </div>
        </div>
        {GoldSeats.length > 0 ? (
          <div>
            {GoldSeats.map((rSeats) => (
              <div className="row ml-4 mr-4 no-gutters" key={rSeats.rowName}>
                <div className="col-1 text-right mr-1">{rSeats.rowName}</div>
                <div className="col-3">
                  {rSeats.seatList.map((st, index) =>
                    st.seatNo < 8 ? (
                      <div
                        className={
                          st.available
                            ? st.booked
                              ? "cell bg-success border d-flex justify-content-center"
                              : "cell border d-flex justify-content-center"
                            : " border d-flex justify-content-center bg-secondary text-white"
                        }
                        style={{
                          margin: "2px",
                          fontSize: "12px",
                          float: "left",
                          width: "22px",
                          height: "22px",
                          borderRadius: "5px",
                        }}
                        onClick={() =>
                          this.selectSeat(rSeats.rowName, rSeats.price, index)
                        }
                        key={st.seatNo}
                      >
                        {st.seatNo}
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
                <div className="col-4">
                  {rSeats.seatList.map((st, index) =>
                    7 < st.seatNo && st.seatNo < 19 ? (
                      <div
                        className={
                          st.available
                            ? st.booked
                              ? "cell bg-success border d-flex justify-content-center"
                              : "cell border d-flex justify-content-center"
                            : " border d-flex justify-content-center bg-secondary text-white"
                        }
                        style={{
                          margin: "2px",
                          fontSize: "12px",
                          float: "left",
                          width: "22px",
                          height: "22px",
                          borderRadius: "5px",
                        }}
                        onClick={() =>
                          this.selectSeat(rSeats.rowName, rSeats.price, index)
                        }
                        key={st.seatNo}
                      >
                        {st.seatNo}
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
                <div className="col-3">
                  {rSeats.seatList.map((st, index) =>
                    18 < st.seatNo ? (
                      <div
                        className={
                          st.available
                            ? st.booked
                              ? "cell bg-success border d-flex justify-content-center"
                              : "cell border d-flex justify-content-center"
                            : " border d-flex justify-content-center bg-secondary text-white"
                        }
                        style={{
                          margin: "2px",
                          fontSize: "12px",
                          float: "left",
                          width: "22px",
                          height: "22px",
                          borderRadius: "5px",
                        }}
                        onClick={() =>
                          this.selectSeat(rSeats.rowName, rSeats.price, index)
                        }
                        key={st.seatNo}
                      >
                        {st.seatNo}
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        <br />
        <div className="row">
          <div className="col text-center">
            <span>
              <img src={screen_logo} alt="" />
            </span>
            <br />
            <span style={{ fontSize: "12px" }}>All Eyes This Way Please</span>
          </div>
        </div>
        {countTicket > 0 ? (
          <div className="row fixed-bottom">
            <div className="col-3"></div>
            <div className="col-lg-4 col-6 ml-3 mr-2 text-center">
              <button
                className="btn btn-primary btn-block btn-md"
                onClick={() => this.bookTickets()}
              >
                Pay Rs.{this.countTicketsPrice()}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default BookSeat;
