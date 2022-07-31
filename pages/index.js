import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
  const posts = await res.json();
  return {
    props: {
      allPostsData,
      posts
    },
  };
}



export default function Home({ allPostsData, posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello this is my Next.js playground</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Jsonplaceholder posts</h2>
        <ul className={utilStyles.list}>
          {posts.map(({  title, body,id }) => (
            <li className={utilStyles.listItem} key={id}>
             <Link href={`/posts/jsonplaceholder/${id}`}>
              <a>{title}</a>
            </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
