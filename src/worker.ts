import { NativeConnection, Worker } from "@temporalio/worker"
import * as activities from "./activities"
import { EmbeddingsQueue } from "./queues"

async function run() {
  // Worker code uses `@temporalio/worker.NativeConnection`.
  // (But in your application code it's `@temporalio/client.Connection`.)
  const connection = await NativeConnection.connect({
    address: "localhost:7233",
    // TLS and gRPC metadata configuration goes here.
  })

  const embeddingsWorker = await Worker.create({
    connection,
    namespace: "default",
    taskQueue: EmbeddingsQueue,
    workflowsPath: require.resolve("./workflows"),
    activities,
  })

  // See https://typescript.temporal.io/api/classes/worker.Runtime#install to customize these defaults.
  await embeddingsWorker.run()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
