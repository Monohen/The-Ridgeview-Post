import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  console.log(post);
  return (
    <main>
      <article className="max-w-3xl mx-auto p-5">
        <img
          src={urlFor(post.mainImage).url()!}
          alt=""
          className="w-full h-40 object-cover shadow border rounded-lg"
        />
        <div className="">
          <h1 className="text-4xl font-serif mt-10 mb-3">{post.title}</h1>
        </div>
        <h2 className="text-gray-500 text-sm font-light italic">
          {post.description}
        </h2>
        <p className="text-gray-500">
          Published by:{" "}
          <span className="text-indigo-500">{post.author.name}</span> at{" "}
          {new Date(post._createdAt).toLocaleString()}
        </p>
        <div>
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-3xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="text-2xl font-bold my-2" {...props} />
              ),
              h3: (props: any) => (
                <h3 className="text-xl font-bold my-2" {...props} />
              ),
              h4: (props: any) => (
                <h4
                  className="text-xl font-bold my-2 text-neutral-700"
                  {...props}
                />
              ),
              img: (props: any) => (
                <img
                  className="my-2 border rounded-lg"
                  {...props}
                  alt="Image could not load."
                />
              ),
              ul: ({ children }: any) => <ul className="my-2"> {children}</ul>,
              li: ({ children }: any) => (
                <li className="ml-4 list-disc m-2"> {children}</li>
              ),
              link: ({ href, children }: any) => (
                <a
                  href={href}
                  className="text-indigo-500 hover:underline cursor-pointer"
                >
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug {
    current
    }
    }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
            name,
            image
        },
        description,
        mainImage,
        slug,
        body
    }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
