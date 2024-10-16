<template>
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
    <div class="portal-box-body" :style="bodyStyle" v-loading="loading">
      <el-carousel
        class="carousel"
        :autoplay="config.autoplay"
        :interval="config.interval"
        :type="config.type"
        :arrow="config.arrow"
        :indicator-position="config.indicatorPosition"
        height="100%"
      >
        <el-carousel-item
          v-for="(item, index) in imgList"
          :key="index"
          class="item"
        >
          <el-image
            class="item-img"
            :src="item.src"
            style="width: 100%; height: 100%"
            @click="openURL(item.url)"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i></div
          ></el-image>
          <span class="item-text" :style="descStyle(item)">{{
            item.desc
          }}</span>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getDownloadUrl } from "@/api/common";
export default {
  mixins: [mixin],
  data() {
    return {
      config: {},
    };
  },
  watch: {
    list: {
      handler(val) {
        this.getData(val);
      },
      deep: true,
    },
  },
  computed: {
    descStyle() {
      return (item) => {
        let obj = {};
        if (item.css) {
          obj = JSON.parse(item.css);
        }
        return obj;
      };
    },
  },
  created() {
    this.getData(this.list);
  },
  data() {
    return {
      id: new Date().getTime(),
      imgList: [],
    };
  },
  methods: {
    openURL(url) {
      if (url) {
        window.open(url, "_blank");
      }
    },
    getData(list) {
      this.loading = true;
      let imgTmpList = list.slice(0);
      for (let i = 0; i < list.length; i++) {
        if (list[i].img) {
          getDownloadUrl("annex", list[i].img).then((res) => {
            imgTmpList[i].src = this.define.comUrl + res.data.url;
          });
        }
      }
      this.imgList = imgTmpList;
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.carousel {
  height: 100%;
  >>> .el-carousel__arrow {
    background-color: #f5f5f5;
    color: #333;
    &:hover {
      opacity: 0.8;
      background-color: #f5f5f5;
    }
  }
}
.item {
  background-color: #fff;
  &-img {
    >>> .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #f5f7fa;
      color: #909399;
      font-size: 30px;
    }
  }
  &-text {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>