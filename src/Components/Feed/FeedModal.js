import React from "react";
import useFetch from "../../Hooks/useFetch";
import styles from "../../Styles/FeedModal.module.css";
import { PHOTO_GET } from "../api";
import Error from "../Helper/Error";
import Loader from "../Helper/Loader";
import PhotoContent from "../Photo/PhotoContent";

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();
  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  function handleOutsideModal(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideModal}>
      {error && <Error error={error} />}
      {loading && <Loader />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
