import BackTop from "components/content/backTop/BackTop.vue";

export const backTopMixin = {
  components:{
    BackTop,
  },
  data(){
    return {
      isShowBackTop: false,
      tabOffsetTop:0,
    }
  },
  methods:{
    btnClick(){
      this.$refs.scroll.scrollTo(0,0,1000);
    }
  }
}