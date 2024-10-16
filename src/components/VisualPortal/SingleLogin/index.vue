<template>
  <el-card :class="['login-box', titleColor]" :style="cardStyle">
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
    <div class="login-content" :style="bodyStyle">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="jumpToLogin(item.sysUrl)"
      >
        <div class="item-img">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="item-name">{{ item.name }}</div>
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
      events: [],
    };
  },
  methods: {
    jumpToLogin(url) {
      window.open(url, "blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.login-box {
  >>> .el-card__body {
    width: 100%;
    height: 100%;
  }
  .login-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    .item {
      width: 20%;
      height: 70px;
      &-img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-icon {
        color: #ffffff;
        font-size: 24px;
        display: block;
        text-align: center;
        height: 50px;
        line-height: 50px;
      }
      &-name {
        color: #333333;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        height: 30px;
      }
    }
  }
}
</style>