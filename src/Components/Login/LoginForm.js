import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import Error from '../Helper/Error';
import styles from '../../Styles/LoginForm.module.css';
import stylesBtn from '../../Styles/Button.module.css';
import Head from '../Helper/Head';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../Store/user';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state);
  const loading = token.loading || user.loading;
  const error = token.error || user.error;

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      dispatch(
        fetchLogin({ username: username.value, password: password.value }),
      );
    }
  }

  return (
    <section className="animationLeft">
      <Head title="Login" description="Página de login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}

        <Error error={error} />
      </form>
      <Link className={styles.lostPassword} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
