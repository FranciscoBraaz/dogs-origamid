import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import styles from '../../Styles/Feed/FeedPhotos.module.css';
import { useSelector } from 'react-redux';

const FeedPhotos = () => {
  const { list } = useSelector((state) => state.feed);
  return (
    <ul className={`${styles.feed} animationLeft`}>
      {list.map((photo) => (
        <FeedPhotosItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
};

export default FeedPhotos;
