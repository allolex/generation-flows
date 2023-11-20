import { getEmbedding } from "./embedding"

export async function generateEmbedding(text: string): Promise<object> {
  const embedding = await getEmbedding(text)
  console.log(`Source text:\n"${text}"\nEmbedding:\n${embedding}`)

  return embedding
}
