# tears

[![Netlify Status](https://api.netlify.com/api/v1/badges/c84790b2-6721-4357-bb47-4f5a14a36f28/deploy-status)](https://app.netlify.com/sites/cl-deds/deploys)

Welcome to the 2020 - 2021 Creative Labs Dedications (deds)! Deds is a yearly ritual
at CL where we write to all our seniors about why we love them. This repository is a
website that encapsulates our love to our amazing seniors.

We will miss you all 😢

## Getting Started

We used `Next.js`, `Typescript`, and `Sass`.

We prefer [`yarn`](https://classic.yarnpkg.com/en/docs/install#mac-stable) as 
our package manager.

The basic commands to get this repository and start are:

```sh
$ git clone https://github.com/BryanPan342/tears.git
$ cd tears
$ yarn install
$ yarn dev
```

## Organization

Below is the organization for this repository. 

```
root
├── components
│   ├── Button.tsx
│   ├── Envelope.tsx
│   ├── Layout.tsx
│   └── RecordPlayer.tsx
├── pages
│   ├── _app.tsx
│   ├── [person].tsx
|   └── index.tsx
├── public
│   ├── songs
│   │   ├── [person]
│   │   │   ├── music.mp3
│   │   │   └── vinyl-image.png
│   │   └── ...
├── utils
│   ├── node
│   │   ├── index.ts
│   │   └── node.ts
│   └── ...
├── styles
│   ├── globals.scss
│   └── ...
└── ...
```

### Components

All reusuable components go inside the `components/` directory.

Notable components:
- `Layout.tsx`: The `Layout` component houses the layout for each page. Every page
must use the `Layout` component
- `RecordPlayer`: The `RecordPlayer` component is used on every screen and features
the playing music and positioning itself on the webpage

### Pages

All pages are registered in the `pages/` directory.

Notable pages:
- `[person].tsx`: This component is a dynamic route that creates a page for each
senior (i.e. `/arjun`)
- `index.tsx`: This component is the root route (i.e. `/`)

### Public

All assets are registered in the `public/` directory.

Notable assets:
- `songs/`: The songs for each senior is organized by the first name (i.e. `arjun/`)
  - `music.mp3`: The song dedicated to each senior
  - `vinyl-image.png`: The album cover for the song

### Utils

All utility functions are registered in the `utils/` directory.

Notable utilities:
- `node/`: This subdirectory is **necessary** to get an import of `../utils` to
function properly. If a page calls a `node.js` function, it will crash. Therefore, 
we need to separate all the `node.js` calls into a different section.
- `node/notion.ts`: This file contains all our Notion API calls to get the data to 
populate our pages
