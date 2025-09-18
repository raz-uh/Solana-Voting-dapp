# VotingDapp: A Decentralized Polling dApp

**VotingDapp** is a decentralized polling application built on the Solana blockchain, allowing users to create polls, register candidates, and vote in a transparent and secure manner. It leverages modern technologies and blockchain infrastructure to provide an interactive and decentralized voting experience.

## Features

- **Create Polls**: Users can create polls with descriptions, start dates, and end dates.
- **Register Candidates**: Candidates can register to participate in active polls.
- **Vote on Polls**: Users can cast votes for registered candidates in active polls.
- **Real-Time Updates**: Poll details and candidate lists are fetched directly from the blockchain.
- **Wallet Integration**: Seamlessly connect and interact using Solana-compatible wallets like Phantom.
- **Toast Notifications**: Get feedback on transactions, including success, pending, or failure statuses.

---

## Pages

### 1. **Homepage**
   - Displays a welcome interface and navigation links for creating polls or voting.

### 2. **Create Poll Page**
   - Form-based interface for creating new polls with fields for:
     - **Poll Description**: A brief description of the poll's purpose.
     - **Start Date**: The start date and time of the poll.
     - **End Date**: The end date and time of the poll.

### 3. **Register Candidate Modal**
   - Allows candidates to register for a specific poll.
   - Input field for entering the candidate’s name.
   - Accessible through an active poll's detail page.

### 4. **Voting Page**
   - Displays active polls and their registered candidates.
   - Allows users to vote for their preferred candidate.
   - Displays real-time voting statistics for transparency.

---

## Technologies Used

- **Frontend**:
  - Next.js
  - TypeScript
  - React
  - Redux Toolkit
  - Tailwind CSS
  - React Icons
- **Blockchain Integration**:
  - Solana Web3.js
  - @coral-xyz/anchor
  - Solana Wallet Adapter
  - Phantom Wallet
- **Notifications**:
  - React Toastify

---

## Deployment and Usage Status

- The smart contract is deployed to the Solana devnet.
- The frontend is fully functional and interacts seamlessly with the deployed contract.
- Users can create polls, register candidates, and vote using a Solana-compatible wallet.
- Real-time updates and toast notifications provide feedback on blockchain transactions.

---

## Testing

- Basic test setup is present, but comprehensive tests covering all functionalities are limited.
- Additional tests are recommended for production readiness.

---

## Important Note

**Wallet Required**: Before using this dApp, ensure you have a Solana-compatible wallet like Phantom installed. You can download it [here](https://phantom.app/).

**Default Solana Cluster**: The application assumes a local Solana network for development. Ensure your Solana CLI is set to the correct cluster.

```bash
solana config set --url http://127.0.0.1:8899
```

## Installation Guide
1. Clone the Repository

```bash
git clone https://github.com/raaz-uh/VotingDapp
cd VotingDapp
```

2. Install Dependencies
```bash
npm install
```

3. Set Up Environment Variables
Create a .env file in the root directory and add the following variable for local development:

```sh
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8899
```

4. Run Local Solana Test Validator
If not already running, start a Solana test validator on your local machine:

```bash
solana-test-validator
```

5. Launch the Development Server
```bash
npm run dev
```

6. Build for Production
For production, build and start the application:

```bash
npm run build
npm start
```

## Usage
* Open the application in your browser: http://localhost:3000.
    * Connect your wallet using the Wallet Adapter button.
    * Create a poll, register candidates, and vote directly on the blockchain.

* pages/:
    * index.tsx: Homepage.
    * create.tsx: Poll creation page.

* services/:
    * blockchain.service.ts: Functions for interacting with the blockchain (e.g., createPoll, registerCandidate).

* utils/:
    * Types and helper functions for application logic.

## Contributing
Contributions are welcome! If you have suggestions, feature requests, or bug reports, please create an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
