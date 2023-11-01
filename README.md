<!-- omit in toc --> 
# Cloudflare Pages + D1 SQLite + React Template

⚠️ **Work in Progress** (usable, but not yet polished and fully documented)

This is a minimal, hopefully beginner-friendly template you can use as a starting point for creating simple, database-backed React applications and hosting them for free on [Cloudflare Pages](https://pages.cloudflare.com/).

<!-- omit in toc -->
## Table of Contents

- [What's included?](#whats-included)
- [Why this, why now?](#why-this-why-now)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone or fork this repository](#1-clone-or-fork-this-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Create local D1 database](#3-create-local-d1-database)
  - [4. Start development server](#4-start-development-server)
- [Deploying your project to Cloudflare Pages](#deploying-your-project-to-cloudflare-pages)
  - [Deploy from your local machine](#deploy-from-your-local-machine)
  - [Access your D1 database from Cloudflare Pages Functions](#access-your-d1-database-from-cloudflare-pages-functions)
- [Working with the D1 SQLite database](#working-with-the-d1-sqlite-database)
- [Working with API endpoints](#working-with-api-endpoints)
- [Working with Vite frontend](#working-with-vite-frontend)
  - [Fetching data with React Query](#fetching-data-with-react-query)
  - [Navigating with React Router](#navigating-with-react-router)
  - [Using other frameworks](#using-other-frameworks)
  - [Using plain JavaScript](#using-plain-javascript)
- [License](#license)


## What's included?

This template contains the following components
- **Frontend:** ⚡️ React + [Vite](https://vitejs.dev/) application with minimal libraries (code: [`/app`](app/)).
- **Backend:**  [Cloudflare Pages Functions](https://pages.cloudflare.com[) (code: [`/functions`](functions/))
- **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/learning/local-development/) SQLite database.

All of the code is written in TypeScript, but you can easily [convert it to plain JavaScript instead](#using-plain-javascript).

## Why this, why now?

Hosting production-grade websites has never been easier: Companies like [Vercel](https://vercel.com), [Netlify](https://netlify.com) and [Render](https://render.com) make it relatively simple to host a static or a server-rendered website. Hosting databases is also easier than ever: [PlanetScale](https://planetscale.com), [Neon](https://neon.tech), [Railway](https://railway.app), and others can handle your database hosting for you. 

For professional software engineers, these tools make day-to-day work a breeze. However, for beginners, navigating the myriad of options, integrating different parts of the stack and understanding which of the bells and whistles of their offering is necessary for their use case can be confusing.

[Cloudflare Pages](https://pages.cloudflare.com) and [Cloudflare D1](https://developers.cloudflare.com/d1/learning/local-development/) are a great combination for hosting interactive, dynamic, high-performance websites and applications for very cheaply, or in many cases, for free. They allow you to implement the frontend, backend and database in a single codebase using just your favorite JavaScript library and a serverless SQLite-compatible database, allowing new developers who already know these tools to focus on programming their application instead of understanding different hosting paradigms.

However, the initial setup for a database-backed website on Cloudflare is still a bit of a pain.

This template aims to make it easy to build and host web applications on Cloudflare Pages.

## Getting Started


### Prerequisites

For local development, you'll need a recent version of [Node.js](https://nodejs.org/en). 

To deploy the project to the internet, you'll be prompted to create a free [Cloudflare](https://pages.cloudflare.com/) account if you don't yet have one. 

### 1. Clone or fork this repository

If you are starting a new project, you can fork this template to your own account by pressing the [**Use this template**](https://github.com/new?template_name=cloudflare-pages-react-sqlite-starter&template_owner=jevakallio) button.

If you are just exploring


### 2. Install dependencies

Clone or fork this repository, and run:
```bash
npm install
```

### 3. Create local D1 database

Run the following command:

```bash
npx wrangler d1 create <your-database-name>
```

This will print a D1 database configuration into your terminal. Copy it and add it to your [`wrangler.toml`](./wrangler.toml) file in the project root directory:

```toml
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "your-database-name"
database_id = "3762f371-4d12-410f-a6a1-50b6668d906e"
```

### 4. Start development server

You should now be able to run the application locally with:

```bash
npm run dev
```

If you navigate to [localhost:3000](http://localhost:3000), you should see an empty website that displays the current time. The time is requested from a locally running Cloudflare D1 database, via a [a serverless edge function](functions/api/time).

## Deploying your project to Cloudflare Pages

Cloudflare Pages allows you to deploy automatically from a GitHub repository. Let's set that up:

1. Make sure your project is uploaded to GitHub (or follow the [Deploy from your local machine](#deploy-from-your-local-machine) guide below instead).
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com/) and create a new account, or login to your existing Cloudflare account.
3. Press **Create application**, and then:
   - Switch to the **Pages** tab.
   - Press **Connect to git**
   - Select your repository
   - Choose a project name and production branch (usually `main`)
   - Configure the following build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
   - Press **Save and Deploy**

Cloudflare Pages will now automatically deploy your application after every commit to your **production branch**.

### Deploy from your local machine

If you don't want to automatically deploy from git, you can deploy by running the following command and following the instructions presented in your terminal to either create a new Cloudflare Pages project or deploy to an existing project.

```bash
npm run deploy
```

Whether or not you are using the automatic git deployment, you can always deploy from your local machine using the same command.


### Access your D1 database from Cloudflare Pages Functions

Once the application is deployed, we'll need to configure your website to use the database.

First, make sure you have created a local database by following the [**Getting Started**](#getting-started) guide.

Then, let's make the database available to the site hosted on Cloudflare Pages: 

1. Deploy the project and newly configured database by following the [Deploying your project to Cloudflare Pages](#deploying-your-project-to-cloudflare-pages) instructions above.
2. Log into your [Cloudflare dashboard](https://dash.cloudflare.com). 
3. Find your Pages project under **Workers & Pages**, and navigate to: 
   - **Settings**
   - **Functions**
   - **D1 database bindings**
4. Press **Get started**, and add the following binding:
   - Variable name: **DB**
   - D1 database: **your-database-name** (use the name from your `wrangler.toml`
5. Redeploy the project:
   ```bash
   npm run deploy
   ```

That should have done it! Your hosted application should now be able to access the D1 database.

## Working with the D1 SQLite database

If you followed the [Getting Started](#getting-started) and [Deploying your project to Cloudflare Pages](#deploying-your-project-to-cloudflare-pages) guides, you should now have a working web application that talks to an empty database.

TODO


## Working with API endpoints

The template contains one API endpoint: [`/api/time`](functions/api/time), which queries the database for the current time, and returns it to the client as a JSON response:
```ts
export const onRequest = async (context) => {
  // construct a query using the D1 bound to "context.env.DB"
  const query = context.env.DB.prepare(`SELECT DATETIME('now') as time`);
  // fetch and respond with data as JSON
  const data = await query.first();
  return Response.json(data);
};
```

The API endpoints are created by mirroring the desired URL as a file path under the [`/functions`](functions/) directory. 

For example, if we were creating an application for listing and creating products, you could create a file `/api/products.ts` to respond with a list of products when a request is made to `/api/products`. You can also use dynamic route parameters such as `/api/products/[id].ts`, which could return a single product when calling `/api/products/123` or `/api/products/456`:

```ts
// functions/products/[id].ts
export const onRequest = async (context) => {
  // read the value of [id] url fragment from "context.params"
  const productId = context.params.id
  // construct a query using the D1 bound to "context.env.DB"
  const query = context.env.DB
   .prepare(`SELECT * FROM products WHERE product_id = ?`)
   .bind(productId);
  // fetch and respond with data
  const data = await query.first();
  return Response.json(data);
};
```

Read more about Functions routing in the [official documentation](https://developers.cloudflare.com/pages/platform/functions/routing/).

## Working with Vite frontend

The frontend app is a normal, blank [Vite](https://vite-pages.pages.dev/) React Single Page Application (SPA). This means that the frontend is a "pure frontend": all the code runs in the user's browser, and not on a server.

Single Page Applications have tradeoffs: On one hand they are conceptually simpler, and if you have already learned plain JavaScript and React, they're quick to get started. On the other hand unlike with opinionated server-side rendering frameworks like Next.js or Remix, you need to decide how to load data from a server, and how to structure the navigation between pages in your application.

If you are new to React and are learning from scratch, it's worth considering starting with a Server-Side Rendering frameworks like [Remix](https://remix.run/) instead. In the future, when Remix Vite will start supporting Cloudflare, this template may be converted to a SSR-first approach.

### Fetching data with React Query

TODO

See [React Query documentation](https://tanstack.com/query/v3/docs/react/overview) for more information.

### Navigating with React Router

TODO

See [React Router documentation](https://reactrouter.com) for more information.

### Using other frameworks

TODO

### Using plain JavaScript

TODO

## License

MIT


