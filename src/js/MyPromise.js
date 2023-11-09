const PENDING = "PENDING";
const SUCCESS = "SUCCESS";
const FAIL = "FAIL";

class MyPromise {
    constructor(execute) {
        // 初始status
        this.status = PENDING;
        this.value = "";
        this.reason = "";
        this.onSuccessCb = [];
        this.onFailCb = [];

        // 为什么我们要使用箭头函数，因为箭头函数中的this指向MyPromise
        const resolve = (result) => {
            // 从PENDING变为SUCCESS状态
            if (this.status === PENDING) {
                this.status = SUCCESS;
                this.value = result;
                this.onSuccessCb.forEach((fn) => fn());
            }
        };
        const reject = (reason) => {
            // 从PENDING变为FAIL状态
            if (this.status === PENDING) {
                this.status = FAIL;
                this.reason = reason;
            }
        };
        // 执行excute方法，然后执行回调resolve或者reject
        execute(resolve, reject);
    }

    then(onSuccess, onFail) {
        // 实现值穿透 当then中传入的不是函数，则这个promise返回上一个promise的值
        // 相当于你在then中写了一个(value)=>{return value}
        onSuccess = typeof onSuccess === 'function' ? onSuccess : value => value;
        onFail = typeof onFail === 'function' ? onFail : reason => reason;
        // 用于实现链式调用
        const pr = new MyPromise((resolve, reject) => {
            let success = () => {
                try {
                    const result = onSuccess(this.value);
                    return result instanceof MyPromise ? result.then((value) => resolve(value), (reason) => reject(reason)) : resolve(result);
                } catch (err) {
                    reject(err);
                }
            }

            let fail = () => {
                try {
                    const reason = onFail(this.reason);
                    return reason instanceof MyPromise ? reason.then(resolve, reject) : reject(reason);
                } catch (err) {
                    reject(err);
                }
            }

            switch (this.status) {
                case "PENDING":
                    this.onSuccessCb.push(success);
                    this.onFailCb.push(fail);
                    break;
                case "SUCCESS":
                    success();
                    break;
                case "FAIL":
                    fail();
                    break;
            }
        });
        return pr;

    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }


    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        } else {
            // 返回一个promise对象
            // 用resolve包裹，改变状态
            return new MyPromise((resolve) => resolve(value));
        }
    }

    static reject(reason) {
        // Promise.reject方法的参数会原封不动地作为reject的参数
        return new MyPromise((resolve, reject) => reject(reason))
    }

    // 接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
    // 如果其中一个reject，都会崩掉
    static all(promiseArr) {
        const length = promiseArr.length;
        const values = new Array(length);
        let count = 0;
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < length; i++) {
                // 要考虑传入的值不是promise的情况
                // 为什么使用Promise.resolve(),因为如果是promise的直接return，如果不是的话，会套上一层
                MyPromise.resolve(promiseArr[i]).then((value) => {
                    values[i] = value;
                    count++;
                    // 利用resolve和reject只能执行一次的特性
                    // 为什么放到then里面，因为then是异步的
                    if (count === length) {
                        resolve(values)
                    }
                }).catch((error) => {
                    reject(error);
                })
            }
        })
    }

    // 返回所有的结果
    static allSettled(promises) {
        let length = promises.length;
        let count = 0;
        let result = new Array(length);
        return new Promise((resolve) => {
            for (let i = 0; i < length; i++) {
                promises[i].then((value) => {
                    result[i] = {
                        status: SUCCESS,
                        value,
                    }
                    count++;
                    // 为什么放到then里面，因为promise是异步的
                    if (count === length) {
                        resolve(result);
                    }
                }, (error) => {
                    result[i] = {
                        status: FAIL,
                        reason: error
                    }
                    count++;
                    // 为什么放到then里面，因为promise是异步的
                    if (count === length) {
                        resolve(result);
                    }
                })
            }
        })
    }

    // 只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃
    // 如果有一个崩掉，就会返回崩掉的结果
    static race(promiseArr) {
        return new Promise((resolve, reject) => {
            promiseArr.forEach(item => {
                MyPromise.resolve(item).then(
                    // 后面的在给resolve值，resolve已经不接受了，因为status已经改变了，status只有在PENDING的时候才接受值
                    val => resolve(val),
                    err => reject(err)
                )
            })
        })
    }

    // 返回第一个成功的，如果全部失败，才会失败
    static any(promises) {
        return new Promise((resolve, reject) => {
            promises = Array.isArray(promises) ? promises : []
            let len = promises.length
            // 用于收集所有 reject
            let errs = []
            // 如果传入的是一个空数组，那么就直接返回 AggregateError
            if (len === 0) return reject(new AggregateError('All promises were rejected'))
            promises.forEach((promise) => {
                promise.then(value => {
                    resolve(value)
                }, err => {
                    len--
                    errs.push(err)
                    if (len === 0) {
                        reject(new AggregateError(errs))
                    }
                })
            })
        })
    }

    static finally(cb) {
        return Promise.then((value) => {
            cb();
            return value;
        }, (err) => {
            cb();
            return err;
        })
    }

}
