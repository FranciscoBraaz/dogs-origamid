import React from 'react';
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from '../../Styles/Photo/PhotoComments.module.css';
import { useSelector } from 'react-redux';

const PhotoComments = ({ single, id, comments }) => {
  const { data } = useSelector((state) => state.user);
  const [commentsPhoto, setCommentsPhoto] = React.useState(() => comments);
  const sectionComments = React.useRef(null);

  React.useEffect(() => {
    sectionComments.current.scrollTop = sectionComments.current.scrollHeight;
  }, [commentsPhoto]);

  return (
    <>
      <ul
        ref={sectionComments}
        className={`${styles.comments} ${single ? styles.single : ''}`}
      >
        {commentsPhoto.map((comment) => (
          <li key={comment.comment_ID}>
            <p>
              <b>{comment.comment_author}: </b>
              <span>{comment.comment_content}</span>
            </p>
          </li>
        ))}
      </ul>
      {data && (
        <PhotoCommentsForm
          single={single}
          id={id}
          setCommentsPhoto={setCommentsPhoto}
        />
      )}
    </>
  );
};

export default PhotoComments;
