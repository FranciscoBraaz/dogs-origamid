import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../Store/ui';
import styles from '../../Styles/Feed/FeedModal.module.css';
import Error from '../Helper/Error';
import Loader from '../Helper/Loader';
import PhotoContent from '../Photo/PhotoContent';

const FeedModal = () => {
  const { data, loading, error } = useSelector((state) => state.photo);
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state.ui);

  React.useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  function handleOutsideModal(event) {
    if (event.target === event.currentTarget) {
      dispatch(closeModal());
    }
  }

  if (!modal) return null;
  return (
    <div className={styles.modal} onClick={handleOutsideModal}>
      {error && <Error error={error} />}
      {loading && <Loader />}
      {data && <PhotoContent />}
    </div>
  );
};

export default FeedModal;
