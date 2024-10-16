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
    <div class="portal-box-body" :style="bodyStyle" v-loading="loading">
      <template v-if="noticeList.length">
        <el-table
          :data="noticeList"
          style="width: 100%"
          :show-header="showHeader"
          :row-style="{ height: '0' }"
          :cell-style="{ padding: '0' }"
          height="100%"
        >
          <template v-for="(colItem, index) in columns">
            <el-table-column
              :key="index"
              v-if="colItem.selection && colItem.prop == 'fullName'"
              :prop="colItem.prop"
              :label="colItem.label"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  style="color: #333 !import"
                  @click="handleView(scope.row.id)"
                  >{{ scope.row.fullName }}</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              :key="index"
              v-if="colItem.selection && colItem.prop == 'creator'"
              :prop="colItem.prop"
              :label="colItem.label"
              width="100px"
            ></el-table-column>
            <el-table-column
              :key="index"
              v-if="colItem.selection && colItem.prop == 'publishTime'"
              :prop="colItem.prop"
              :label="colItem.label"
              width="100px"
            >
              <template slot-scope="scope">
                {{ scope.row[colItem.prop] | toDate("yyyy-MM-dd") }}
              </template>
            </el-table-column>
          </template>
        </el-table>
        <!--<router-link class="item" to="/messageRecord" v-for="(item, i) in list" :key="i">
          <span class="name">{{item.fullName}}</span>
          <span class="time">{{item.creatorTime | toDate('yyyy-MM-dd')}}</span>
        </router-link>-->
      </template>
      <div class="portal-common-noData" v-else>
        <img
          src="@/assets/images/portal-nodata.png"
          alt=""
          class="noData-img"
        />
        <p class="noData-txt">暂无数据</p>
      </div>
    </div>
    <ViewNotice v-if="viewVisible" ref="View" @refreshDataList="getData" />
  </el-card>
</template>
<script>
import { getNotice } from "@/api/home";
import { mixin } from "../visualPortalMixin";
import ViewNotice from "@/views/system/notice/View";
export default {
  mixins: [mixin],
  components: { ViewNotice },
  data() {
    return {
      columns: [],
      noticeList: [],
      viewVisible: false,
      showHeader: false,
    };
  },
  created() {
    this.columns = this.list;
    this.getData();
  },
  watch: {
    list: {
      handler(val) {
        this.columns = val;
      },
      deep: true,
    },
  },
  methods: {
    getData() {
      this.loading = true;
      getNotice().then((res) => {
        if (res.data) {
          if (res.data.list.length > 6) {
            this.noticeList = res.data.list.slice(0, 6);
          } else {
            this.noticeList = res.data.list;
          }
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleView(id) {
      this.viewVisible = true;
      this.$nextTick(() => {
        this.$refs.View.init(id);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 14px;
  display: inline-block;
  width: calc(100% - 180px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  vertical-align: top;
}
</style>
