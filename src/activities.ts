// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function generateEmbedding(text: string, apiKey: string): Promise<string> {
  // TODO: OpenAI API call here. Fake data follows.
  const embedding: number[] = [0.01, 0.02, 0.99]
  return `Embedding is generated from running with ${text}\n${embedding}`
}
