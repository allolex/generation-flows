import { TestWorkflowEnvironment } from "@temporalio/testing"
import { before, describe, it } from "mocha"
import { Worker } from "@temporalio/worker"
import { expect } from "chai"
import { embedding } from "../workflows"
import * as activities from "../activities"

describe("Embedding workflow", () => {
  let testEnv: TestWorkflowEnvironment

  before(async () => {
    testEnv = await TestWorkflowEnvironment.createLocal()
  })

  after(async () => {
    await testEnv?.teardown()
  })

  it("successfully completes the Workflow", async () => {
    const { client, nativeConnection } = testEnv
    const taskQueue = "test"

    const worker = await Worker.create({
      connection: nativeConnection,
      taskQueue,
      workflowsPath: require.resolve("../workflows"),
      activities,
    })

    const result = await worker.runUntil(
      client.workflow.execute(embedding, {
        args: [{ text: "test text", apiKey: "key" }],
        workflowId: "test",
        taskQueue,
      })
    )
    expect(result).to.match(/Embedding.+test text/)
  })
})
