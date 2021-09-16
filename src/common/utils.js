// 防抖函数
export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => { //箭头函数，获取延时器外部的参数args
      // apply使用的两种好处
      // 1.将this指向为86行的刷新函数，而不是window
        // 因为箭头函数的this指向所在作用域下的this，就是回调函数的this，就是刷新函数
      // 2.如果传递的参数args是素组或对象，只能使用call/apply等调用
      func.apply(this, args); 
    }, delay);
  }
}

// 节流函数
export function throttle(func,delay) {
  let begin = 0
  return function (...args) {
    let cur = Date.now()
    if(cur - begin >= delay) {
      func.apply(this, args)
      begin = cur
    }
  }
}

// 格式化时间戳
export function formatDate(date, fmt) {
  //1.获取年份
  // y+ 1个或者多个y
  // y* 0个或者多个y
  // y？0个或者一个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

