import React, { Component } from "react";
class LeftPanel extends Component {
  state = {
    languageView: 1,
    formatView: 0,
    genreView: 0,
  };
  handleIconView = (view) => {
    let { languageView, formatView, genreView } = this.state;
    console.log(view);
    if (view === "language") {
      if (languageView === 1) {
        languageView = 0;
      } else {
        languageView = 1;
      }
    } else if (view === "format") {
      if (formatView === 1) {
        formatView = 0;
      } else {
        formatView = 1;
      }
    } else if (view === "genre") {
      if (genreView === 1) {
        genreView = 0;
      } else {
        genreView = 1;
      }
    }
    this.setState({ languageView, genreView, formatView });
  };
  handleChangeCheck = (e) => {
    const { currentTarget: input } = e;
    const { genres, languages, formats } = this.props;
    // console.log(input.name, input.value);
    if (input.name === "genre") {
      let cb = genres.find((n) => n.name === input.value);
      if (cb) {
        cb.isSelected = input.checked;
      }
    }
    if (input.name === "format") {
      let cb = formats.find((n) => n.name === input.value);
      if (cb) {
        cb.isSelected = input.checked;
      }
    }
    if (input.name === "language") {
      let cb = languages.find((n) => n.name === input.value);
      if (cb) {
        cb.isSelected = input.checked;
      }
    }
    //console.log(genres, languages, formats);
    this.props.onOptionChange(genres, languages, formats);
  };
  render() {
    const { languages, formats, genres } = this.props;
    let { languageView, formatView, genreView } = this.state;
    return (
      <div>
        <div className="row d-none d-lg-block">
          <div
            className="col-10 text-center ml-4"
            style={{ backgroundColor: "white", padding: "5px" }}
          >
            <img
              className="img-fluid"
              src="https://i.ibb.co/Hry1kDH/17443322900502723126.jpg"
              alt=""
            />
          </div>
        </div>
        <br />
        <br />
        <form>
          <div
            className="row ml-3 mr-2 pt-2 pb-2 d-none d-lg-block"
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          >
            <div className={languageView ? "col text-primary" : "col"}>
              <i
                className={
                  languageView ? "fa fa-chevron-up" : "fa fa-chevron-down"
                }
                onClick={() => this.handleIconView("language")}
              ></i>
              &nbsp;&nbsp;&nbsp;&nbsp;Select Language
            </div>
            {languageView ? (
              <div>
                {languages.map((item) => (
                  <div
                    className="form-check ml-3 mr-2 pb-2 d-none d-lg-block"
                    key={item.name}
                  >
                    <input
                      type="checkbox"
                      value={item.name}
                      onChange={this.handleChangeCheck}
                      id={item.name}
                      name="language"
                      checked={item.isSelected}
                      className="form-check-input"
                    />
                    <label htmlFor={item.name} className="form-check-label">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          <br />
          <div
            className="row ml-3 mr-2 pt-2 pb-2 d-none d-lg-block"
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          >
            <div className={formatView ? "col text-primary" : "col"}>
              <i
                className={
                  formatView ? "fa fa-chevron-up" : "fa fa-chevron-down"
                }
                onClick={() => this.handleIconView("format")}
              ></i>
              &nbsp;&nbsp;&nbsp;&nbsp;Format
            </div>
            {formatView ? (
              <div>
                {formats.map((item) => (
                  <div
                    className="form-check ml-3 mr-2 pb-2 d-none d-lg-block"
                    key={item.name}
                  >
                    <input
                      type="checkbox"
                      value={item.name}
                      onChange={this.handleChangeCheck}
                      id={item.name}
                      name="format"
                      checked={item.isSelected}
                      className="form-check-input"
                    />
                    <label htmlFor={item.name} className="form-check-label">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          <br />
          <div
            className="row ml-3 mr-2 pt-2 pb-2 d-none d-lg-block"
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          >
            <div className={genreView ? "col text-primary" : "col"}>
              <i
                className={
                  genreView ? "fa fa-chevron-up" : "fa fa-chevron-down"
                }
                onClick={() => this.handleIconView("genre")}
              ></i>
              &nbsp;&nbsp;&nbsp;&nbsp;Genre
            </div>
            {genreView ? (
              <div>
                {genres.map((item) => (
                  <div
                    className="form-check ml-3 mr-2 pb-2 d-none d-lg-block"
                    key={item.name}
                  >
                    <input
                      type="checkbox"
                      value={item.name}
                      onChange={this.handleChangeCheck}
                      id={item.name}
                      name="genre"
                      checked={item.isSelected}
                      className="form-check-input"
                    />
                    <label htmlFor={item.name} className="form-check-label">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default LeftPanel;
