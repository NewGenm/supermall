export default {
  // 增加数量
  addCounter(state, payload) {
    payload.count += 1
  },
  // 添加商品
  addToCart(state, payload) {
    state.cartList.push(payload)
  },
  // 全选
  selectAll(state, payload) {
    for (const item of state.cartList) {
      item.checked = false
    }
  },
  // 全不选
  unselectAll(state, payload) {
    for (const item of state.cartList) {
      item.checked = true
    }
  }
}