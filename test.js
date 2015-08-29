var timer = require('./index');

var sinon = require('sinon');
var chai = require('chai');

chai.should();

describe('delay', function () {
  beforeEach(function(){
    clock = sinon.useFakeTimers();
  });

  afterEach(function(){
    clock.restore();
  });

  it('should delay running callback after multiple calls', function () {
    var callback = sinon.spy();
    var delay = timer(callback, 200);

    delay();
    clock.tick(100);
    delay();
    clock.tick(100);
    delay();
    clock.tick(100);
    delay();
    callback.callCount.should.be.equal(0);
    clock.tick(400);
    callback.callCount.should.be.equal(1);
  });

  it('should collect multiple calls into single, delayed call', function(){
    var callback = sinon.spy();
    var delay = timer(callback, 200, true);

    delay();
    clock.tick(100);
    delay();
    clock.tick(100);
    delay();
    clock.tick(100);
    delay();
    clock.tick(100);
    delay();
    clock.tick(100);
    callback.callCount.should.be.equal(2);
  });

  it('should change delay during calls', function(){
    var callback = sinon.spy();
    var delay = timer(callback, 200);

    delay();
    clock.tick(100);
    callback.callCount.should.be.equal(0);
    delay(500);
    clock.tick(300);
    callback.callCount.should.be.equal(0);
    clock.tick(300);
    callback.callCount.should.be.equal(1);
  });

  it('should abort call', function(){
    var callback = sinon.spy();
    var delay = timer(callback, 200);

    delay();

    clock.tick(100);

    delay();

    delay.abort();

    clock.tick(600);

    callback.callCount.should.be.equal(0);
  });
});