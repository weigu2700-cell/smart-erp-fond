const useTrigger = {
  //防抖函数
  debounce: (func: Function, delay: number) => {
    let timer: any = null
    return function (this: any, ...args: any[]) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  },

  //节流函数
  throttle: (func: Function, delay: number) => {
    let timer: any = null
    return function (this: any, ...args: any[]) {
      if (timer) {
        return
      }
      timer = setTimeout(() => {
        func.apply(this, args)
        timer = null
      }, delay)
    }
  },
}

export default useTrigger