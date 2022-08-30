import { GetStaticProps } from "next";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string[];
}

interface Props {
  post: Post;
}

function Posts({ post }: Props) {
  const { data: session } = useSession();

  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };
  return (
    <main className="pb-2">
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6110297073296255"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <article className="max-w-3xl mx-auto p-5">
        <img
          src={urlFor(post.mainImage).url()!}
          alt=""
          className="w-full h-40 object-cover shadow border rounded-lg"
        />
        <h1 className="text-3xl mt-10 mb-3 font-serif drop-shadow">
          {post.title}
        </h1>
        <h2 className="text-sm italic font-light text-gray-500 mb-2">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <p className="font-extralight text-sm">
            Published by
            <span className="text-indigo-500">{post.author.name}</span> at{" "}
            {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1
                  className="text-3xl font-bold my-2 font-serif drop-shadow"
                  {...props}
                />
              ),
              h2: (props: any) => (
                <h2
                  className="text-2xl font-bold my-2 drop-shadow"
                  {...props}
                />
              ),
              h3: (props: any) => (
                <h3 className="text-xl font-bold my-2 drop-shadow" {...props} />
              ),
              h4: (props: any) => (
                <h4
                  className="text-xl font-bold my-2 text-neutral-700 drop-shadow"
                  {...props}
                />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc"> {children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-indigo-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-indigo-500 shadow" />
      <div className="p-5 max-w-2xl mx-auto mb-10">
        <div>
          {session ? (
            <div>
              <h3 className="text-lg">Commenting as {session.user.name}</h3>
              <hr className="py-3 mt-2" />
              {submitted ? (
                <div className="flex flex-col py-5 px-2 md:rounded-lg my-10 bg-indigo-500 text-white w-full md:max-w-2xl md:mx-auto text-center shadow">
                  <h3 className="text-3xl font-bold">
                    Your comment was submit
                  </h3>
                  <p>
                    Your comment will appear once it is verified to be
                    appropriate and related, wait at least 60 seconds after your
                    comment has been verified for it to appear.
                  </p>
                </div>
              ) : (
                <form
                  className="flex flex-col"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    {...register("name", { required: true })}
                    value={session!.user.name}
                    type="hidden"
                  />

                  <input
                    {...register("email", { required: true })}
                    value={session!.user.email}
                    type="hidden"
                  />

                  <label className="block mb-5">
                    <span className="text-gray-700">
                      Comment
                      {errors.comment && (
                        <span className="text-red-500"> *</span>
                      )}
                    </span>
                    <textarea
                      {...register("comment", { required: true })}
                      className="shadow border rounded-lg py-2 px-3 form-textarea mt-1 block w-full ring-indigo-500 outline-none focus:ring"
                      placeholder="Note: Provide the article you are commenting on otherwise your comment won't be verified. This article was informative and resourceful. (Lorem Ipsum)"
                      rows={8}
                    />
                  </label>

                  <input
                    type="submit"
                    className="shadow bg-indigo-500 hover:bg-indigo-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
                  />
                </form>
              )}
            </div>
          ) : (
            <h3>
              <a onClick={() => signIn()} className="cursor-pointer">
                Login to comment
              </a>
            </h3>
          )}
        </div>
        <div className="flex flex-col p-10 md:my-10 md:shadow md:rounded-lg w-full">
          <h3 className="text-lg pb-2">Comments</h3>
          <hr className="pb-2" />

          {post.comments.map((comment) => (
            <div key={comment._id} className="pt-2">
              <p>
                <span className="text-indigo-500"> {comment.name}: </span>{" "}
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* comment */}
    </main>
  );
}

export default Posts;

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
        'comments' : *[_type == "comment" &&
          post._ref == ^._id &&
          approved== true],
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
  };
};
