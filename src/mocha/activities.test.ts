import {MockActivityEnvironment} from "@temporalio/testing"
import {describe, it} from "mocha"
import {expect} from "chai"
import * as activities from "../activities"

describe("generateEmbedding activity", async () => {
  it("successfully generates an embeddings", async () => {
    const env = new MockActivityEnvironment()
    const text = "You know sometimes, almost always."
    const apiKey = "fake_api_key"
    const result = await env.run(activities.generateEmbedding, text, apiKey)
    expect(result).to.match(/sometimes/)
  })
})
