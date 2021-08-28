import Loader from "react-loader-spinner";
import { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class Spinner extends Component {
  //other logic
  render() {
    return (
      <Loader
        type="Oval"
        color="#59067a"
        height={100}
        width={100}
        style={{ margin: "auto" }}
      />
    );
  }
}
