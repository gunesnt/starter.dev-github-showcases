import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import UserTopRepos from '@components/UserTopRepos';
import UserGists from '@components/UserGists/UserGists.data';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>GitHub Demo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full  min-h-[calc(100vh-70px)] flex flex-col-reverse lg:flex-row bg-gray-100">
        <aside className="w-full lg:w-96 bg-white p-8">
          <UserGists />
        </aside>
        <main className="max-w-screen-lg w-full">
          <div className="p-12">
            <h2 className="text-lg font-medium mb-4">Top Repositories</h2>
            <UserTopRepos />
          </div>
        </main>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/signin',
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
