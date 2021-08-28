import { ToastContainer } from "react-toastify";
import "./App.css";
import Searchbar from "./Components/Searchbar";
import { Component } from "react";
import ImageGallery from "./Components/ImageGallery";
import imageApiService from "./servises/ImagesAPI/ImagesApi";
import Button from "./Components/Button/Button";
import Spinner from "./Components/Loader/Loader";
import Modal from "./Components/Modal";
import Container from "./Components/Container/Container";

class App extends Component {
  state = {
    images: [],
    imageName: "",
    page: 1,
    isLoading: false,
    error: false,
    showModal: false,
    largeImageURL: null,
    tags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName) {
      this.setState({ isLoading: true });
      this.fetchImages(imageName, page);
      this.setState({ isLoading: false });
    }
  }
  searchImage = (imageName) => {
    this.setState({
      imageName,
      page: 1,
      images: [],
    });
  };

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
      .finally(() => {
        this.setState({ loading: false });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  buttonClickOnMore = () => {
    const { page } = this.state;
    this.fetchImages();
    this.setState({
      page: page + 1,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  bigImage = (largeImageURL, tags) => {
    this.setState({
      largeImageURL: largeImageURL,
      tags: tags,
    });
    this.toggleModal();
  };
  render() {
    const { images, isLoading, showModal, largeImageURL, tags } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.searchImage} state={this.state} />
        {isLoading && <Spinner />}
        <ImageGallery images={images} onClick={this.bigImage} />
        {showModal && (
          <Modal onClose={this.bigImage}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
        {images.length > 0 && <Button buttonClick={this.buttonClickOnMore} />}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
export default App;
