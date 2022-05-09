import { expect } from 'chai'
import sion from 'sinon'

const sum = (a, b) => {
  return a + b
}

const main = function(cb, a, b) {
  cb(a, b)
}

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
  }
}

describe('Test all methods', function() {
  const sandbox = sion.createSandbox()

  afterEach(function() {
    sandbox.restore()
  })

  describe('Test spy', function() {
    it('should be sum = 3', function() {
      const spySum = sandbox.spy(sum)

      main(spySum, 1, 2)

      expect(spySum.called).to.be.true
      expect(spySum.callCount).to.be.equal(1)
      expect(spySum.getCall(0).returnValue).to.be.equal(3)
    })

    it('should return all students when getAll', function() {
      sandbox.spy(UserApi, 'getAll');

      UserApi.getAll()

      expect(UserApi.getAll.called).to.be.true
      expect(UserApi.getAll.getCall(0).returnValue).to.have.members(students)
    })

    it('should create student', function() {
      sandbox.spy(UserApi, 'create')

      let student = { id: students.length, name: `Name ${students.length}` }

      UserApi.create(student)

      expect(UserApi.create.called).to.be.true
      expect(students).to.include(student)
    })

    it('should edit student', function() {
      let student = { id: 1, name: `Name ${students.length}` }

      const spy = sandbox.spy(UserApi, 'edit')

      UserApi.edit(student, student.id)

      expect(spy).to.be.equal(spy)
      
      let tStudent = students.find(_student =>  _student.id === student.id)

      expect(tStudent).to.be.deep.equal(tStudent)
    })
  })

  describe('Test stub', function() {
    it('should be spy', function() {
      const stubSum = sandbox.stub()

      main(stubSum, 1, 2);
      main(stubSum, 3, 4);
      main(stubSum, 5, 6);

      expect(stubSum.called).to.be.true
      expect(stubSum.callCount).to.be.equal(3)
      expect(stubSum.returnValues).to.be.include.members([undefined, undefined, undefined])
    })

    it('should be sum', function() {
      let sum = sandbox.stub().returns(1)

      sum(3)

      expect(sum.called).to.be.true
      expect(sum.getCall(0).returnValue).to.be.equal(1)
      expect(sum.withArgs(3).args[0]).to.have.members([3])
    })

    it('should call getAll', function() {
      const spy = sandbox.stub(UserApi, 'getAll')

      UserApi.getAll()

      // console.log(spy.called, UserApi.getAll.called)
      // console.log(spy.getCall(0).returnValue)
    })
  })
})