import React from "react";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import { COMMENT_POST } from "../api";
import Error from "../Helper/Error";
import styles from "../../Styles/PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({ id, setCommentsPhoto }) => {
  const [comment, setComment] = React.useState("");
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    if (response.ok) {
      setCommentsPhoto((comments) => [...comments, json]);
      setComment("");
    }
    console.log(response);
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        id="comment"
        className={styles.textarea}
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
