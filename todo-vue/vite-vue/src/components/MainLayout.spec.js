import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import MainLayout from "./MainLayout.vue";

describe("MainLayout", function () {
  it("should render nav with home, news, login link", function () {
    const wrapper = shallowMount(MainLayout, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    const links = wrapper.findAll(".navbar__item a");

    const arrLink = links.map(function (link) {
      return link.element.innerHTML.toLowerCase();
    });

    expect(arrLink).to.have.members(["home", "news", "login"]);
  });
});
