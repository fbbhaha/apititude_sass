<template>
  <el-card
    class="portal-eChart-box"
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
    <div class="eChart-box-body">
      <div ref="chart" id="chart" v-show="!isEmpty"></div>
      <div
        class="portal-common-noData portal-common-noData-eChart"
        v-show="isEmpty"
      >
        <img
          src="@/assets/images/portal-nodata.png"
          alt=""
          class="noData-img"
        />
        <p class="noData-txt">暂无数据</p>
      </div>
    </div>
  </el-card>
</template>
<script>
import echarts from "echarts";
import resize from "@/components/Charts/mixins/resize";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [resize, mixin],
  data() {
    return {
      chart: null,
      currOption: {},
      isEmpty: false,
    };
  },
  mounted() {
    this.currOption = this.option;
    this.initChart();
  },
  watch: {
    option: {
      handler(val) {
        this.currOption = val;
        this.isEmpty = JSON.stringify(val) === "{}";
        if (!this.isEmpty) {
          if (this.chart) {
            this.chart.dispose();
          }
          this.initChart();
        }
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.chart = echarts.init(
        this.$refs.chart,
        this.option.theme || "vintage"
      );
      this.chart.setOption(this.currOption);
      setTimeout(() => {
        this.$nextTick(() => {
          this.chart.resize();
        });
      }, 50);
    },
  },
  beforeDestroy() {
    if (!this.chart) return;
    this.chart.dispose();
    this.chart = null;
  },
};
</script>
