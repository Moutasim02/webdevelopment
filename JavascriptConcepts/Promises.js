function promiseTimout(ms) {
    // Promise object accepting function with resolve (operation succeed) and reject(operation fails) arguments
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms); // after timout done, auto call resolve
    });
}

promiseTimout(2000)
    .then(() => { // called on success
        console.log('done')
        return Promise.resolve(42); // Shortcut for successful promise
                                          // Pass value to next handler
    })
    .then((response) => { // Calling next handler after the prior one completes
                                  //  receives response
        console.log(response);
    })
    .catch(() => { // Fails
        console.log('cool error handling');
    })