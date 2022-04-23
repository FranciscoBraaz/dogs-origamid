import React from 'react';
import useFetch from '../../Hooks/useFetch';
import { STATS_GET } from '../api';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import Loader from '../Helper/Loader';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getdata() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getdata();
  }, [request]);
  if (loading) return <Loader />;
  if (error) return <Error error={error} />;
  if (!data) return null;

  return (
    <React.Suspense fallback={<div></div>}>
      <Head title="Estatísticas" description="Página de estatísticas" />
      <UserStatsGraphs data={data} />
    </React.Suspense>
  );
};

export default UserStats;
