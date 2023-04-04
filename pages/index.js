import Head from 'next/head';
import Image from 'next/image';
import Parser from 'rss-parser';
import React, { useState } from 'react';


async function getFeedData() {
  const parser = new Parser();
  const feed = await parser.parseURL('https://www.essentiallysports.com/feed/');
  console.log(feed)
  return feed.items;
}

export async function getStaticProps() {
  let items = await getFeedData();
  return { props: { items } };
}

export function Footer() {
    return (
      <footer>
        <p>Copyright © 2023 by Yuvraj Darekar</p>
      </footer>
    );
  }


export default function Home({ items }) {
  return (
    <>
    <div className="container">
        <Head>
            <title>My News Feed</title>
        </Head>
        <div>
            <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#videos">Videos</a></li>
                <li><a href="#facts">Facts</a></li>
            </ul>
            </nav>
        </div>
        {/* <div className="container"> */}
            <h1 className="heading">My News Feed</h1>
            <div className="articles">
            {items.map((item) => (
            <a key={item.guid} href={item.link} target="_blank" rel="noopener noreferrer">

                <div className="article">
                    {item.media && item['media:content'] && (
                    <Image src={item['media:content'].$.url} alt={item.media.content.$.title}  className='articleImage'/>
                        )}
                        {/* Error in fetching image url */}
                    <div className="articleDetails">
                        <h2 className="articleTitle" style={{color: "black"}}>{item.title}</h2>
                        <span className="articleDate"><i>Published Date : </i>{new Date(item.pubDate).toLocaleDateString()}</span>                 
                        <p className="articleSnippet">{item.contentSnippet}</p>
                    </div>
                </div>
            </a>

            ))}
        </div>
            <Footer />
    </div>
    </>
  );
}
