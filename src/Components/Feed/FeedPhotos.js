import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../api";
import Error from "../Helper/Error";
import Loader from "../Helper/Loader";
import styles from "../../Styles/Feed/FeedPhotos.module.css";

const FeedPhotos = ({ user, page, setInfinite, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();
  React.useEffect(() => {
    const total = 3;
    const { url, options } = PHOTOS_GET({ page, total, user });
    async function fetchPhotos() {
      const { response, json } = await request(url, options);
      console.log("Request:", json);
      if (response && response.ok && json.length < total) {
        setInfinite(false);
      }
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);

  if (error) return <Error error={error} />;
  if (loading) return <Loader />;
  if (data) {
    return (
      <ul className={`${styles.feed} animationLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            setModalPhoto={setModalPhoto}
            key={photo.id}
            photo={photo}
          />
        ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default FeedPhotos;
