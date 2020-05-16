import React, { Component } from "react";
import axios from "axios";
class PaymentBMS extends Component {
  state = {
    BookingDetails: {},
  };
  async componentDidMount() {
    let { data: BookingDetails } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/details"
    );
    this.setState({
      BookingDetails,
    });
  }
  render() {
    let { BookingDetails } = this.state;
    return (
      <div className="container-fluid">
        <div className="row bg-dark pt-1 pb-3">
          <div
            className="col-lg-6 col-md-4 text-left text-white"
            style={{ fontSize: "25px" }}
          >
            <div className="row">
              <div className="col-lg-1 col-2 pt-2">
                <a onClick={() => this.props.history.goBack()}>
                  <i className="fa fa-chevron-left" />
                </a>
              </div>
              <div className="col-lg-11 col-10">
                <div className="row">
                  <span>{BookingDetails.title}</span>
                </div>
                <div className="row" style={{ fontSize: "15px" }}>
                  <span>{BookingDetails.movieHall}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-4 text-right text-white d-none d-lg-block">
            <div className="row pt-3">
              <div className="col" style={{ fontSize: "12px" }}>
                <a onClick={() => this.props.history.goBack()}>
                  <i className="fa fa-times" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row bg-light">
          <div className="col">
            <div className="row">
              <div
                className="col-lg-8 col-md-4 p-2 m-2"
                style={{ backgroundColor: "white" }}
              >
                <img
                  className="img-fluid"
                  src="https://i.ibb.co/SK0HfNT/bookasmile-03.png"
                  alt=""
                />
              </div>
              <div
                className="col-lg-3 col-md-6"
                style={{ backgroundColor: "white" }}
              >
                <div className="row">
                  <div className="col">
                    <div className="row text-danger mt-1 ml-1">
                      BOOKING SUMMARY
                    </div>
                    <br />
                    <div className="row ml-2">
                      <div className="col-6 text-left">Movie Name</div>
                      <div className="col-6 text-right">
                        {BookingDetails.title}
                      </div>
                    </div>
                    <div className="row ml-2">
                      <div className="col-5 text-left">Movie Hall</div>
                      <div className="col-7 text-right">
                        {BookingDetails.movieHall}
                      </div>
                    </div>
                    {BookingDetails.tickets ? (
                      <React.Fragment>
                        <div className="row ml-2">
                          <div className="col-6 text-left">Total Tickets</div>
                          <div className="col-6 text-right">
                            {BookingDetails.tickets.length}
                          </div>
                        </div>
                        <div className="row ml-2">
                          <div className="col-6 text-left">Tickets</div>
                          <div className="col-6 text-right">
                            {BookingDetails.tickets.map((ticket) => (
                              <span key={ticket}> {ticket + " "}</span>
                            ))}
                          </div>
                        </div>
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                    <div className="row ml-2">
                      <div className="col-6 text-left">Time</div>
                      <div className="col-6 text-right">
                        {BookingDetails.time}
                      </div>
                    </div>
                    <div
                      className="row ml-2 pt-2 pb-2"
                      style={{ backgroundColor: "#fffcdc" }}
                    >
                      <div className="col-6 text-left">Amount Paid</div>
                      <div className="col-6 text-right">
                        {BookingDetails.amount}
                      </div>
                    </div>
                    <div className="row ml-4 text-center">
                      <img
                        className="img-fluid"
                        src="https://i.ibb.co/CVHYxVK/images-q-tbn-ANd9-Gc-Qq-PT1-GB7-Cpvo3-WDDCi-Wt-Vto-Q-SLqp-Z9-B1x-D3-D69-WTj-MPyl-Chnd.png"
                        alt="QR"
                        style={{ height: "300px", width: "300px" }}
                      />
                    </div>
                    <div className="row ml-2" style={{ fontSize: "10px" }}>
                      You can cancel the tickets 4 hour(s) before the show.
                      Refunds will be done according to Cancellation Policy.
                    </div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentBMS;
