import { groq } from "@ai-sdk/groq";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";
import { ragMiddleware } from "./rag-middleware";

export const customModel = wrapLanguageModel({
  model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
  middleware: ragMiddleware,
});
