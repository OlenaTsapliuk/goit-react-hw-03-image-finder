import { ToastContainer } from "react-toastify";
import "./App.css";
import Searchbar from "./Components/Searchbar";
import { Component } from "react";
import ImageGallery from "./Components/ImageGallery";
import imageApiService from "./servises/ImagesAPI/ImagesApi";
import Button from "./Components/Button/Button";
class App extends Component {
  state = {
    images: [],
    imageName: "",
    page: 1,
    isLoading: false,
    error: false,
  };

  searchImage = (imageName) => {
    this.setState({
      imageName,
      page: 1,
      images: [],
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName) {
      this.fetchImages(imageName, page);
    }
  }

  fetchImages = () => {
    const { imageName, page } = this.state;
    this.setState({ isLoading: true });
    imageApiService(imageName, page)
      .then((images) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error: true }))
      .finally(() => this.setState({ isLoading: false }));
  };

  buttonClickOnMore = () => {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
  };
  render() {
    return (
      <div>
        <Searchbar onSubmit={this.searchImage} state={this.state} />
        <ImageGallery images={this.state.images} />
        <Button buttonClick={this.buttonClickOnMore} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
export default App;
