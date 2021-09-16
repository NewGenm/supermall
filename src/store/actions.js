export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 首先筛选是否存在一样的商品
      // 存在oldProduct = payload  不存在oldProduct =  undefined
      let oldProduct = context.state.cartList.find((item) => {
        return item.iid === payload.iid
      })
      // 判断oldProduct是否有值
      if (oldProduct) {
        // 如果有值，在原有商品的基础上计数加一
        // oldProduct.count +=1
        context.commit('addCounter', oldProduct)
        resolve('商品数加一')
      } else {
        // 如果没有值，新添加一个商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加新商品')
      }
    })
  },

  // 全选按钮
  checkAll(context, payload) {
    if (payload) {
      context.commit('selectAll')
    } else {
      context.commit('unselectAll')
    }
  },

  // 注册账号
  createdAccount(context, payload) {
    return new Promise((resolve, reject) => {
      context.state.userInfo.push(payload)
      console.log(context.state.userInfo)
      resolve('注册成功')
    })
  },
  // 登陆账号
  loginAccount(context, payload) {
    return new Promise((resolve, reject) => {
      for (const account of context.state.userInfo) {
        console.log(account)
        if (account.ID === payload.ID) {
          if (account.password === payload.password) {
            context.state.userName = account.name
            resolve('登陆成功')
          } else {
            // console.log('登陆失败')
            reject('密码错误')
          }
        }
      }
    })
  },
}