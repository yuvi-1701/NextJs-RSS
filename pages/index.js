import Head from 'next/head';
import { getFeedData } from './getFeedData';
import styles from '../styles/Home.module.css'


export async function getStaticProps() {
  let items = await getFeedData();
  return { props: { items } };
}

export default function Home({ items }) {
  return (
    <>
    {/* <link rel="styles" href="./styles.module.css" precedence="default" /> */}
      <Head>
        <title>My News Feed</title>
      </Head>
      <div className="container">
        <h1 className="heading">My News Feed</h1>
        <div className="articles">
          {items.map((item) => (
            <a key={item.guid} href={item.link} target="_blank" rel="noopener noreferrer">
              <div className="article">
                {item.media && item.media.content && (
                <img src={item.media.content.$.url} alt={item.media.content.$.title} />
                    )}
                    {/* Error in fetching media url */} 
                <div className="articleDetails">
                  <h2 className="articleTitle">{item.title}</h2>
                  <p className="articleSnippet">{item.contentSnippet}</p>
                  <span className="articleDate">{new Date(item.pubDate).toLocaleDateString()}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
