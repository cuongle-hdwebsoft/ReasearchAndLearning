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