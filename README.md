
# CollabEd Freelance Website

This is a code bundle for CollabEd Freelance Website. The original project is available at https://www.figma.com/design/R6SdgWu9qDPSnL12N9WQda/CollabEd-Freelance-Website.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Deployment to Render

This project is configured for static site deployment on Render.

### Prerequisites
- A Render account (sign up at https://render.com)
- Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

1. **Push your code to Git**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create a new Static Site on Render**
   - Go to your Render dashboard
   - Click "New +" and select "Static Site"
   - Connect your Git repository
   - Render will automatically detect the `render.yaml` configuration

3. **Configure the deployment** (if not using render.yaml)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: Static Site

4. **Deploy**
   - Click "Create Static Site"
   - Render will build and deploy your site automatically
   - Your site will be available at a `*.onrender.com` URL

### Manual Configuration (Alternative)

If you prefer to configure manually instead of using `render.yaml`:
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment**: Static Site

The `render.yaml` file is already configured with the correct settings, so Render should automatically detect and use it.
  