<pre>
import sinon from "sinon";
import assert from "assert";
import { expect } from "chai";

function sum(cb, a, b) {
  return cb(a, b);
}

const obj = {
  get: function(url) {
    return {
      isError: false,
      data: [],
      url: url
    }
  },
  set: function() {
    return 'set my object'
  }
}

describe('App', function() {
  it("it should be ok", function () {
    const cb = sinon.spy();
    let rs = sum(cb, 1, 2, 3);

    const cb2 = sinon.spy(function(a, b) {
      return a + b
    })

    let rs2 = sum(cb2, 1, 2)

    console.log(cb.returnValues)
    console.log(cb2.returnValues)
  
    // console.log(rs);
    // console.log('cb.callCount', cb.callCount);
    // console.log('cb.args', cb.args);
    // console.log('cb.alwaysCalledOn(this)', cb.alwaysCalledOn(this));
    // console.log('cb.alwaysCalledWith(1, 2, 3)', cb.alwaysCalledWith(1, 2, 3));
    // console.log('cb.calledOnce', cb.calledOnce)

    expect(cb.called).equal(true);
  });

  describe('Inspect object', function() {
    const sanbox = sinon.createSandbox()

    afterEach(function() {
      sanbox.restore()
    })

    it('it should map all methods obj', function() {
      const spy = sanbox.spy(obj)

      spy.get('https://jsonplaceholder.typicode.com/todos/1')

      spy.get('https://jsonplaceholder.typicode.com/todos/2')

      // obj.get('https://jsonplaceholder.typicode.com/todos/1')

      // obj.get('https://jsonplaceholder.typicode.com/todos/2')

      // obj.get(4, 5, 6)

      // obj.get(1, 2, 3, 7)

      obj.set()
      expect(spy.get.called).to.be.true
      expect(spy.set.called).to.be.true

      // console.log('spy === obj', spy === obj)
      // console.log('spy.get.getCall(0).returnValue', spy.get.getCall(0).returnValue)
      
      // console.log(obj.get.withArgs('https://jsonplaceholder.typicode.com/todos/2'))
      // console.log(obj.get)
      // console.log(obj.set)
      // console.log('obj.get.args', obj.get.args)
      // console.log(obj.get.getCall(0).returnValue)

      sanbox.restore()
    })

    it('it should map get method obj', function() {
      sanbox.spy(obj, 'get')

      obj.get('https://jsonplaceholder.typicode.com/todos/1')

      expect(obj.get.called).to.be.true
    })
  })

  describe('stub', function() {
    const sanbox = sinon.createSandbox()

    beforeEach(function() {
      
    })

    afterEach(function() {

    })

    it('should stub get method and return null', function() {
      const get = sinon.stub(obj, 'get')
      .withArgs(43).onCall(0).returns(0)
      .onCall(1).returns(1)
      .onCall(2).returns(2)

      // get.withArgs(42).onCall(0).returns({ 
      //   isError: false,
      //   data: [],
      //   url: 'https://jsonplaceholder.typicode.com/todos/1'  
      // })
      // .withArgs(43).returns(1)
      // .withArgs(45).returns(null)

      get()
      get(43)
      get(44)

      console.log('get.getCall(0)', get.withArgs(0).returnValue)
      console.log('get.getCall(1)', get.getCall(1).returnValue)
      console.log('get.getCall(2)', get.getCall(2).returnValue)
      // console.log('get.getCall(0).returnValue', get.getCall(0).returnValue)
      // console.log("get.withArgs('null').returnValues", get.withArgs('null').returnValues)
      // console.log(get.getCalls())

      expect(get.called).to.be.true
      expect(get.callCount).to.be.equal(3)
      expect(get.getCall(0).returnValue).to.be.equal(0)
      expect(get.getCall(1).returnValue).to.be.equal(1)
      expect(get.getCall(2).returnValue).to.be.equal(2)
    })
  })
})

</pre>

<pre>
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
  })
})
</pre>