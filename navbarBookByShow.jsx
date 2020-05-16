import React from "react";
import { Link } from "react-router-dom";
import bookmyshowlogo from "../logos/bookmyshowlogo.svg";
const Navbar = ({ handleSearch }) => {
  return (
    <React.Fragment>
      <div className="row bg-dark p-1 text-light" id="navbarTogglerDemo01">
        <div className="col-lg-2 col-4 mt-1  ml-1">
          <Link to="">
            <img src={bookmyshowlogo} alt="logo" style={{ width: "130px" }} />
          </Link>
        </div>
        <div className="col-lg-4 col-4 mt-1 ml-1 text-right">
          <form className="form-inline">
            <input
              className="form-control form-control-sm fa fa-search"
              type="text"
              id="Search"
              name="Search"
              onKeyDown={handleSearch}
              placeholder="&#xF002; Search for Movies"
              aria-label="Search"
              style={{ width: "100%" }}
            />
          </form>
        </div>
        <div className="col-2 mt-2 text-right d-none d-md-block">
          <div className="dropdown">
            <div className="dropbtn1">
              NCR
              <i
                className="fa fa-chevron-down ml-1"
                id="onhover"
                style={{ fontSize: "10px", color: "lightgrey" }}
              />
            </div>
            <div className="dropdown-content">
              <div>
                <Link to="/movies/NCR">NCR</Link>
              </div>
              <div>
                <Link to="/movies/Ahmadabad">Ahmadabad</Link>
              </div>
              <div>
                <Link to="/movies/Banglore">Banglore</Link>
              </div>
              <div>
                {" "}
                <Link to="/movies/Chennai">Chennai</Link>
              </div>
              <div>
                <Link to="/movies/Mumbai">Mumbai</Link>
              </div>
              <div>
                <Link to="/movies/Hyderabad">Hyderabad</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2 mt-2 text-center d-none d-md-block">
          <Link style={{ color: "white" }} to="">
            English
          </Link>
        </div>
        <div className="col-1 text-right mt-2 d-none d-md-block">
          <button
            className="btn btn-outline-light btn-sm"
            style={{ fontSize: ".875rem" }}
          >
            Sign In
          </button>
        </div>
      </div>
      <div
        className="row bg-dark text-light text-center"
        style={{ fontSize: "14px" }}
      >
        <div className="col-2">Movies</div>
        <div className="col-2">Events</div>
        <div className="col-2">Plays</div>
        <div className="col-2">Activities</div>
        <div className="col-2">Fanhood</div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
