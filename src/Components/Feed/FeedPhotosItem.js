import React from "react";
import styles from "../../Styles/FeedPhotosItem.module.css";

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo);
  }
  return (
    <li className={styles.photo} onClick={handleClick}>
      <img src={photo.src} alt={photo.alt} />
      <span className={styles.visualization}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
