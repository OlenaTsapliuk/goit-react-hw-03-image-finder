import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ image }) {
  const { webformatURL, id, tags } = image;

  return (
    <li className={s.imageItem} key={id}>
      <img src={webformatURL} alt={tags} className={s.galleryItemImage} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
