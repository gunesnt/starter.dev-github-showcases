import {
  json,
  Link,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from 'remix';
import type { MetaFunction } from 'remix';
import styles from './styles/tailwind.css';
import NavBar from './components/Navbar/NavBar';
import { auth } from './services/auth.server';
import { CURRENT_USER_QUERY } from './lib/queries/UserDropdown';
import gqlClient from './lib/graphql-client';
import { getSession } from './services/session.server';

type DocumentProps = {
  children: React.ReactNode;
  title?: string;
};

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: 'GitHub Demo App' };
};

// Global ErrorBoundary
// TODO: Put in proper/approved error wording/formatting/styling
export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <Document>
      <h1>Error</h1>
      <p>{error.message}</p>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document title="Error">
      <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className=" text-9xl mb-8">{caught.status}</div>
        <div className="text-2xl mb-5">
          <span className="">Ooops...</span>
          <br />
          {caught.statusText}
        </div>
        <div className=" bg-gray-900 text-white rounded px-7 py-2">
          <Link to={`/`} className=" ">
            Go to Home
          </Link>
        </div>
      </div>
    </Document>
  );
}

type LoaderData = {
  viewer?: any;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { getUser } = await getSession(request);
  const session = await getUser(request);
  let viewer;

  if (session) {
    const { accessToken } = await auth.isAuthenticated(request, {
      failureRedirect: '/login',
    });
    ({ viewer } = await gqlClient.request(CURRENT_USER_QUERY, undefined, {
      authorization: `Bearer ${accessToken}`,
    }));
  }
  return json<LoaderData>({ viewer });
};

export default function App() {
  const { viewer } = useLoaderData<LoaderData>();
  return (
    <Document>
      {viewer ? <NavBar user={viewer} /> : null}
      <Outlet />
      <ScrollRestoration />
      <Scripts />
    </Document>
  );
}

export function Document({ children, title }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <title>{title ? title : 'GitHub Demo App'}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
