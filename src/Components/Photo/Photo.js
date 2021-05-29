import React from "react";
import { useParams } from "react-router";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../api";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
import Loader from "../Helper/Loader";
import PhotoContent from "./PhotoContent";

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    const { response, json } = request(url, options);
    console.log(response, json);
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loader />;
  if (!data) return null;

  return (
    <section className="container mainContainer">
      <Head title={data.photo.title} description="Foto postada" />
      <PhotoContent single={true} data={data} />
    </section>
  );
};

export default Photo;
