# Solana Voting Dapp

A decentralized voting application built on the Solana blockchain, allowing users to create polls, register candidates, and vote securely using their Solana wallets.

## Features

- **Decentralized Polls**: Create and participate in polls stored on the Solana blockchain
- **Wallet Integration**: Connect Solana wallets (Phantom, Solflare, etc.) for secure authentication
- **Candidate Registration**: Register candidates for polls with unique IDs
- **Secure Voting**: Vote once per poll with blockchain-verified transactions
- **Real-time Updates**: View poll results and candidate vote counts instantly
- **Responsive UI**: Modern, mobile-friendly interface built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Blockchain**: Solana Web3.js, Anchor Framework
- **State Management**: Redux Toolkit, React Query
- **Wallet Integration**: Solana Wallet Adapter
- **Smart Contract**: Rust (Anchor)
- **Testing**: Jest, Vitest

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Rust** (latest stable version)
- **Anchor CLI** (for Solana smart contract development)
- **Solana CLI** (for local blockchain development)
- **Git**

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd voting-dapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
   ```

4. **Build the Anchor program:**
   ```bash
   npm run anchor-build
   ```

## Usage

1. **Start local Solana validator:**
   ```bash
   npm run anchor-localnet
   ```

2. **Deploy the smart contract (in a new terminal):**
   ```bash
   npm run anchor deploy
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

5. **Connect your Solana wallet** and start creating polls or voting!

## Development

### Project Structure

```
voting-dapp/
├── anchor/                 # Anchor smart contract
│   ├── programs/
│   │   └── votingdapp/     # Rust smart contract code
│   └── tests/              # Smart contract tests
├── src/
│   ├── app/                # Next.js app directory
│   │   ├── components/     # React components
│   │   ├── services/       # Blockchain interaction services
│   │   └── utils/          # Utility functions
│   └── idl/                # Anchor IDL files
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run anchor` - Run Anchor commands
- `npm run anchor-build` - Build Anchor program
- `npm run anchor-test` - Run Anchor tests
- `npm run anchor-localnet` - Start local Solana network

### Smart Contract Development

The smart contract is located in `anchor/programs/votingdapp/src/`. Key instructions:

- `initialize`: Set up the voting program
- `create_poll`: Create a new poll with description and time range
- `register_candidate`: Register a candidate for a poll
- `vote`: Cast a vote for a candidate

## Deployment

### Local Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

### Netlify Deployment

#### Issue: RPC URL Error
When deploying to Netlify, you may encounter:
```
TypeError: Endpoint URL must start with `http:` or `https:`.
```

This occurs when `NEXT_PUBLIC_RPC_URL` is missing or empty.

#### Solution:

1. **Set Environment Variable in Netlify:**
   - Go to your Netlify dashboard
   - Select your site
   - Navigate to **Site settings** > **Build & deploy** > **Environment**
   - Add:
     - **Key:** `NEXT_PUBLIC_RPC_URL`
     - **Value:** `https://api.devnet.solana.com` (or your preferred RPC URL)

2. **Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

3. **Redeploy** after setting the environment variable.

#### Additional Notes:
- Ensure RPC URL starts with `http://` or `https://`
- For production, use mainnet RPC endpoints
- Set other required environment variables as needed

### Smart Contract Deployment

To deploy the smart contract to Solana devnet/mainnet:

1. Configure Solana CLI for the desired network:
   ```bash
   solana config set --url https://api.devnet.solana.com
   ```

2. Build and deploy:
   ```bash
   anchor build
   anchor deploy
   ```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
