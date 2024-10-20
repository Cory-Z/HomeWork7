import { html, fixture, expect } from '@open-wc/testing';
import "../my-hw7.js";

describe("myHw7 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <my-hw7
        title="title"
      ></my-hw7>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
