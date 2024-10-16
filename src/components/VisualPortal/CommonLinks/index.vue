<template>
  <el-card class="links-box" :style="cardStyle">
    <div :slot="headerSlot" class="portal-common-title" :style="titleStyle">
      <div class="left">
        <div v-if="showBlock" class="block" :style="blockStyle"></div>
        <i v-if="showIcon" :class="icon" style="font-size: 18px"></i>
        <span v-if="showTitle">{{ title }}</span>
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
    <div
      class="links-content"
      :style="[bodyStyle, linkStyle]"
      v-loading="loading"
    >
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="jumpToLogin(item.url)"
      >
        <i
          :style="{ color: color, fontSize: fontSize + 'px' }"
          class="ym-custom ym-custom-link-variant"
        ></i>
        <a :style="{ color: color, fontSize: fontSize + 'px' }">{{
          item.name
        }}</a>
      </div>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
      position: "center",
      fontSize: 12,
    };
  },
  computed: {
    linkStyle() {
      return {
        backgroundColor: this.bgColor,
        justifyContent: this.position,
      };
    },
  },
  methods: {
    jumpToLogin(url) {
      window.open(url, "blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.links-box {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  height: 100%;
  >>> .el-card__header {
    display: none;
  }
  >>> .el-card__body {
    width: 100%;
    height: 100%;
    padding: 0px;
  }
  .links-content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .item {
      width: 90px;
      height: 35px;
      line-height: 35px;
      display: flex;
      margin-left: 10px;
      // i {
      //   // color: #4696ec;
      //   // font-size: 14px;
      // }
      a {
        // font-size: 14px;
        margin-left: 5px;
      }
    }
  }
}
</style>