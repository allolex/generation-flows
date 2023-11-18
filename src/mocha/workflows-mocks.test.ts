import {TestWorkflowEnvironment} from "@temporalio/testing"
import {after, before, it} from "mocha"
import {expect} from "chai"
import {Worker} from "@temporalio/worker"
import {embedding} from "../workflows"

describe.skip("Example workflow with mocks", () => {
  let testEnv: TestWorkflowEnvironment

  before(async () => {
    testEnv = await TestWorkflowEnvironment.createLocal()
  })

  after(async () => {
    await testEnv?.teardown()
  })

  it("successfully completes the Workflow with a mocked Activity", async () => {
    const {client, nativeConnection} = testEnv
    const taskQueue = "test"

    const worker = await Worker.create({
      connection: nativeConnection,
      taskQueue,
      workflowsPath: require.resolve("../workflows"),
      activities: {
        embedding: async () => "Hello, Temporal!",
      },
    })

    const result = await worker.runUntil(
      client.workflow.execute(embedding, {
        args: [{text: "test text", apiKey: "key"}],
        workflowId: "test",
        taskQueue,
      })
    )

    expect(result).to.match(/Embedding.*test text/)
  })
})
