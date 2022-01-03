import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loadNewPhotos, resetFeedState } from '../../Store/feed';
import Error from '../Helper/Error';
import Loader from '../Helper/Loader';

const Feed = ({ user }) => {
  const dispatch = useDispatch();
  const { infinite, list, error, loading } = useSelector((state) => state.feed);

  React.useEffect(() => {
    dispatch(resetFeedState());

    dispatch(loadNewPhotos({ total: 3, user }));
  }, [dispatch, user]);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const height = document.body.offsetHeight - window.innerHeight;
        const scroll = window.scrollY;
        if (scroll > height * 0.75 && !wait) {
          dispatch(loadNewPhotos({ total: 3, user }));
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }
    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite, dispatch, user]);

  return (
    <div>
      <FeedModal />
      {error && <Error error={error} />}
      {loading && <Loader />}
      {list && <FeedPhotos />}
    </div>
  );
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
