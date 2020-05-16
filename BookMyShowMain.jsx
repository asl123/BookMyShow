import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BookMyShow from "./BookMyShow";
import BookMovie from "./bookingBookMyShow";
import BookSeat from "./bookSeatBMS";
import PaymentBMS from "./paymentsBMS";
class MainPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Switch>
            <Route path="/movies/:city" component={BookMyShow} />
            <Route
              path="/bookMovie/:city/:id/buyTicket/:showName/:showTime/:dateId"
              component={BookSeat}
            />
            <Route path="/bookMovie/:city/:id" component={BookMovie} />
            <Route path="/payments" component={PaymentBMS} />

            <Redirect to="/movies/NCR" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
