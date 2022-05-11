import { mount } from "@vue/test-utils";
import CustomInput from "@/components/CustomInput.vue";
import faker from "@faker-js/faker";
import { expect } from "chai";
import sion from "sinon";

let label;
let initialValue;

const withProps = function () {
  return {
    propsData: {
      label,
      initialValue,
    },
  };
};

describe("Test Custom Input", function () {
  const sandbox = sion.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  it("should render props label CustomInput", function () {
    label = faker.word.adjective();

    const wrapper = mount(CustomInput, withProps());

    expect(wrapper.text()).to.have.string(label);
  });

  it("should run method initDefault", async function () {
    const initDefault = sandbox.spy(CustomInput.methods, "initDefault");
    const wrapper = mount(CustomInput, withProps());
    const input = wrapper.find("input");

    expect(initDefault.called).to.be.true;
    expect(input.element.value).to.be.equal("init data");
  });

  it("should change when type", async function () {
    const handleChangeInput = sandbox.spy(
      CustomInput.methods,
      "handleChangeInput"
    );
    sandbox.stub(CustomInput.methods, "initDefault");

    const wrapper = mount(CustomInput, withProps());
    const words = faker.word.noun();
    const input = wrapper.find("input");

    // option 1
    input.element.value = words;
    await input.trigger("input");

    // option 2
    // await input.setValue(words)

    expect(handleChangeInput.called).to.be.true;
    expect(handleChangeInput.getCall(0).args[0].target.value).to.be.equal(
      words
    );
    expect(wrapper.vm.value).to.be.equal(words);
  });

  it("should be error when empty string", async function () {
    const wrapper = mount(CustomInput, withProps());
    const input = wrapper.find("input");
    input.element.value = "";
    await input.trigger("input");

    const error = wrapper.find(".custom-input-error");
    expect(error.exists()).to.be.true;
    expect(error.element.innerHTML).to.be.equal("value is required");
  });

  it("should be error when string length is greater than 5", async function () {
    const wrapper = mount(CustomInput, withProps());
    const input = wrapper.find("input");
    const word = faker.word.adjective(5);

    await input.setValue(word);

    const error = wrapper.find(".custom-input-error");

    expect(error.exists()).to.be.true;
    expect(error.element.innerHTML).to.be.equal(
      "value.length is greater than 5"
    );
  });
});
