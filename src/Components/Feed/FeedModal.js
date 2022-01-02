import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhoto } from '../../Store/photo';
import styles from '../../Styles/Feed/FeedModal.module.css';
import Error from '../Helper/Error';
import Loader from '../Helper/Loader';
import PhotoContent from '../Photo/PhotoContent';

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error } = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPhoto(photo.id));
  }, [photo, dispatch]);

  function handleOutsideModal(event) {
    if (event.target === event.currentTarget) {
      setModalPhoto(null);
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideModal}>
      {error && <Error error={error} />}
      {loading && <Loader />}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal;
