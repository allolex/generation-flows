import "dotenv/config"
const OpenAiApiKey: string = process.env.OPENAI_API_KEY || ""

if (!OpenAiApiKey) {
  throw new Error("OPENAI_API_KEY must be defined in the environment.")
}
import { Connection, Client } from "@temporalio/client"
import { embedding } from "./workflows"
import { nanoid } from "nanoid"
import { EmbeddingsQueue } from "./queues"

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: "localhost:7233" })
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  })

  const embeddingGenerator = await client.workflow.start(embedding, {
    taskQueue: EmbeddingsQueue,
    // type inference works! args: [name: string]
    args: [{text: "Sometimes, almost always", apiKey: OpenAiApiKey}],
    workflowId: "workflow-" + nanoid(),
  })

  console.log(`Started workflow ${embeddingGenerator.workflowId}`)
  console.log(await embeddingGenerator.result())
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
