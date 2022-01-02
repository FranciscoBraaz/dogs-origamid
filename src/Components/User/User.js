import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import Feed from '../Feed/Feed';
import Head from '../Helper/Head';
import NotFound from '../NotFound';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

const User = () => {
  const { data } = useSelector((state) => state.user);

  if (!data) return null;
  return (
    <section className="container">
      <UserHeader />
      <Head title="Minha conta" description="Página da conta do usuário" />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
