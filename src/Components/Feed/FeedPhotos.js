import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../api";
import Error from "../Helper/Error";
import Loader from "../Helper/Loader";
import styles from "../../Styles/FeedPhotos.module.css";

const FeedPhotos = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
    async function fetchPhotos() {
      const { response, json } = await request(url, options);
      console.log(json);
    }
    fetchPhotos();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loader />;
  if (data) {
    return (
      <ul className={`${styles.feed} animationLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem key={photo.id} photo={photo} />
        ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default FeedPhotos;
