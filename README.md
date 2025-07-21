# 🧠 Internal Knowledge Base

A modern, AI-powered knowledge management system built with **Next.js**, **Groq**, **Supabase**, and **RAG (Retrieval Augmented Generation)**. This application enables organizations to create a shared knowledge base where users can ask questions and get accurate answers from company documents, policies, and technical documentation.

![Knowledge Base Demo](https://img.shields.io/badge/Demo-Live-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Groq](https://img.shields.io/badge/Groq-Llama%204-orange) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

## ✨ Features

### 🤖 **Advanced AI Chat**
- **Groq-powered responses** with Llama 4 Scout (ultra-fast inference)
- **RAG (Retrieval Augmented Generation)** for accurate, context-aware answers
- **HyDE (Hypothetical Document Embeddings)** for improved retrieval accuracy
- **Smart classification** - only uses RAG for questions, not statements

### 📚 **Knowledge Management**
- **Shared document storage** - all users access the same knowledge base
- **Vector embeddings** stored in Supabase PostgreSQL
- **Semantic search** through company documents
- **Support for multiple document types** (policies, technical docs, product specs)

### 🔐 **Authentication & Security**
- **Secure user authentication** with NextAuth.js
- **Supabase integration** for user management
- **JWT sessions** with proper security
- **Protected routes** and API endpoints

### 🎨 **Modern UI/UX**
- **Professional design** with gradients and glass morphism
- **Responsive interface** - works on desktop and mobile
- **Real-time chat** with loading states and animations
- **Knowledge base branding** with clear purpose communication

### ⚡ **Performance**
- **Lightning-fast responses** (~1-3 seconds with Groq)
- **Efficient vector search** in PostgreSQL
- **Optimized embeddings** with Google's text-embedding-004
- **Serverless deployment** on Vercel

## 🚀 Live Demo

**Try it now:** [https://ai-sdk-preview-internal-knowledge-base-example-qd8atwsp1.vercel.app](https://ai-sdk-preview-internal-knowledge-base-example-qd8atwsp1.vercel.app)

### Sample Questions to Try:
- "What's the company vacation policy?"
- "How do I authenticate with the API?"
- "What are the system requirements?"
- "What's the expense reimbursement process?"

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS | Modern React framework with styling |
| **AI/LLM** | Groq (Llama 4 Scout) | Ultra-fast AI inference |
| **Embeddings** | Google text-embedding-004 | High-quality vector embeddings |
| **Database** | Supabase (PostgreSQL) | Vector storage and user management |
| **Authentication** | NextAuth.js | Secure user sessions |
| **Deployment** | Vercel | Serverless hosting with global CDN |
| **Animations** | Framer Motion | Smooth UI transitions |

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- **npm/yarn/pnpm** package manager
- **Groq API key** (get from [console.groq.com](https://console.groq.com))
- **Google AI API key** (get from [aistudio.google.com](https://aistudio.google.com))
- **Supabase project** (create at [supabase.com](https://supabase.com))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/internal-knowledge-base.git
cd internal-knowledge-base
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Groq API key for fast AI inference
GROQ_API_KEY=your-groq-api-key

# Google AI API key for embeddings
GOOGLE_GENERATIVE_AI_API_KEY=your-google-api-key

# NextAuth secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your-auth-secret

# Supabase PostgreSQL connection string
POSTGRES_URL=your-supabase-postgres-url

# Optional: Vercel Blob for file uploads
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

### 4. Set Up Database

The application uses Supabase PostgreSQL with the following schema:

```sql
-- Users table
CREATE TABLE "User" (
  email VARCHAR(64) PRIMARY KEY NOT NULL,
  password VARCHAR(64)
);

-- Chat history
CREATE TABLE "Chat" (
  id TEXT PRIMARY KEY NOT NULL,
  "createdAt" TIMESTAMP NOT NULL,
  messages JSON NOT NULL,
  author VARCHAR(64) NOT NULL REFERENCES "User"(email)
);

-- Document chunks with vector embeddings
CREATE TABLE "Chunk" (
  id TEXT PRIMARY KEY NOT NULL,
  "filePath" TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding REAL[] NOT NULL
);
```

### 5. Upload Sample Documents

Run the document upload script to populate your knowledge base:

```bash
npx tsx upload-documents.ts
```

This will add sample documents including:
- Company handbook (policies, benefits, remote work)
- Technical documentation (API, deployment, database)
- Product specifications (features, requirements, security)

### 6. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your knowledge base!

## 📖 How It Works

### RAG Pipeline

1. **Document Processing**: Documents are split into chunks and embedded using Google's text-embedding-004
2. **Storage**: Chunks and embeddings are stored in Supabase PostgreSQL
3. **Query Processing**: User questions are classified and processed through HyDE
4. **Retrieval**: Relevant document chunks are found using cosine similarity
5. **Generation**: Groq's Llama 4 Scout generates responses with retrieved context

### Architecture Flow

```
User Question → Classification → HyDE → Vector Search → Context Injection → AI Response
```

### Key Components

- **RAG Middleware**: Handles retrieval and context injection
- **Chat Interface**: Modern UI with real-time messaging
- **Authentication**: Secure user management with NextAuth
- **Vector Database**: Efficient similarity search in PostgreSQL

## 🔧 Configuration

### AI Models

- **Main Chat**: `meta-llama/llama-4-scout-17b-16e-instruct` (Groq)
- **Classification**: `llama-3.1-8b-instant` (Groq)
- **Embeddings**: `text-embedding-004` (Google)

### Customization

You can customize the knowledge base by:

1. **Adding Documents**: Use the upload script with your own content
2. **Modifying UI**: Update components in `/components`
3. **Changing Models**: Update model names in `/ai/index.ts`
4. **Styling**: Modify Tailwind classes for different branding

## 📁 Project Structure

```
├── ai/                     # AI configuration and RAG middleware
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication pages and logic
│   ├── (chat)/            # Chat interface and API routes
│   └── db.ts              # Database functions
├── components/            # React components
├── drizzle/              # Database migrations
├── utils/                # Utility functions
├── schema.ts             # Database schema
└── upload-documents.ts   # Document upload script
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Set Environment Variables** in Vercel dashboard:
   - `GROQ_API_KEY`
   - `GOOGLE_GENERATIVE_AI_API_KEY`
   - `AUTH_SECRET`
   - `POSTGRES_URL`

### Alternative Deployments

- **Railway**: Great for full-stack apps
- **DigitalOcean**: App Platform
- **AWS**: Amplify or EC2
- **Google Cloud**: Cloud Run

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vercel** for the AI SDK and hosting platform
- **Groq** for ultra-fast AI inference
- **Supabase** for the database and authentication
- **Google** for high-quality embeddings
- **Next.js** team for the amazing framework

## 📞 Support

- **Documentation**: [AI SDK Docs](https://sdk.vercel.ai/docs)
- **Issues**: [GitHub Issues](https://github.com/your-username/internal-knowledge-base/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/internal-knowledge-base/discussions)

---

**Built with ❤️ using the Vercel AI SDK**