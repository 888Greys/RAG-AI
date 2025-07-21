# 🎓 KCA University AI Knowledge Base

A modern, AI-powered knowledge management system specifically built for **KCA University students**. Get instant answers about admission requirements, library services, APA formatting, and everything related to KCA University life. Built with **Next.js 15**, **Groq AI**, **PostgreSQL**, and **RAG (Retrieval Augmented Generation)**.

![KCA University AI](https://img.shields.io/badge/KCA-University%20AI-blue) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Groq](https://img.shields.io/badge/Groq-Llama%204%20Scout-orange) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-green) ![Preview](https://img.shields.io/badge/Status-Preview-yellow)

## 🚧 Preview Version - Developer Message

**Hey KCA Students!** This app is currently in preview and we're working hard to upload all KCA University documents. Soon, it will know everything about KCA University. The developer is quite busy, but if you're willing to contribute documents or help improve the system, you're very welcome!

### 📞 Get In Touch

- **📱 WhatsApp**: [+254715558014](https://wa.me/254715558014)
- **💻 GitHub**: [888Greys/RAG-AI](https://github.com/888Greys/RAG-AI)
- **🤝 Open Source**: Contributions welcome!

### 🎯 Our Vision

To create the most comprehensive, AI-powered knowledge base for KCA University students. A single place where any student can get instant, accurate answers about university life, academics, services, and procedures. Together, we can make studying at KCA easier for everyone!

## ✨ Features

### 🤖 **Lightning Fast AI Responses**
- **Groq-powered responses** with Llama 4 Scout (1-3 second responses)
- **RAG (Retrieval Augmented Generation)** for accurate, context-aware answers
- **HyDE (Hypothetical Document Embeddings)** for improved document retrieval
- **Smart classification** - determines when to use knowledge base vs general chat

### 📚 **KCA University Knowledge**
- **Admission Information** - Requirements, deadlines, and processes
- **Library & E-Library Help** - Access guides and research resources
- **APA Formatting Assistant** - APA 7th edition citations and guidelines
- **Student Services** - Information about university services and procedures
- **Academic Resources** - Course information and academic support

### 🔐 **Secure Authentication**
- **NextAuth.js integration** with secure user sessions
- **PostgreSQL user management** with encrypted passwords
- **Protected routes** and personalized chat history
- **Session persistence** across devices

### 🎨 **Mobile-First Design**
- **Responsive interface** - Perfect for smartphones and tablets
- **Modern UI/UX** with gradients and smooth animations
- **Dark/Light mode** support
- **Optimized for students on the go**

### ⚡ **Performance & Reliability**
- **Ultra-fast responses** with Groq's inference engine
- **Efficient vector search** in PostgreSQL
- **Edge deployment** on Vercel for global access
- **Optimized for mobile networks**

## 🚀 Live Demo

**Try it now:** [KCA University AI Assistant](https://ai-sdk-preview-internal-knowledge-base-example-npj2mhcg1.vercel.app)

### Sample Questions to Try:
- "How do I access the KCA University e-library?"
- "What are the admission requirements for KCA University?"
- "How do I format citations in APA 7th edition?"
- "What student services are available at KCA University?"
- "How do I apply for accommodation at KCA?"
- "What are the library opening hours?"

## 🛠️ Complete Technology Stack

### Frontend & UI
| Technology | Purpose | Category |
|------------|---------|----------|
| **Next.js 15** | React Framework | Frontend |
| **React 19** | UI Library | Frontend |
| **TypeScript** | Type Safety | Language |
| **Tailwind CSS** | Styling | Styling |
| **Framer Motion** | Animations | UI/UX |

### AI & Machine Learning
| Technology | Purpose | Category |
|------------|---------|----------|
| **Groq AI** | Ultra-fast LLM | AI |
| **Google AI** | Embeddings | AI |
| **OpenAI** | GPT Models | AI |
| **Vercel AI SDK** | AI Integration | AI |

### Backend & Database
| Technology | Purpose | Category |
|------------|---------|----------|
| **PostgreSQL** | Database | Backend |
| **Drizzle ORM** | Database ORM | Backend |
| **NextAuth.js** | Authentication | Auth |
| **bcrypt-ts** | Password Hashing | Security |

### Infrastructure & Storage
| Technology | Purpose | Category |
|------------|---------|----------|
| **Vercel** | Deployment | Infrastructure |
| **Vercel Blob** | File Storage | Storage |
| **Vercel KV** | Redis Cache | Cache |

### Processing & Data
| Technology | Purpose | Category |
|------------|---------|----------|
| **PDF Parse** | Document Processing | Processing |
| **Langchain** | Text Splitting | Processing |
| **React Markdown** | Markdown Rendering | UI |
| **Sonner** | Toast Notifications | UI |
| **Zod** | Schema Validation | Validation |
| **SWR** | Data Fetching | Data |
| **D3 Scale** | Data Visualization | Visualization |

### Development Tools
| Technology | Purpose | Category |
|------------|---------|----------|
| **ESLint** | Code Linting | DevTools |

### 🏗️ Architecture Highlights

- **RAG (Retrieval Augmented Generation)** for accurate, context-aware responses
- **HyDE (Hypothetical Document Embeddings)** for improved document retrieval
- **Vector embeddings** with Google AI for semantic search
- **Edge runtime** deployment for global low-latency access
- **Server-side rendering** with dynamic authentication
- **Mobile-first responsive design** optimized for all devices

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- **npm/yarn/pnpm** package manager
- **Groq API key** (get from [console.groq.com](https://console.groq.com))
- **Google AI API key** (get from [aistudio.google.com](https://aistudio.google.com))
- **PostgreSQL database** (Supabase recommended)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/888Greys/RAG-AI.git
cd RAG-AI
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

# PostgreSQL connection string
POSTGRES_URL=your-postgres-url

# Optional: Vercel Blob for file uploads
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Optional: Vercel KV for caching
KV_REST_API_URL=your-kv-url
KV_REST_API_TOKEN=your-kv-token
```

### 4. Set Up Database

The application uses PostgreSQL with the following schema:

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

### 5. Upload KCA University Documents

Run the document upload script to populate your knowledge base:

```bash
# Upload general documents
npx tsx upload-documents.ts

# Upload KCA-specific documents
npx tsx upload-kca-documents.ts

# Upload PDF documents
npx tsx upload-pdfs.ts
```

### 6. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your KCA University AI Assistant!

## 📖 How It Works

### RAG Pipeline for KCA University

1. **Document Processing**: KCA University documents are split into chunks and embedded using Google's text-embedding-004
2. **Storage**: Chunks and embeddings are stored in PostgreSQL with vector search capabilities
3. **Query Processing**: Student questions are classified and processed through HyDE
4. **Retrieval**: Relevant KCA document chunks are found using cosine similarity
5. **Generation**: Groq's Llama 4 Scout generates responses with KCA-specific context

### Architecture Flow

```
Student Question → Classification → HyDE → Vector Search → KCA Context → AI Response
```

### Key Components

- **RAG Middleware**: Handles retrieval and context injection for KCA documents
- **Chat Interface**: Mobile-optimized UI for students
- **Authentication**: Secure student account management
- **Vector Database**: Efficient search through KCA University documents

## 🔧 Configuration

### AI Models

- **Main Chat**: `meta-llama/llama-4-scout-17b-16e-instruct` (Groq)
- **Classification**: `llama-3.1-8b-instant` (Groq)
- **Embeddings**: `text-embedding-004` (Google)

### Customization for KCA

You can customize the knowledge base by:

1. **Adding KCA Documents**: Use upload scripts with official KCA content
2. **Modifying UI**: Update branding in `/components` for KCA colors/logos
3. **Changing Models**: Update model configurations in `/ai/index.ts`
4. **Styling**: Modify Tailwind classes for KCA University branding

## 📁 Project Structure

```
├── ai/                     # AI configuration and RAG middleware
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication pages (login/register)
│   ├── (chat)/            # Chat interface and API routes
│   ├── landing/           # Landing page with developer info
│   └── db.ts              # Database functions
├── components/            # React components (chat, forms, etc.)
├── drizzle/              # Database migrations
├── utils/                # Utility functions
├── pdfs/                 # KCA University PDF documents
├── schema.ts             # Database schema
├── upload-documents.ts   # General document upload
├── upload-kca-documents.ts # KCA-specific document upload
└── upload-pdfs.ts        # PDF document upload
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Fork the Repository**:
   - Go to [github.com/888Greys/RAG-AI](https://github.com/888Greys/RAG-AI)
   - Click "Fork" to create your own copy

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your forked repository
   - Add environment variables
   - Deploy!

3. **Set Environment Variables** in Vercel dashboard:
   - `GROQ_API_KEY`
   - `GOOGLE_GENERATIVE_AI_API_KEY`
   - `AUTH_SECRET`
   - `POSTGRES_URL`

## 🤝 Contributing

We welcome contributions from KCA University students and developers! Here's how you can help:

### 🎓 For KCA Students

- **Share Documents**: Help us upload official KCA University documents
- **Report Issues**: Let us know if information is missing or incorrect
- **Suggest Features**: What would make this more useful for students?
- **Test & Feedback**: Use the app and share your experience

### 💻 For Developers

- **Code Contributions**: Improve features, fix bugs, add functionality
- **Documentation**: Help improve this README and other docs
- **UI/UX**: Make the interface even better for students
- **Performance**: Optimize for mobile and slow connections

### Development Workflow

1. Fork the repository from [github.com/888Greys/RAG-AI](https://github.com/888Greys/RAG-AI)
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly: `npm run build` and `npm run dev`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### 📞 Contact for Contributions

- **📱 WhatsApp**: [+254715558014](https://wa.me/254715558014) - Direct contact with the developer
- **💻 GitHub Issues**: [Create an issue](https://github.com/888Greys/RAG-AI/issues) for bugs or feature requests
- **💬 GitHub Discussions**: [Join discussions](https://github.com/888Greys/RAG-AI/discussions) about the project

## 🎯 Roadmap

### Phase 1 (Current - Preview)
- ✅ Basic chat functionality with RAG
- ✅ User authentication and registration
- ✅ Mobile-responsive design
- ✅ Core KCA University documents
- 🔄 Uploading comprehensive KCA document library

### Phase 2 (Coming Soon)
- 📋 Complete KCA University document coverage
- 🔍 Advanced search and filtering
- 📱 Progressive Web App (PWA) support
- 🌍 Offline functionality for key information
- 📊 Usage analytics and popular questions

### Phase 3 (Future)
- 🤖 Voice interaction support
- 📅 Integration with KCA University systems
- 🎓 Personalized student recommendations
- 📚 Study group and collaboration features
- 🏆 Gamification for knowledge sharing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **KCA University** for being an amazing institution worth building for
- **KCA Students** for inspiration and feedback
- **Vercel** for the AI SDK and hosting platform
- **Groq** for ultra-fast AI inference
- **Google** for high-quality embeddings
- **Next.js** team for the amazing framework
- **Open Source Community** for all the incredible tools

## ���� Support & Contact

### For Students
- **📱 WhatsApp**: [+254715558014](https://wa.me/254715558014) - Quick help and support
- **💻 GitHub**: [888Greys/RAG-AI](https://github.com/888Greys/RAG-AI) - Technical issues and features
- **📧 Issues**: [Report a problem](https://github.com/888Greys/RAG-AI/issues) - Bug reports and suggestions

### For Developers
- **📖 Documentation**: [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- **💬 Discussions**: [GitHub Discussions](https://github.com/888Greys/RAG-AI/discussions)
- **🔧 Contributing**: See the Contributing section above

---

**Built with ❤️ for KCA University students using the Vercel AI SDK**

*Making university life easier, one question at a time.* 🎓✨