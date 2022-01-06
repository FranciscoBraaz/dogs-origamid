import React from 'react';
import Input from '../Forms/Input';
import styles from '../../Styles/User/UserPhotoPost.module.css';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router';
import Head from '../Helper/Head';
import { useDispatch, useSelector } from 'react-redux';
import { photoPost } from '../../Store/postPhoto';

const UserPhotoPost = () => {
  const name = useForm();
  const weight = useForm('number');
  const age = useForm('number');
  const [img, setImg] = React.useState({});
  const { data, error, loading } = useSelector((state) => state.postPhoto);
  const { token } = useSelector((state) => state.token.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data) {
      navigate('/conta');
    }
  }, [data, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', name.value);
    formData.append('peso', weight.value);
    formData.append('idade', age.value);

    dispatch(photoPost({ formData, token }));
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }
  return (
    <section className={`${styles.photoPost} animationLeft`}>
      <Head title="Poste sua foto" description="Seção para postar foto" />
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
