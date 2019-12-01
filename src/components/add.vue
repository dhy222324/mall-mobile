<template>
  <div>
    <div class="main" @click="topath()">
     <van-icon name="arrow-left" />
   </div>

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      areaList:{},
      searchResult: []
    }
  },

  methods: {
    onSave() {
     this.areaList = {}
    },
    onDelete() {
     this.areaList = {}
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    },
     topath(){
      this.$router.push({path:"/Profile",query:{}})
   }
  }
}
</script>
<style lang="scss" scoped>
.main{
  font-size: r(40);
}
</style>
