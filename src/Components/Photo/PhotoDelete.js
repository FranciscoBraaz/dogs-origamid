import React from "react";
import useFetch from "../../Hooks/useFetch";
import styles from "../../Styles/Photo/PhotoDelete.module.css";
import { PHOTO_DELETE } from "../api";

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  async function handeClick(event) {
    event.preventDefault();
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }
  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletando
        </button>
      ) : (
        <button onClick={handeClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
