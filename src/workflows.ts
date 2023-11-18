import * as workflow from "@temporalio/workflow"
import type * as activities from "./activities"
import {EmbeddingGeneratorParam} from "./interfaces"


const {generateEmbedding} = workflow.proxyActivities<typeof activities>({
  startToCloseTimeout: "1 minute",
})

export async function embedding({text, apiKey}: EmbeddingGeneratorParam): Promise<string> {
  return await generateEmbedding(text, apiKey)
}
