import * as workflow from "@temporalio/workflow"
import type * as activities from "./activities"
import { EmbeddingGeneratorParam } from "./interfaces"

const { generateEmbedding } = workflow.proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
})

export async function embedding({
  text,
}: EmbeddingGeneratorParam): Promise<string> {
  const embedding = await generateEmbedding(text)
  return embedding.toString()
}
