# BlockAcademia

A decentralized blockchain education platform built on the Internet Computer Protocol (ICP). BlockAcademia enables users to learn, share, and discover blockchain, cryptocurrency, and decentralized technology tutorials through a community-driven platform with DAO governance.

## 🚀 Features

### Core Platform
- **Tutorial Management**: Create, publish, and discover blockchain tutorials
- **User Authentication**: Internet Identity integration for secure access
- **Community-Driven Content**: User-generated educational content
- **Responsive Design**: Modern UI with dark/light mode support

### DAO Governance
- **Decentralized Approval**: Community voting system for tutorial approval
- **Member Management**: DAO membership with voting rights
- **Democratic Process**: Community-driven content curation

### Educational Focus
- **Blockchain Topics**: Smart contracts, DeFi, Web3, and more
- **Crypto Education**: Cryptocurrency fundamentals and advanced concepts
- **Decentralized Technologies**: IPFS, DAOs, NFTs, and emerging tech
- **Practical Tutorials**: Hands-on learning with real-world examples

## 🏗️ Architecture

### Backend (Motoko)
- **Main Canister** (`BlockAcademia_backend`): Core platform functionality
- **DAO Canister** (`BlockAcademia_dao`): Governance and voting system
- **Stable Storage**: Persistent data using stable variables

### Frontend (React + TypeScript)
- **Modern Stack**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for global state
- **IC Integration**: Connect2IC for seamless Web3 UX

## 📁 Project Structure

```
BlockAcademia/
├── src/
│   ├── BlockAcademia_backend/
│   │   ├── main.mo                 # Main canister logic
│   │   ├── Dao.mo                  # DAO governance canister
│   │   ├── types/
│   │   │   └── Types.mo            # Type definitions
│   │   └── libs/
│   │       ├── FunctionalStableHashMap.mo
│   │       └── Rand.mo
│   └── BlockAcademia_frontend/
│       ├── src/
│       │   ├── App.tsx             # Main app component
│       │   ├── pages/              # Page components
│       │   ├── components/         # Reusable components
│       │   └── store/              # State management
│       ├── package.json
│       ├── vite.config.ts
│       └── tailwind.config.js
├── dfx.json                        # DFX configuration
├── package.json                    # Root package configuration
└── README.md
```

## 🛠️ Getting Started

### Prerequisites
- [DFX](https://internetcomputer.org/docs/current/developer-docs/setup/install/) (>= 0.15.0)
- [Node.js](https://nodejs.org/) (>= 16.0.0)
- [npm](https://www.npmjs.com/) (>= 7.0.0)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BlockAcademia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local replica**
   ```bash
   dfx start --background
   ```

4. **Deploy canisters**
   ```bash
   dfx deploy
   ```

5. **Start development server**
   ```bash
   npm start
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Workflow

```bash
# Generate type declarations
dfx generate

# Build frontend
npm run build

# Deploy to local network
dfx deploy --network local

# Deploy to IC mainnet
dfx deploy --network ic
```

## 🎯 Usage

### For Learners
1. **Connect Wallet**: Use Internet Identity to authenticate
2. **Browse Tutorials**: Explore blockchain and crypto tutorials
3. **Learn & Engage**: Read content, leave comments, rate tutorials
4. **Join Community**: Participate in the blockchain learning ecosystem

### For Educators
1. **Create Account**: Register with Internet Identity
2. **Submit Tutorial**: Write and submit blockchain educational content
3. **Community Review**: Tutorials undergo community approval process
4. **Share Knowledge**: Help others learn blockchain technology

### For DAO Members
1. **Gain Membership**: Become a DAO member through community process
2. **Vote on Content**: Participate in tutorial approval voting
3. **Govern Platform**: Help shape the future of BlockAcademia
4. **Community Leadership**: Guide educational content standards

## 🔧 Technical Details

### Smart Contract Functions

#### Main Canister (`BlockAcademia_backend`)
- `signUp()`: User registration
- `uploadTutorial()`: Submit new tutorial
- `getAprovedPublication()`: Retrieve approved tutorials
- `votePublication()`: Vote on tutorial approval
- `deployDaoCanister()`: Initialize DAO governance

#### DAO Canister (`BlockAcademia_dao`)
- `votePublication()`: Process tutorial votes
- `addMember()`: Add new DAO members
- `getPrincipalMembers()`: Get voting members list

### Frontend Components
- **Home**: Landing page with featured tutorials
- **Tutorials**: Browse and search educational content
- **New Tutorial**: Create and submit tutorials
- **Dashboard**: Admin/DAO member interface
- **Auth**: User authentication and registration

## 🌐 Deployment

### Local Development
```bash
dfx start --background
dfx deploy
npm start
```

### IC Mainnet
```bash
dfx deploy --network ic --with-cycles 1000000000000
```

## 🤝 Contributing

We welcome contributions to BlockAcademia! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on [Internet Computer Protocol](https://internetcomputer.org/)
- Inspired by the need for decentralized blockchain education
- Thanks to the ICP developer community for tools and support

## 📞 Support

- **Documentation**: [Internet Computer Docs](https://internetcomputer.org/docs/)
- **Community**: [ICP Developer Forum](https://forum.dfinity.org/)
- **Issues**: [GitHub Issues](https://github.com/your-repo/BlockAcademia/issues)

---

**BlockAcademia** - Empowering blockchain education through decentralized learning 🎓⛓️