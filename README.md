## Welcome to the Blog Starter Kit with Multi-Language for Contento

This multi-language starter kit has a page builder template, header and footer navs, a basic collection of composable content blocks
and all you need for a blog plus the technical set up for multi-language content and routing using [Next-Intl](https://next-intl-docs.vercel.app/docs/getting-started). It’s designed to get you started using Contento for multi-language websites, and is built with a familiar and popular
tech stack ([Next.js](https://nextjs.org) & [Tailwind CSS](https://tailwindcss.com)).

There are examples of both dynamic multi-language content coming from Contento and static multi-lanuage content coming from locale dictionaries in the `messages` folder, which is ideal for content that is hard-coded and not editable in Contento.

## Getting Started

First, install all the required dependencies:

```bash
npm install
```

Then, rename the `.env.sample` file to `.env`.

In your [Contento Account Settings](https://app.contento.io/account/api-keys) create a new API Key for this site, copy the value given to you in the dialog
and then paste it into your `.env` file as the value of the `CONTENTO_API_KEY` key.

Now navigate to the Sites screen, and find your new site. Copy the ID of it from here, and paste it into your `.env` as
the value of the `CONTENTO_SITE_ID` key.

Next, load up your new site by clicking on it in the Sites screen, and then navigate to the Content panel. Click into
the Main Nav and copy the ID from the right hand side panel. Paste this into your `.env` as the value of the
`SITE_MAIN_NAV_ID` key. Do the same for the Footer Nav, and paste it as the value of the `SITE_FOOTER_NAV_ID` key.

At this point, you can run the development server and get coding:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy this repo is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Once deployed, make sure to update the domain name in your [Site Settings](https://app.contento.io/settings).

## Visual Preview

This project is pre-configured work with the [Contento Visual Preview](https://www.contento.io/docs/sdk/next#visual-preview),
simply go to the [Site Settings > Preview](https://app.contento.io/settings/preview) page, copy the value of the
auto-generated secret and add it into your `.env` as the value of the `CONTENTO_PREVIEW_SECRET` key.

You can use the Preview panel within Contento whilst you are developing the site as we have configured the preview
settings to use `http://localhost:3000` for the preview URL.

Once you have your site deployed however you will want to change this to your production domain so that your content
editors can use it.

## Learn More

To learn more about the tools we’ve used in this repo, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - the React framework we use to produce a static site.
- [Next-Intl Documentation](https://next-intl-docs.vercel.app/docs/getting-started) - the npm package used for internationalization.
- [Tailwind CSS Documentation](https://tailwindcss.com) - the CSS framework we use.
- [Vercel](https://vercel.com) - a simple way to deploy a Next.js site.
