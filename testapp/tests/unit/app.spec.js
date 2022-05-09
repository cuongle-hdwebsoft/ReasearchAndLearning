import sinon from 'sinon'
import { expect } from 'chai'
import faker from '@faker-js/faker'
import { mount, shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import CustomInput from '@/components/CustomInput.vue'
import AxiosMockAdapter from 'axios-mock-adapter'
import instance from '@/instance'
import TestMixin from '@/mixins/testMixin'

let wrapper
let mock

const withProps = function() {
  return {

  }
}

describe('App', function() {
  const sandbox = sinon.createSandbox()
  this.timeout(5000)

  beforeEach(function() {
    // sandbox.stub(TestMixin.methods, 'generatePk')
    mock = new AxiosMockAdapter(instance)
  })

  afterEach(function() {
    sandbox.restore()
    mock.restore()
    wrapper.destroy()
  })
  
  it('should be render h1 App', function() {
    wrapper = mount(App, withProps())

    const h1 = wrapper.find('h1')

    expect(h1.exists()).to.be.true
    expect(h1.element.innerHTML).to.be.equal('App')
  })

  it('should mount custom-input', function() {
    wrapper = mount(App, withProps())
    const customInput = wrapper.findComponent({ name: 'CustomInput' })

    // console.log(wrapper.html())
    // console.log('customInput.classes', customInput.classes())
    // console.log(customInput.vm.$data)

    expect(customInput.exists()).to.be.true
    expect(customInput.classes()).to.include('custom-input')
  })

  it('should shallow mount custom-input', function() {
    wrapper = shallowMount(App, withProps())
    const customInput = wrapper.findComponent({ name: 'CustomInput' })

    // console.log(wrapper.html())
    // console.log('customInput.classes', customInput.classes())
    // console.log(customInput.vm.$data)

    expect(customInput.exists()).to.be.true
    expect(customInput.classes()).not.to.include('custom-input')
  })

  it('should be run getData', async function() {
    const spy = sandbox.spy(App.methods, 'getData')
    const todos = Array.from({ length: 10 }).map((item, index) => {
      return {
        id: faker.datatype.uuid(),
        title: faker.animal.type(),
        description: faker.lorem.paragraph()
      }
    })
    mock.onGet('/todos').reply(200, todos)
    wrapper = mount(App, withProps())
    await wrapper.vm.getData()

    expect(wrapper.vm.todos.length).to.be.equal(todos.length)
    expect(spy.called).to.be.true
    expect(spy.callCount).to.be.equal(2)
  })

  it('should render lists DOM', async function() {
    const spy = sandbox.spy(App.methods, 'getData')
    const todos = Array.from({ length: 10 }).map((item, index) => {
      return {
        id: faker.datatype.uuid(),
        title: faker.animal.type(),
        description: faker.lorem.paragraph()
      }
    })
    mock.onGet('/todos').reply(200, todos)
    const wrapper = mount(App, withProps())

    await wrapper.vm.getData()

    expect(spy.called).to.be.true
    expect(App.methods.getData.called).to.be.true

    const domItems = wrapper.findAll('.todo-item')

    expect(domItems.length).to.be.equal(todos.length)

    for(let i = 0 ; i < domItems.length; i++) {
      let domItem = domItems[i]

      console.log('domItem', domItem)

      expect(domItem.element.innerHTML).to.be.equal(todos[i].title)
    }
  })

  it('should stub mixin methods', function() {
    const wrapper = shallowMount(App, withProps)

    console.log(wrapper.vm.generatePk())
  })
})