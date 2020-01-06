import Head from 'next/head'

const Layout = (props) => (
  <div>
    <Head>
      <title>TODO Lists</title>
    </Head>
    { props.children }
  </div>
);

export default Layout;