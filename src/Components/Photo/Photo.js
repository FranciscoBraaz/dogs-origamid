import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchPhoto } from '../../Store/photo';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import Loader from '../Helper/Loader';
import PhotoContent from './PhotoContent';

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error } = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [id, dispatch]);

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
