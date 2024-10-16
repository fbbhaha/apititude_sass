<template>
  <el-card class="portal-eChart-box" :style="cardStyle">
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
    <div class="eChart-box-body" :style="bodyStyle" v-loading="loading">
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
import { getDataInterfaceRes } from "@/api/systemData/dataInterface";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [resize, mixin],
  data() {
    return {
      chart: null,
      isEmpty: false,
      markLine: [],
      markPoint: [],
      reload: false,
      option: {},
    };
  },
  mounted() {
    if (!this.reload) {
      this.getEchart();
    } else {
      this.initChart();
    }
  },
  watch: {
    option: {
      handler(val) {
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
    markLine: {
      handler(val) {
        this.markChange(val, "markLine");
      },
      deep: true,
    },
    markPoint: {
      handler(val) {
        this.markChange(val, "markPoint");
      },
      deep: true,
    },
    dataInterface() {
      this.getEchart();
    },
  },
  methods: {
    getEchart() {
      if (!this.dataInterface) {
        this.initChart();
        return;
      }
      getDataInterfaceRes(this.dataInterface).then((res) => {
        let data = res.data.data;
        if (data) {
          //设置坐标值
          if (this.option.xAxis[0].type == "category") {
            this.option.xAxis[0].data = data.categories;
          } else {
            this.option.yAxis[0].data = data.categories;
          }
          //设置数据
          this.option.legend.data = [];
          if (data.series) {
            for (let i = 0; i < data.series.length; i++) {
              let item = data.series[i];
              this.option.series[i].name = item.name;
              this.option.series[i].data = item.data;
              this.option.legend.data.push(item.name);
            }
          }
          this.initChart();
        }
      });
    },
    markChange(val, type) {
      if (this.option.series && this.option.series.length > 0) {
        for (let i = 0; i < this.option.series.length; i++) {
          let item = this.option.series[i];
          let data = [];
          for (let j = 0; j < val.length; j++) {
            data.push({ type: val[j] });
          }
          item[type] = { data: data };
        }
        this.initChart();
      }
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart, this.option.theme || "");
      this.chart.setOption(this.option);
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
