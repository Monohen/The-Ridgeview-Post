This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# The Ridgeview Post

## Setup Sanity cms

Create a `.env.local` in your root of your project folder and paste:

```
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=
SANITY_API_TOKEN=
```

Note: You do not want to share anything in your `env.local` with anybody you don't trust.
You can get your sanity project id from `/your-project/sanity.json` at line 7
You can get your sanity api token from [sanity.io](https://sanity.io/manage) by selecting your project, then go to the api tab and then add a new API token (select editor), you will get api key, copy that, you can see it again.

## Start Next.js

To run from your computer, download the source, run `yarn` to update the packages and then `yarn dev` to run a local server.
This project was made with and uses the [`Yarn Package Manager`](https://yarnpkg.com).

```bash
npm update
# or
yarn
```

```bash
npm run dev
# or
yarn dev
```

You can access that server by going to [http://localhost:3000](http://localhost:3000)

## Start [Sanity](https://www.sanity.io) Studio

Start a local instance of Sanity Studio by going into the sanity directory `/the-ridgeview-post` inside of the project folder and running `sanity start`.
You can the deploy it by running sanity deploy inside that same directory.

## Edit the source

Start by editing `/pages/index.tsx`, change the look and feel of the website however you wish, edit each page at once by editing `/pages/post/[slug].tsx` or change the header in the `/components` folder, maybe create your own.

## Current packages & dependencies

next-auth
react-hook-form
react-portable-text
sanity
@sanity/client
tailwindcss
Typescript

### Project does not work with node.js ^18, next-auth does not support node.js ^18 yet, once updated the project will too.

### Learn about Next.js (The framework used to make this project)

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Licence [MIT](https://www.mit.edu/~amini/LICENSE.md)
