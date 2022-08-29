import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>The Ridgeview Post</title>
        <meta
          name="description"
          content="Latest inside news from Redmond Oregon and the Ridgeview High School."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10 text-6xl h-full w-full">
        <div className="w-full md:w-3/5">
          <h2 className="font-serif drop-shadow-lg text-5xl md:text-6xl">
            <span className="underline decoration-indigo-500">
              The Ridgeview Post
            </span>
            <br /> Latest Inside news from the Ridgeview Highschool and Redmond
            Oregon.
          </h2>
        </div>
        <div className="w-auto h-full md:gap-3 py-4 md:py-6 grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="shadow border rounded-lg group cursor-pointer ring-indigo-500 hover:ring">
                <img
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                  className="rounded-t-lg h-36 w-full object-cover group-hover:rounded-b-lg group-hover:scale-105 border-b border-b-black ring-indigo-500 group-hover:ring bg-white transition-transform duration-200 ease-in-out"
                />
                <div className="rounded-lg bg-white text-base p-2 flex flex-row justify-between">
                  <div>
                    <p className="text-lg py-1 font-bold">{post.title}</p>
                    <p className="text-xs py-1">{post.description}</p>
                    <p className="text-xs py-1 text-gray-600">
                      Article by {post.author.name}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author-> {
     name,
     image
    },
    description,
    mainImage,
    slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
