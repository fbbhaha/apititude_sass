<template>
  <el-card
    class="portal-box"
    :style="cardStyle"
  >
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
    <div class="portal-box-body" :style="bodyStyle">
      <div v-if="fileId">
        <el-image class="img" :src="downLoadUrl" :fit="fit">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
    </div>
  </el-card>
</template>
<script>
import { getDownloadUrl } from "@/api/common";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
      fileId: "",
      fit: "",
    };
  },
  computed: {
    downLoadUrl() {
      getDownloadUrl("annex", this.fileId).then((res) => {
        return this.define.comUrl + res.data.url;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.img {
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>