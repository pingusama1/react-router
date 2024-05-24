---
title: Deploying
order: 8
new: true
---

# Deploying

React Router apps can be deployed anywhere through bundler configuration.

Many hosts automatically detect React Router apps and can deploy them without additional configuration. You can also control the output to accommodate any hosting provider, see the [Vite Plugin][vite_plugin] for more information.

## Netlify SPA

[![Deploy SPA to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ryanflorence/templates&create_from_path=netlify-spa)

## Generic Static Hosting

First ensure your bundler plugin is configured without server rendering:

```tsx filename=vite.config.ts
import react from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
});
```

Run the build:

```shellscript nonumber
vite build
```

Now deploy the build output directory at `build/client`.

For instance, with cloudflare pages it's a single command:

```shellscript nonumber
npx wrangler pages deploy build/client
```

## Cloudflare Pages Single Page App

Configure vite:

```tsx filename=vite.config.ts
import { plugin as app } from "@react-router/vite";
import { cloudflare } from "@react-router/cloudflare";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    app({
      preset: cloudflare(),
    }),
  ],
});
```

Build and deploy:

```shellscript nonumber
npx react-router dev
npx react-router build
npx wrangler pages deploy
```

## AWS Lambda with SST

First [install SST][sst_install]:

```shellscript nonumber
curl -fsSL https://ion.sst.dev/install | bash
```

Init SST in your project root:

```shellscript nonumber
sst init
```

And then build and deploy:

```shellscript nonumber
npx react-router build
sst deploy
```

Note when using SST the dev command changes

```shellscript nonumber
sst dev react-router dev
```

## Vercel

```tsx filename=vite.config.ts
import { plugin as app } from "@react-router/vite";
import { vercel } from "@vercel/remix";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [app({ preset: vercel() })],
});
```

```shellscript nonumber
npx react-router build
vercel --prod
```

Or use their [GitHub Repo Integration][vercel_git].

[vercel_git]: https://vercel.com/new
[sst_install]: https://ion.sst.dev/docs/#cli

## Fly.io

TODO:

## Custom Node Server

Please reference the [Custom Server][custom_server] guide for deploying to any Node environment.

## TODO: add some others

[vite_plugin]: ../bundler/vite
