import { drizzle } from "drizzle-orm/postgres-js";
import { desc, eq, inArray, sql } from "drizzle-orm";
import postgres from "postgres";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { chat, chunk, user } from "@/schema";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// Mock database functions when POSTGRES_URL is not available
const isDatabaseAvailable = process.env.POSTGRES_URL && 
  process.env.POSTGRES_URL !== 'placeholder-postgres-url' &&
  !process.env.POSTGRES_URL.includes('placeholder');

let client: any;
let db: any;

// In-memory storage for development
const mockUsers: Array<{ email: string; password: string; id: string }> = [];
const mockChats: Array<{ id: string; createdAt: Date; messages: string; author: string }> = [];
const mockChunks: Array<any> = [];

if (isDatabaseAvailable) {
  client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
  db = drizzle(client);
} else {
  // Mock database for development without real database
  console.warn('Database not configured - using mock functions');
}

export async function getUser(email: string) {
  if (!isDatabaseAvailable) {
    const foundUser = mockUsers.filter(u => u.email === email);
    return foundUser;
  }
  return await db.select().from(user).where(eq(user.email, email));
}

export async function createUser(email: string, password: string) {
  if (!isDatabaseAvailable) {
    let salt = genSaltSync(10);
    let hash = hashSync(password, salt);
    const newUser = {
      id: crypto.randomUUID(),
      email,
      password: hash
    };
    mockUsers.push(newUser);
    return { success: true };
  }
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(user).values({ email, password: hash });
}

export async function createMessage({
  id,
  messages,
  author,
}: {
  id: string;
  messages: any;
  author: string;
}) {
  if (!isDatabaseAvailable) {
    const existingChatIndex = mockChats.findIndex(c => c.id === id);
    if (existingChatIndex >= 0) {
      mockChats[existingChatIndex].messages = JSON.stringify(messages);
    } else {
      mockChats.push({
        id,
        createdAt: new Date(),
        messages: JSON.stringify(messages),
        author,
      });
    }
    return { success: true };
  }
  
  const selectedChats = await db.select().from(chat).where(eq(chat.id, id));

  if (selectedChats.length > 0) {
    return await db
      .update(chat)
      .set({
        messages: JSON.stringify(messages),
      })
      .where(eq(chat.id, id));
  }

  return await db.insert(chat).values({
    id,
    createdAt: new Date(),
    messages: JSON.stringify(messages),
    author,
  });
}

export async function getChatsByUser({ email }: { email: string }) {
  if (!isDatabaseAvailable) {
    return mockChats
      .filter(c => c.author === email)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  return await db
    .select()
    .from(chat)
    .where(eq(chat.author, email))
    .orderBy(desc(chat.createdAt));
}

export async function getChatById({ id }: { id: string }) {
  if (!isDatabaseAvailable) {
    return mockChats.find(c => c.id === id) || null;
  }
  const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
  return selectedChat;
}

export async function insertChunks({ chunks }: { chunks: any[] }) {
  if (!isDatabaseAvailable) {
    mockChunks.push(...chunks);
    return { success: true };
  }
  return await db.insert(chunk).values(chunks);
}

export async function getChunksByFilePaths({
  filePaths,
}: {
  filePaths: Array<string>;
}) {
  if (!isDatabaseAvailable) {
    // For mock: handle wildcard patterns
    if (filePaths.includes('shared/%') || filePaths.includes('kca/%')) {
      return mockChunks.filter(c => 
        c.filePath.startsWith('shared/') || c.filePath.startsWith('kca/')
      );
    }
    return mockChunks.filter(c => filePaths.includes(c.filePath));
  }
  
  // Handle wildcard search patterns
  const hasWildcards = filePaths.some(path => path.includes('%'));
  
  if (hasWildcards) {
    const conditions = filePaths.map(path => {
      if (path.includes('%')) {
        return sql`${chunk.filePath} LIKE ${path}`;
      }
      return sql`${chunk.filePath} = ${path}`;
    });
    
    // Combine conditions with OR
    const whereClause = conditions.reduce((acc, condition, index) => {
      if (index === 0) return condition;
      return sql`${acc} OR ${condition}`;
    });
    
    return await db
      .select()
      .from(chunk)
      .where(whereClause);
  }
  
  return await db
    .select()
    .from(chunk)
    .where(inArray(chunk.filePath, filePaths));
}

export async function deleteChunksByFilePath({
  filePath,
}: {
  filePath: string;
}) {
  if (!isDatabaseAvailable) {
    const index = mockChunks.findIndex(c => c.filePath === filePath);
    if (index >= 0) {
      mockChunks.splice(index, 1);
    }
    return { success: true };
  }
  return await db.delete(chunk).where(eq(chunk.filePath, filePath));
}
