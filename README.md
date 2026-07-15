# Abdul Rafay Portfolio

A sober, interactive portfolio for a Deep Learning Engineer, built with Next.js, TypeScript, Motion, and custom CSS.

## Included

- Responsive one-page portfolio
- Dark and light themes
- Animated impact metrics
- Filterable project case studies
- Accessible slide-over project details
- Career timeline
- Skills/capabilities grid
- Resume download
- Email copy button
- SEO metadata
- Vercel-ready configuration

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Personalize before publishing

Most editable content lives in:

```text
lib/portfolio.ts
```

Add your GitHub and LinkedIn URLs here:

```ts
export const profile = {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile",
};
```

Both links remain hidden until valid values are added.

Replace or extend project descriptions in the `projects` array. The downloadable resume is located at:

```text
public/Abdul_Rafay_Resume.pdf
```

## Deploy on Vercel

1. Create a new GitHub repository.
2. Push this project to the repository.
3. Sign in to Vercel and select **Add New → Project**.
4. Import the GitHub repository.
5. Keep the detected Next.js settings and deploy.

Vercel will create a public `vercel.app` address and redeploy automatically after future GitHub pushes.

## Git commands

```bash
git init
git add .
git commit -m "Build portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

## Design notes

The visual system intentionally avoids heavy neon, excessive gradients, and constant motion. Interactions are subtle, keyboard-accessible, and respectful of reduced-motion preferences.
