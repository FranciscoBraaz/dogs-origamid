import React from "react";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../api";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import UserContext from "../../contexts/UserContext";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();
  const { userLogin } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const response = await fetch(url, options);
    if (response.ok) {
      userLogin(username.value, password.value);
    }
  }
  return (
    <section className="animationLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input type="text" label="Usuário" name="username" {...username} />
        <Input type="email" label="Email" name="email" {...email} />
        <Input type="password" label="Senha" name="password" {...password} />
        <Button>Cadastrar</Button>
      </form>
    </section>
  );
};

export default LoginCreate;
