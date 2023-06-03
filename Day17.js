//2676. Throttle
/*The one-sentence description of throttle is that it should call the provided callback as frequently as possible but no more frequently than t milliseconds.  */


/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var throttle = function(fn, t) {
    let timeoutInProgress = null;
    let argsToProcess = null;

    const timeoutFunction = ()=>{
        if(argsToProcess === null){
            timeoutInProgress = null; //entering the waiting phase
        }else{
            fn(...argsToProcess);
            argsToProcess = null;
            timeoutInProgress = setTimeout(timeoutFunction, t);
        }
    };

    return function(...args) {
        if(timeoutInProgress){
            argsToProcess = args;
        }else{
            fn(...args);    //entering the looping phase
            timeoutInProgress = setTimeout(timeoutFunction, t);
        }
    }
};

/**
 * const throttled = throttle(console.log, 100);
 * throttled("log"); // logged immediately.
 * throttled("log"); // logged at t=100ms.
 */