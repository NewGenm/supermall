<template>
  <div class="cart-list-item">
    <check-button @click.native="checkClick" :isChecked='product.checked'></check-button>
    <div class="item-img">
      <img :src="product.image" alt="" />
    </div>
    <div class="item-info">
      <p class="item-title">{{ product.title }}</p>
      <p class="item-desc">{{ product.desc }}</p>
        <span class="item-price">￥{{ product.price }}</span>
        <span class="item-count">x{{ product.count }}</span>
    </div>
  </div>
</template>

<script>
// 选中按钮
import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    }
  }
};
</script>
<style scoped>
.cart-list-item {
  width: 100%;
  height: 5.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  padding: 0.4rem;
  /* justify-content: space-evenly; */
  align-items: center;
}
.item-img {
  width: 3.5rem;
  height: 100%;
  /* overflow: hidden; */
}
.item-img img {
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
  /* margin: 0 5px; */
}
.item-info {
  height: 100%;
  position: relative;
  width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
  margin-left: 0.4rem;
  display: flex;
  flex-direction: column;
}
.item-info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
}

.item-title {
  font-size: 1rem;
  padding-bottom: 0.5rem;
}
.item-desc {
  font-size: 0.8rem;
  color: gray;
  padding-bottom: 0.5rem;
}
.item-price {
  position: absolute;
  left: 0;
  bottom: 0.4rem;
  font-size: 0.75rem;
  color: orangered;
}
.item-count {
  position: absolute;
  right: 2rem;
  bottom: 0.4rem;
  font-size: 0.75rem;
}

</style>