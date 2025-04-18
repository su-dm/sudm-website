# SUDM Website

## Vercel Deployment Instructions

Follow these steps to properly deploy this application on Vercel:

1. Push your code with the new Vercel configuration files to your Git repository.

2. Visit [Vercel](https://vercel.com/) and sign in with your GitHub account.

3. Click "Add New" > "Project".

4. Import your repository.

5. Configure the project:
   - Framework preset: Leave as "Other"
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. Add Environment Variables (if needed)

7. Click "Deploy"

## Local Development

```
npm install
npm run dev
```

Visit http://localhost:5000 to see your application.