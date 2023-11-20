import "dotenv/config"
import OpenAI from "openai"

const openai = new OpenAI() // Uses OPENAI_API_KEY defined in environment

const Model = "text-embedding-ada-002"
const Format = "float"
const DefaultUserId = "UNKNOWN"

export async function getEmbedding(
  text: string,
  userId: string = DefaultUserId
): Promise<number[]> {
  const chatCompletion = await openai.embeddings.create({
    input: text,
    model: Model,
    encoding_format: Format,
    user: userId,
  })

  return chatCompletion.data[0]["embedding"]
}
