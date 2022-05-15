import sinon from "sinon";
import { expect } from "chai";
import faker from "@faker-js/faker";
import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";
import CustomInput from "@/components/CustomInput.vue";
import AxiosMockAdapter from "axios-mock-adapter";
import instance from "@/instance";
import TestMixin from "@/mixins/testMixin";
import Vuex from "vuex";
import { store } from "@/stores";

let wrapper;
let mock = new AxiosMockAdapter(instance);
const localVue = createLocalVue();
const sandbox = sinon.createSandbox();
let state;
let actions;
let thisStore;

let _store = {
  state,
  actions,
};

localVue.use(Vuex);

const withProps = function () {
  _store.state = state;
  _store.actions = actions;
  thisStore = new Vuex.Store(_store);

  return {
    store: thisStore,
    localVue,
  };
};

describe("App", function () {
  this.timeout(5000);

  beforeEach(function () {
    state = {};
    actions = {
      handleChangeName: sandbox.stub(),
      handleChangeAge: sandbox.stub(),
    };
  });

  afterEach(function () {
    sandbox.restore();
    sandbox.reset();
    wrapper.destroy();
  });

  after(function () {
    mock.restore();
  });

  it("should be render h1 App", function () {
    wrapper = mount(App, withProps());

    const h1 = wrapper.find("h1");

    expect(h1.exists()).to.be.true;
    expect(h1.element.innerHTML).to.be.equal("App");
  });

  it("should mount custom-input", function () {
    wrapper = mount(App, withProps());
    const customInput = wrapper.findComponent({ name: "CustomInput" });

    expect(customInput.exists()).to.be.true;
    expect(customInput.classes()).to.include("custom-input");
  });

  it("should shallow mount custom-input", function () {
    wrapper = shallowMount(App, withProps());
    const customInput = wrapper.findComponent({ name: "CustomInput" });

    expect(customInput.exists()).to.be.true;
    expect(customInput.classes()).not.to.include("custom-input");
  });

  it("should be run getData", async function () {
    const spy = sandbox.spy(App.methods, "getData");
    const todos = Array.from({ length: 10 }).map((item, index) => {
      return {
        id: faker.datatype.uuid(),
        title: faker.animal.type(),
        description: faker.lorem.paragraph(),
      };
    });
    mock.onGet("/todos").reply(200, todos);
    wrapper = mount(App, withProps());
    await wrapper.vm.getData();

    expect(wrapper.vm.todos.length).to.be.equal(todos.length);
    expect(spy.called).to.be.true;
    expect(spy.callCount).to.be.equal(2);
  });

  it("should render lists DOM", async function () {
    const spy = sandbox.spy(App.methods, "getData");
    const todos = Array.from({ length: 10 }).map((item, index) => {
      return {
        id: faker.datatype.uuid(),
        title: faker.animal.type(),
        description: faker.lorem.paragraph(),
      };
    });
    mock.onGet("/todos").reply(200, todos);
    const wrapper = mount(App, withProps());

    await wrapper.vm.getData();

    expect(spy.called).to.be.true;
    expect(App.methods.getData.called).to.be.true;

    const domItems = wrapper.findAll(".todo-item");

    expect(domItems.length).to.be.equal(todos.length);

    for (let i = 0; i < domItems.length; i++) {
      let domItem = domItems.at(i);
      let todo = todos[i];

      expect(domItem.element.innerHTML).to.be.equal(
        ` ${todo.id} - ${todo.title} - ${todo.description} `
      );
    }
  });

  it("should stub mixin methods", function () {
    const word = faker.word.adjective();
    const generatePk = sandbox
      .stub(TestMixin.methods, "generatePk")
      .returns(word);
    const wrapper = shallowMount(App, withProps());

    wrapper.vm.generatePk();

    expect(TestMixin.methods.generatePk.called).to.be.true;
    expect(generatePk.called).to.be.true;
    expect(generatePk.getCall(0).returnValue).to.be.equal(word);
  });

  it("should set data when run getDataPromise", async function () {
    const getDataPromise = sandbox.spy(App.methods, "getDataPromise");
    const wrapper = shallowMount(App, withProps());
    const todos = Array.from({ length: 10 }).map((item, index) => {
      return {
        id: faker.datatype.uuid(),
        title: faker.animal.type(),
        description: faker.lorem.paragraph(),
      };
    });
    mock.onGet("/todos").reply(200, todos);
    await wrapper.vm.getDataPromise();

    expect(getDataPromise.called).to.be.true;
    expect(getDataPromise.callCount).to.be.equal(1);
    expect(wrapper.vm.todos.length).to.be.equal(todos.length);
  });

  it("should map state vuex", function () {
    state = {
      name: faker.word.adjective(),
      age: faker.datatype.number(),
      arr: Array.from({ length: 10 }).map(() => faker.animal.bear()),
    };
    const wrapper = mount(App, withProps());

    expect(wrapper.vm.name).to.be.equal(_store.state.name);
    expect(wrapper.vm.age).to.be.equal(_store.state.age);
    expect(wrapper.vm.arr).to.have.members(_store.state.arr);
  });

  it("should change name when dispatch handleChangeName on mounted", function () {
    state = store.state;
    const wrapper = shallowMount(App, withProps());
    const name = faker.animal.bear();
    const age = faker.datatype.number({ min: 18, max: 25 });

    wrapper.vm.handleChangeName(name);
    wrapper.vm.handleChangeAge(age);

    expect(actions.handleChangeName.called).to.be.true;
    expect(actions.handleChangeAge.called).to.be.true;
    expect(actions.handleChangeName.callCount).to.be.equal(2);
    expect(actions.handleChangeAge.callCount).to.be.equal(2);
    expect(actions.handleChangeName.getCall(1).args[1]).to.be.equal(name);
    expect(actions.handleChangeAge.getCall(1).args[1]).to.be.equal(age);
  });

  it("should dispatch MY_ACTION when status 500", async function () {
    const endpoint = "/";
    mock.onGet(endpoint).reply(500);
    sandbox.stub(thisStore, "dispatch");

    await instance({
      methods: "GET",
      url: "/",
    }).catch((error) => {
      if (error.niceTry) {
        thisStore.dispatch("MY_ACTION", { error });
      }
    });

    const actionName = thisStore.dispatch.getCall(0).args[0];
    const payload = thisStore.dispatch.getCall(0).args[1];

    expect(thisStore.dispatch.called).to.be.true;
    expect(thisStore.dispatch.callCount).to.be.equal(1);
    expect(actionName).to.be.equal("MY_ACTION");
    expect(payload.error.niceTry).to.be.true;
    expect(payload.error.message).to.be.equal(
      "Request failed with status code 500"
    );
  });

  it("should change age when dispatch handleChangeAge on mounted", function () {
    actions = {
      handleChangeAge: sandbox.stub(),
    };
    state = {
      name: "",
    };
    const wrapper = shallowMount(App, withProps());
    const word = faker.word.adjective();

    wrapper.vm.handleChangeAge(word);

    console.log(actions.handleChangeAge.getCall(1).args);
  });
});
