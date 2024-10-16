<template>
<el-card
    class="commonFunc-box"
    :style="cardStyle"
  >
   <div :slot="headerSlot" class="portal-common-title" :style="titleStyle">
      <div class="left">
        <div v-if="showBlock" class="block" :style="blockStyle"></div>
        <i v-if="showIcon" :class="icon" style="font-size: 18px"></i>
      <span v-if="showTitle">{{title}}</span>
      </div>
      <div class="right">
        <span v-if="item.showFresh" title="刷新" class="item">
          <i class="el-icon-refresh-right" @click="getData"></i
        ></span>
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="commonFunc-box-body" :style="bodyStyle" v-loading="loading">
      <app-link class="item com-hover" :to="item.path" v-for="(item,i) in menuList" :key="i">
        <i :class="item.icon" :style="{color:item.iconBackgroundColor||'#1890FF'}"></i>
        <p class="name">{{item.fullName}}</p>
      </app-link>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import AppLink from './Link'
import { getToken } from '@/utils/auth'
export default {
  mixins: [mixin],
  components: { AppLink },
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.getData()
  },
  watch: {
    list: {
      handler(val) {
        this.getData()
      },
      deep: true
    }
  },
  methods: {
    getData() {
      this.loading = true;
      let list = this.list.filter(o => o.id)
      list = list.map(o => {
        let path = '/' + o.urlAddress
        // 大屏
        if (o.type == 6) {
          let propertyJson = o.propertyJson ? JSON.parse(o.propertyJson) : null,
            moduleId = '';
          if (propertyJson) moduleId = propertyJson.moduleId || ''
          path = `${this.define.dataV}/view/${moduleId}?token=${getToken()}`
        }
        if (o.type == 7) {
          if (o.linkTarget === "_self") {
            path = '/' + o.enCode
          } else {
            path = o.urlAddress.replace(/\${dataV}/g, this.define.dataV).replace(/\${ccitToken}/g, getToken())
          }
        }
        return {
          ...o,
          path
        }
      })
      this.menuList = list
      this.loading = false;
    }
  },
}
</script>
<style lang="scss" scoped>
.commonFunc-box {
  >>> .el-card__body {
    width: 100%;
    height: 100%;
  }
  .commonFunc-box-body {
    padding: 0 30px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      display: block;
      text-align: center;
      i {
        display: inline-block;
        height: 40px;
        font-size: 40px;
        margin-bottom: 10px;
      }
      .name {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>