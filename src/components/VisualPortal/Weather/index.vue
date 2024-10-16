<template>
  <el-card class="portal-box" :style="cardStyle">
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
    <div class="body" ref="box" :style="bodyStyle">
      <component ref="comp" :is="mode"></component>
    </div>
  </el-card>
</template>
<script>
import standard from "./standard.vue";
import simple from "./simple.vue";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  components: {
    standard,
    simple,
  },
  data() {
    return {
      mode: "standard",
    };
  },
  methods: {
    getData() {},
  },
};
</script>
<style lang="scss" scoped>
.body {
  padding: 0;
  overflow: hidden;
  cursor: pointer;
}
</style>