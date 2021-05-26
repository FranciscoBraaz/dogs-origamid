import React from "react";
import Input from "../Forms/Input";
import styles from "../../Styles/UserPhotoPost.module.css";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router";

const UserPhotoPost = () => {
  const name = useForm();
  const weight = useForm("number");
  const age = useForm("number");
  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      navigate("/conta");
    }
  }, [data, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", name.value);
    formData.append("peso", weight.value);
    formData.append("idade", age.value);
    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);
    const response = await request(url, options);
    console.log(response);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }
  return (
    <section className={`${styles.photoPost} animationLeft`}>
      <form onSubmit={handleSubmit}>
        <Input type="text" label="Nome" name="name" {...name} />
        <Input type="number" label="Peso" name="weight" {...weight} />
        <Input type="number" label="Idade" name="age" {...age} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
