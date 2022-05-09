import { expect } from 'chai'
import sinon from 'sinon'

const sandbox = sinon.createSandbox()

const students = Array.from({ length: 10 }).map((i, index) => ({ id: index, name: `Name ${i}`, age: 23 }))

const UserApi = {
  getAll() {
    return students
  },
  getById(id) {
    return students.find(student => student.id === id)
  },
  create(student) {
    if(!student) {
      throw new Error('Missing student')
    }

    students.push(student)
  },
  edit(student, id) {
    if(!student || !id) {
      throw new Error('Missing args')
    }

    let tStudent = students.find(student =>  student.id === id)

    if(!tStudent) {
      throw new Error('Student not found')
    }

    tStudent = student
  },
  thisGetAll: function() {
    return this.getAll()
  }
}

const sum = function(a, b) {
  return a + b
}

describe('Test spy', function() {
  afterEach(function() {
    sandbox.restore()
  })

  it('should spy function', function() {
    const spy = sandbox.spy(sum)

    spy()

    expect(spy.called).to.be.true
  })

  it('should spy object method getAll', function() {
    const getAll = sandbox.spy(UserApi, 'getAll')

    getAll()
    UserApi.getAll()

    expect(getAll.called).to.be.true
    expect(getAll.callCount).to.be.equal(2)
  })

  it('should spy object method thisGetAll', function() {
    const spy = sandbox.spy(UserApi, 'thisGetAll')

    UserApi.thisGetAll()

    // lost this context
    // spy()

    expect(spy.called).to.be.true
  })
})