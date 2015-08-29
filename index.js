function delay(callback, delayMillis, collected){
  var currentTimeout;
  var starter;

  if(collected !== true){
    currentTimeout = null;

    starter = function(newDelay){
      clearTimeout(currentTimeout);
      currentTimeout = setTimeout(callback, newDelay || delayMillis);
    };

    starter.abort = function(){
      clearTimeout(currentTimeout);
    };

    return starter;
  }else{
    currentTimeout = null;
    
    starter = function(newDelay){

      if(currentTimeout === null){
        currentTimeout = setTimeout(function(){
          currentTimeout = null;
          callback();
        }, newDelay || delayMillis);
      }
    };

    starter.abort = function(){
      currentTimeout = null;
      clearTimeout(currentTimeout);
    };

    return starter;
  }
}

module.exports = delay;