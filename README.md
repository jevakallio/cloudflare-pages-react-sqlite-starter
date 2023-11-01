# Vite + Cloudflare Pages + D1 Template

This is a minimal, hopefully beginner-friendly template you can use as a starting point for creating simple, database-backed React applications and hosting them for free on [Cloudflare Pages](https://pages.cloudflare.com/).

This template contains the following components
- **Frontend:** ⚡️ React/Vite application ([`/app`](app/)) with minimal libraries:
  - React Query for data fetching
  - React Router for page navigations
- **Backend:** Cloudflare Pages Functions ([`/functions`](functions/))
- **Database:** Cloudflare D1 SQLite database

## Getting Started

### 1. Install dependencies

Clone or fork this repository, and run:
```bash
npm install
```

### 2. Create local D1 database

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

### 3. Start development server

You should now be able to run the application locally with:

```bash
npm run dev
```

If you navigate to [localhost:3000](http://localhost:3000), you should see an empty website that displays the current time.


## Deploying your project to Cloudflare Pages

Cloudflare Pages allows you to deploy automatically from a GitHub repository. Let's set that up:

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com/) and create a new account, or login to your existing Cloudflare account.
2. Press **Create application**, and then:
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

TODO...


# TODO

- [ ] Deal with TS/JS
- [ ] Deal with DOM lib in functions
- [ ] Finish database tutorial
- [ ] Functions tutorial
- [ ] Data fetching
- [ ] Routing


