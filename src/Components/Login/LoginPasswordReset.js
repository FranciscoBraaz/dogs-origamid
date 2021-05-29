import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET } from "../api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
  const [key, setKey] = React.useState("");
  const [login, setLogin] = React.useState("");
  const password = useForm();
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyParam = params.get("key");
    const loginParam = params.get("login");
    if (keyParam) setKey(keyParam);
    if (loginParam) setLogin(loginParam);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        key,
        login,
        password: password.value,
      });

      const { response } = await request(url, options);
      if (response && response.ok) {
        navigate("/login");
      }
    }
  }

  return (
    <section className="title animationLeft">
      <Head title="Resetar senha" description="Página para resetar senha" />
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          label="Nova senha"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar senha</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
