import { describe, it } from "mocha"
import { expect } from "chai"
import { getEmbedding } from "../embedding"

// TODO: Mock, so that the live call is removed.
describe("getEmbedding(text) method", async () => {
  it("successfully returns an embedding", async () => {
    const embedding = await getEmbedding("Sometimes, almost always")
    expect(embedding).to.include(0.010686684)
  })
})
