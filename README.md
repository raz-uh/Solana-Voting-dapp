# Solana Voting Dapp

## Deployment on Netlify

### Issue:
When deploying the Solana Voting Dapp on Netlify, you may encounter the following build error:

```
TypeError: Endpoint URL must start with `http:` or `https:`.
```

This error occurs because the environment variable `NEXT_PUBLIC_RPC_URL` is either missing or empty during the build process, causing the app to receive an invalid RPC URL.

### Solution:

1. **Set the Environment Variable in Netlify:**

   - Go to your Netlify dashboard.
   - Select your site.
   - Navigate to **Site settings** > **Build & deploy** > **Environment**.
   - Add a new environment variable:
     - **Key:** `NEXT_PUBLIC_RPC_URL`
     - **Value:** `https://api.devnet.solana.com` (or your preferred Solana RPC endpoint URL)
   - Save the changes.

2. **Code Safety Check:**

   The app code has been updated to ensure that if `NEXT_PUBLIC_RPC_URL` is empty or missing, it falls back to the default RPC URL `https://api.devnet.solana.com`.

3. **Build Settings:**

   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Redeploy:**

   Trigger a new deploy on Netlify after setting the environment variable.

### Additional Notes:

- Ensure that the RPC URL starts with `http://` or `https://`.
- If you use other environment variables, make sure they are also set in Netlify.
- For local development, you can set `NEXT_PUBLIC_RPC_URL` in a `.env.local` file.

---

If you follow these steps, the build error related to the RPC URL should be resolved, and your Solana Voting Dapp should deploy successfully on Netlify.
