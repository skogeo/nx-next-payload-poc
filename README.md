# Setting Up Nx Workspace with Next.js and Payload CMS

This guide will help you set up an Nx workspace with Next.js and Payload CMS for both `green` and `blue` apps.

## Project Structure

```
apps/
  green/
    nextjs/
      # Next.js app files
    payload/
      payload.config.ts
      main.ts
      # Payload CMS app files
  blue/
    nextjs/
      # Next.js app files
    payload/
      payload.config.ts
      main.ts
      # Payload CMS app files
libs/
  nextjs/
    # Shared libraries for Next.js apps
  payload/
    # Shared libraries for Payload CMS apps
```

## Prerequisites

- Node.js and npm installed
- Nx CLI installed globally

## Steps

### 1. Create a New Nx Workspace

If you haven't already, create a new Nx workspace:

```sh
npx create-nx-workspace@latest my-workspace
cd my-workspace
```

### 2. Add Necessary Nx Plugins

Add the Nx plugins for Next.js and Node:

```sh
npx nx add @nx/next
npx nx add @nx/node
```

### 3. Create the Directory Structure

Manually create the directories for the apps:

```sh
mkdir -p apps/green/nextjs apps/green/payload apps/blue/nextjs apps/blue/payload
```

### 4. Generate the `green-nextjs` App

Generate the Next.js app for the `green` project:

```sh
npx nx g @nx/next:app apps/green/nextjs --name=green-nextjs --e2eTestRunner=none
```

### 5. Generate the `blue-nextjs` App

Generate the Next.js app for the `blue` project:

```sh
npx nx g @nx/next:app apps/blue/nextjs --name=blue-nextjs --e2eTestRunner=none
```

### 6. Generate the `green-payload` App

Generate the Payload CMS app for the `green` project:

```sh
npx nx g @nx/node:app apps/green/payload --name=green-payload --framework=express --unitTestRunner=none --e2eTestRunner=none
```

### 7. Generate the `blue-payload` App

Generate the Payload CMS app for the `blue` project:

```sh
npx nx g @nx/node:app apps/blue/payload --name=blue-payload --framework=express --unitTestRunner=none --e2eTestRunner=none
```

### 8. Install Payload CMS

Install Payload CMS in the `green/payload` and `blue/payload` apps:

```sh
cd apps/green/payload
npm install payload
cd ../../../apps/blue/payload
npm install payload
```

### 9. Configure Payload CMS

Create a `payload.config.ts` file in both `green/payload` and `blue/payload` directories with the following content:

```ts
import { buildConfig } from 'payload/config';

export default buildConfig({
  collections: [
    // Define your collections here
  ],
});
```

Update the `main.ts` file in both `green/payload` and `blue/payload` directories to initialize Payload CMS:

```ts
import express from 'express';
import payload from 'payload';

require('dotenv').config();
const app = express();

app.use('/admin', payload.authenticate);

payload.init({
  secret: process.env.PAYLOAD_SECRET,
  express: app,
});

app.listen(3000, () => {
  console.log('Payload CMS is running on http://localhost:3000/admin');
});
```

### 10. Create the `libs` Directories

Create the shared libraries directories:

```sh
mkdir -p libs/nextjs libs/payload
```

### 11. Generate Libraries

Generate the libraries for `nextjs` and `payload`:

```sh
npx nx g @nx/next:lib libs/nextjs
npx nx g @nx/node:library libs/payload
```

## Running the Apps

You can now run the apps using Nx commands:

To update the Nx targets in the README according to the commands from the Nx plugins configuration, you can add the following section at the end of the README:

## Running the Apps

You can now run the apps using Nx commands:

- To build the `green-nextjs` app:

  ```sh
  npx nx build green-nextjs
  ```

- To build the `blue-nextjs` app:

  ```sh
  npx nx build blue-nextjs
  ```

- To develop the `green-nextjs` app:

  ```sh
  npx nx dev green-nextjs
  ```

- To develop the `blue-nextjs` app:

  ```sh
  npx nx dev blue-nextjs
  ```

- To start the `green-nextjs` app:

  ```sh
  npx nx start green-nextjs
  ```

- To start the `blue-nextjs` app:

  ```sh
  npx nx start blue-nextjs
  ```

- To serve static files for the `green-nextjs` app:

  ```sh
  npx nx serve-static green-nextjs
  ```

- To serve static files for the `blue-nextjs` app:

  ```sh
  npx nx serve-static blue-nextjs
  ```

- To run the `green-payload` app:

  ```sh
  npx nx serve green-payload
  ```

- To run the `blue-payload` app:
  ```sh
  npx nx serve blue-payload
  ```
