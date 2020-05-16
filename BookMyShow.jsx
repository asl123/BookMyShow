import React, { Component } from "react";
import LeftPanel from "./LeftPanelBookMyShow";
import axios from "axios";
import queryString from "query-string";
import Navbar from "./navbarBookByShow";
class BookMyShow extends Component {
  state = {
    addImages: [
      "https://i.ibb.co/ZGsJ3dh/jio-mami-21st-mumbai-film-festival-with-star-2019-02-09-2019-10-58-45-992.png",
      "https://i.ibb.co/wRr7W1P/hustlers-01-10-2019-05-09-55-486.png",
      "https://i.ibb.co/qFWPRpF/laal-kaptaan-16-10-2019-12-48-06-721.jpg",
    ],
    movies: [],
    languages: ["Hindi", "English", "Punjabi", "Tamil"],
    formats: ["2D", "3D", "4DX"],
    genres: ["Action", "Adventure", "Biography", "Comedy"],
  };
  async componentDidMount() {
    const { city } = this.props.match.params;
    console.log(city);
    let { data: movies } = await axios.get(
      "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies/" +
        city +
        this.props.location.search
    );
    // console.log(movies);
    this.setState({ movies });
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      const city = this.props.match.params.city;
      let path = "";
      if (city) path = path + "/" + city;
      const { data: movies } = await axios.get(
        "https://us-central1-bkyow-22da6.cloudfunctions.net/app/movies" +
          path +
          this.props.location.search
      );
      this.setState({
        movies,
      });
    }
  }
  addToParams(params, newParamName, newParamValue) {
    if (newParamValue) {
      params = params ? params + "&" : params + "?";
      params = params + newParamName + "=" + newParamValue;
    }
    return params;
  }
  callUrl = (params, genres, languages, formats) => {
    let path = "/movies";
    const city = this.props.match.params.city;
    if (city) path = path + "/" + city;
    params = this.addToParams(params, "lang", languages);
    params = this.addToParams(params, "format", formats);
    params = this.addToParams(params, "genre", genres);
    this.props.history.push({ pathname: path, search: params });
  };
  makeCbStructure(array, selectedOpt) {
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
  }
  handleOptionChange = (genres, languages, formats) => {
    let filterGenres = genres.filter((n1) => n1.isSelected);
    let arrayGenres = filterGenres.map((n1) => n1.name);
    let allSelGenres = arrayGenres.join(",");
    let filterdLanguages = languages.filter((n1) => n1.isSelected);
    let arrayLanguages = filterdLanguages.map((n1) => n1.name);
    let allSelLanguages = arrayLanguages.join(",");
    let filterdFormats = formats.filter((n1) => n1.isSelected);
    let arrayFormats = filterdFormats.map((n1) => n1.name);
    let allSelFormats = arrayFormats.join(",");
    this.callUrl("", allSelGenres, allSelLanguages, allSelFormats);
  };
  handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { currentTarget: input } = e;
      //console.log(input.value);
      let path = "/movies";
      let q = "?q=" + input.value;
      const { city } = this.props.match.params;
      if (city) path = path + "/" + city;
      //console.log(this.props);
      //console.log(path);
      this.props.history.push({ pathname: path, search: q });
    }
  };
  handleBooking = (index) => {
    let { movies } = this.state;
    const city = this.props.match.params.city;
    this.props.history.push({ pathname: "/bookMovie/" + city + "/" + index });
  };
  render() {
    const { addImages, movies, genres, languages, formats } = this.state;
    let { format, lang, genre } = queryString.parse(this.props.location.search);
    format = format ? format : "";
    lang = lang ? lang : "";
    genre = genre ? genre : "";
    let formatCheckbox = this.makeCbStructure(formats, format);
    let languageCheckbox = this.makeCbStructure(languages, lang);
    let genreCheckbox = this.makeCbStructure(genres, genre);
    return (
      <div className="container-fluid">
        <Navbar handleSearch={this.handleSearch} />
        <div className="row d-flex justify-content-center m-2">
          <div className="col-10">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src={addImages[0]}
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src={addImages[1]}
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src={addImages[2]}
                    alt="Third slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
        <div className="row d-none d-lg-block">
          <nav
            className="navbar navbar-expand-md navbar-light text-light bg-light"
            style={{ maxHeight: "80px" }}
          >
            <a className="navbar-brand" href="/" style={{ fontSize: "28px" }}>
              Movies
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="/">
                  Now Showing <span className="sr-only">(current)</span>
                </a>
                <a className="nav-item nav-link" href="/">
                  Coming Soon
                </a>
                <a className="nav-item nav-link" href="/">
                  Exclusive
                </a>
              </div>
            </div>
          </nav>
        </div>
        <div className="row m-1" style={{ backgroundColor: "#f2f2f2" }}>
          <div className="col-3 d-none d-lg-block">
            <LeftPanel
              languages={languageCheckbox}
              formats={formatCheckbox}
              genres={genreCheckbox}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-lg-9 col-12">
            <div className="row">
              {movies.map((movie, index) => (
                <div
                  className="col-lg-3 col-md-3 col-5  ml-4 ml-md-5 mr-md-1 ml-lg-1"
                  style={{ backgroundColor: "white" }}
                  key={movie.title}
                  onClick={() => this.handleBooking(index)}
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <img
                        className="img-fluid imgs"
                        src={movie.img}
                        alt={movie.title}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5 col-6">
                      <div className="row">
                        <div className="col-lg-12">
                          <i
                            className="fa fa-heart"
                            style={{ color: "#d6181f" }}
                          />
                          {" " + movie.rating}
                        </div>
                      </div>
                      <div className="row d-none d-lg-block">
                        <div
                          className="col text-muted"
                          style={{ fontSize: "12px" }}
                        >
                          {movie.votes + " votes"}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7 col-12">
                      <div className="row ml-2">{movie.title}</div>
                      <div
                        className="row text-muted d-none d-lg-block ml-2"
                        style={{ fontSize: "13px" }}
                      >
                        {movie.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookMyShow;
