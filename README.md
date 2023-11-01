<!-- omit in toc --> 
# Cloudflare Pages + D1 SQLite + React Template

⚠️ **Work in Progress** (usable, but not yet polished and fully documented)

This is a minimal, hopefully beginner-friendly template you can use as a starting point for creating simple, database-backed React applications and hosting them on [Cloudflare Pages](https://pages.cloudflare.com/).

**Cloudflare Pages** is a hosting service for websites and applications. Together with the [Cloudflare D1](https://developers.cloudflare.com/d1/learning/local-development/) serverless database, you can host full-stack applications very cheaply, or for free.

<!-- omit in toc -->
## Table of Contents

- [What's included?](#whats-included)
- [Why this, why now?](#why-this-why-now)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Fork and clone this repository](#1-fork-and-clone-this-repository)
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
- **Frontend:** ⚡️ React + [Vite](https://vitejs.dev/) application with minimal libraries (see code: [`/app`](app/)).
- **Backend:**  [Cloudflare Pages Functions](https://pages.cloudflare.com[) (see code: [`/functions`](functions/))
- **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/learning/local-development/) SQLite database.

All of the code is written in TypeScript, but you can easily [convert it to plain JavaScript instead](#using-plain-javascript).

## Why this, why now?

Hosting serious, production-grade websites has never been easier: Companies like [Vercel](https://vercel.com), [Netlify](https://netlify.com) and [Render](https://render.com) make it simple to host a static or a server-rendered website. Hosting databases is also easier than ever, using [PlanetScale](https://planetscale.com), [Neon](https://neon.tech), [Railway](https://railway.app), or others.

For professional software engineers, these platforms make day-to-day work a breeze. However, for beginners and tinkerers, navigating the myriad of options, integrating different parts of the stack and understanding which parts of their offering are necessary for your use case can be confusing.

[Cloudflare Pages](https://pages.cloudflare.com) and [Cloudflare D1](https://developers.cloudflare.com/d1/learning/local-development/) are a great combination for hosting interactive, dynamic websites and applications for very cheaply, or in many cases, for free. You can write and deploy the frontend, backend and database to the cloud using just your favorite JavaScript framework and a serverless SQLite-compatible database. If you already know these tools, you can focus on programming your application instead of understanding different hosting solutions.

## Getting Started

### Prerequisites

For local development, you'll need a recent version of [Node.js](https://nodejs.org/en). 

To deploy the project to the internet, you'll be prompted to create a free [Cloudflare](https://pages.cloudflare.com/) account if you don't yet have one. 

### 1. Fork and clone this repository

You can fork this template to your own account by pressing the [**Use this template**](https://github.com/new?template_name=cloudflare-pages-react-sqlite-starter&template_owner=jevakallio) button, and then clone the created repository.

If you are just trying things out, you can clone this repository directly, but before deploying to Cloudflare pages you should fork it to your own account so you can [configure automatic deployments](#deploying-your-project-to-cloudflare-pages)

### 2. Install dependencies

Having cloned the repository locally, run:
```bash
npm install
```

### 3. Create local D1 database

Run the following command:

```bash
npx wrangler d1 create <your-database-name>
```

If you haven't yet logged into your Cloudflare account, you will be prompted to do so now. If you don't yet have an account, you can create one at this point.

Once the command completes, it will print a D1 database configuration into your terminal. Copy it and add it to your [`wrangler.toml`](./wrangler.toml) file in the project root directory:

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

If you navigate to [localhost:3000](http://localhost:3000), you should see an empty website that displays the current time. The time is requested from a locally running Cloudflare D1 database, via [a serverless edge function](functions/api/time).

You can now start working on your application. To continue reading, follow either the [deployment guide](#deploying-your-project-to-cloudflare-pages) or start by [defining a database schema](#working-with-the-d1-sqlite-database) locally.

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

Cloudflare Pages will now automatically deploy your application after every commit to the **production branch** you chose above.

### Deploy from your local machine

If you don't want to automatically deploy from git, you can deploy by running the following command below:

```bash
npm run deploy
```

Follow the instructions presented in your terminal. You will choose to either create a new Cloudflare Pages project or deploy to an existing project.

Whether or not you are using the automatic git deployment, you can always deploy from your local machine using the same `npm run deploy` command.

### Access your D1 database from Cloudflare Pages Functions

Once the application is deployed, you'll need to configure your website to use the database.

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

If you have any question about Functions routing, read in the [official Cloudflare documentation](https://developers.cloudflare.com/pages/platform/functions/routing/).

## Working with Vite frontend

The frontend app is a standard blank [Vite](https://vite-pages.pages.dev/) React Single Page Application (SPA). This means that the frontend is a "pure frontend": all the code runs in the user's browser, and not on a server.

If you have already learned plain JavaScript and React, you already know everything you need to get started. 

However, unlike opinionated server-side frameworks like Next.js or Remix, a plain React application it up to you to decide how to load data from a server, and how to structure the navigation between pages in your application.

To make these tasks easier, this template includes two libraries: [React Query](https://tanstack.com/query/v3/docs/react/overview) and [React Router](https://reactrouter.com). 

These libraries are optional, and you can choose not to use them. But if you do, read on for more information.

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


