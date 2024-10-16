<template>
  <div>
    <el-card ref="card" class="portal-box" :style="cardStyle">
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
      <div :style="bodyStyle" v-loading="loading">
        <video
          ref="video"
          id="video"
          :autoplay="config.autoplay"
          :loop="config.loop"
          controls
          width="100%"
          height="100%"
        >
          <!-- <source src="../../../../static/mp4/test.mp4"> -->
          <!-- <source src="../../../../static/mp4/test2.mp4"> -->
          您的浏览器不支持 video 标签。
        </video>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getDownloadUrl } from "@/api/common";

export default {
  mixins: [mixin],
  data() {
    return {
      config: {
        autoplay: false,
        loop: false,
      },
      fileId: "",
      videoUrl: "",
    };
  },
  watch: {
    "config.autoplay"(val) {
      var video = document.getElementById("video");
      if (val) {
        video.play();
      } else {
        video.pause();
      }
    },
  },
  mounted() {
    if (this.fileId) {
      getDownloadUrl("annex", this.fileId).then((res) => {
        this.$refs.video.src = this.define.comUrl + res.data.url;
      });
    } else {
      this.$refs.video.src = "";
    }
  },
};
</script>
<style lang="scss" scoped>
</style>