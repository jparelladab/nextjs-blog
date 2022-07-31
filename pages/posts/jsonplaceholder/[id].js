import Layout from '../../../components/layout';
import Head from 'next/head';
import utilStyles from '../../../styles/utils.module.css';


export async function getStaticProps({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    const post = await res.json();
    return {
      props: {
        post,
      },
    };
  }

export async function getStaticPaths() {
// Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    const paths = posts.map((post) => {

        return {
            params: {
                id: String(post.id)
            },
        }
        
    });

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ post }) {
  return (
    <Layout>
        <Head>
            <title>{post.title}</title>
        </Head>
        <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        {post.body}
      </article>
    </Layout>
  );
}

