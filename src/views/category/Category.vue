<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>
    <!-- <scroll class="wrapper" :probeType="3">
      <div class="category-item">
        <div>
          <category-list 
            :categoryList='categoryList'
            :currentIndex='currentIndex'
            @itemClick='itemClick'
          >
          </category-list>
        </div>
        <div>
          <category-item
            :showGoods="showGoods"
            class="goods"
          ></category-item>
        </div>
      </div>
    </scroll> -->
    <div class="category-item">
      <div>
        <scroll class="wrapper" id="scroll1" :probeType="3">
        <category-list 
          :categoryList='categoryList'
          :currentIndex='currentIndex'
          @itemClick='itemClick'
        >
        </category-list>
        </scroll>
      </div>
      <div>
        <scroll class="wrapper"  id="scroll2" :probeType="3" ref="scroll2">
        <category-item
            :showGoods="showGoods"
            class="goods"
          ></category-item>
      </scroll>
      </div>
      <!-- <div>
        
        <category-item
            :showGoods="showGoods"
            class="goods"
          ></category-item>
      
      </div> -->
    </div>
  </div>
</template>

<script>
// 顶部栏
import NavBar from "components/common/navbar/NavBar.vue";
// 滚动工具
import Scroll from "components/common/scroll/Scroll.vue";
// 商品列表
import CategoryList from "./childComps/CategoryList.vue";
// 商品信息
import CategoryItem from "./childComps/CategoryItem.vue";

// 数据请求
import { getCategory, getCategoryInfo } from "network/category/category.js";
// 节流函数
import { throttle } from 'common/utils.js';

export default {
  name: "Category",
  data() {
    return {
      categoryList: [], //保存商品大标题
      maitKey: 0, //记录maitKey方便获取商品
      itemInfo: {}, //保存商品信息
      currentIndex: 0, //保存当前点击位置
      indexList: 0, //和currentIndex进行对别，避免重复请求商品
      throttleClick: null //节流函数
    };
  },
  components: {
    NavBar,
    Scroll,
    CategoryList,
    CategoryItem,
  },
  created() {
    // 创建时请求商品大标题和默认的第一个标题的商品信息
    getCategory().then((res) => {
      // 1.保存所有大标题
      // 2.保存第一个大标题的maitKey，用于请求数据
      this.categoryList = res.data.category.list;
      this.maitKey = res.data.category.list[0].maitKey
      getCategoryInfo(this.maitKey).then((res) => {
        // 1.请求保存的maitKey商品信息
        // 2.保存当前大标题的位置
        // 3.在数据中写入位置
        // 4.保存数据
        // 5.查重，保存当前大标题位置
        this.currentIndex = 0
        res.data.index = 0;
        this.itemInfo = res.data;
        this.indexList = this.currentIndex
      });
    });

    // 节流函数
    this.throttleClick = throttle((item, index) => {
      this.click(item, index)
    }, 200)
  },
  methods: {
    // 点击标题
    click(item, index) {
      // 同样的记录
      this.maitKey = item.maitKey;
      this.currentIndex = index
      getCategoryInfo(this.maitKey).then((res) => {
        // 判断,如果当前点击相同的大标题,则不请求数据
        if(this.indexList !== this.currentIndex){
          res.data.index = index;
          this.itemInfo = res.data;
          this.indexList = this.currentIndex
        }
      })

      // 添加点击后滚动返回顶部
      this.$refs.scroll2.scrollTo(0, 0, 0)
    },
    itemClick(item, index) {
      this.throttleClick(item, index)
    }
  },
  computed: {
    showGoods() {
      return this.itemInfo
    },
  },
};
</script>
<style lang='less' scoped>
.category {
  height: 100vh;
}
.nav-bar {
  background-color: @color-tint;
  color: #fff;
}
.wrapper {
  height: calc(100vh - 93px);
  // height: 300px;
}
.category-item{
  display: flex;
}
.goods {
  width: 100%;
  height: 100%;
}

</style>