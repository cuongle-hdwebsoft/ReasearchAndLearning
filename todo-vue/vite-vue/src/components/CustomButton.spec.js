import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CustomButton from "./CustomButton.vue";

describe("Test CustomButton 1", function () {
  it("should be render", function () {
    const wapper = shallowMount(CustomButton, {});

    let button = wapper.find("button");
    expect(button.exists()).to.be.true;
  });
});
