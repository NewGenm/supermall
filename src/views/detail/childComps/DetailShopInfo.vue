<template>
  <div class="shop-info">
    <div class="shop-name">
      <img :src="shop.logo" />
      {{ shop.name }}
    </div>
    <div class="shop-otherInfo">
      <div class="shop-otherInfo-left">
        <div class="shop-sells">
          {{ shopSell }}万
          <div>总销量</div>
        </div>
        <div class="shop-goods">
          {{ shop.goodsCount }}
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="shop-score">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? "高" : "低" }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    // 对销量进行单位换算
    shopSell() {
      let value = this.shop.sell;
      let k = 10000;
      if (value < k) {
        return value;
      } else {
        let i = value / k;
        return i.toFixed(1);
      }
    },
  },
};
</script>
<style lang='less' scoped>
.shop-info {
  // height: 500px;
  // background-color: #bfbfbf;

  .shop-name {
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-top: 20px;

    img {
      height: 50px;
      border-radius: 50%;
      margin: 0 10px;
    }
  }

  .shop-otherInfo {
    height: 80px;
    display: flex;
    // justify-content: space-around;
    align-items: center;

    .shop-otherInfo-left {
      width: 160px;
      display: flex;
      justify-content: space-evenly;
      border-right: 1px solid rgba(80, 80, 80, 0.2);

      .shop-sells {
        font-size: 20px;
        margin-right: 20px;
        div {
          font-size: 12px;
          margin-top: 5px;
        }
      }

      .shop-goods {
        font-size: 20px;
        div {
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }

    .shop-score {
      width: 160px;
      font-size: 14px;
      display: flex;
      justify-content: space-evenly;
      div {
        margin-top: 5px;
      }
  
      .score {
        color: #5ea732;
      }

      .score-better {
        color: #f13e3a;
      }

      .better {
        color: #fff;
        background-color: #5ea732;
        text-align: center;
      }

      .better-more {
        background-color: #f13e3a;
      }
    }
  }
}
</style>