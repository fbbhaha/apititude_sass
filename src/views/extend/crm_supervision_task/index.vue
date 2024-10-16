<template>
  <div class="CCIT-common-layout">
    <div class="CCIT-common-layout-center">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的管理" name="1"></el-tab-pane>
        <el-tab-pane label="我的主办" name="2"></el-tab-pane>
        <el-tab-pane label="我的交办" name="3"></el-tab-pane>
        <el-tab-pane label="我的分管" name="4"></el-tab-pane>
        <el-tab-pane label="我的协办" name="5"></el-tab-pane>
      </el-tabs>
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="督办名称">
              <el-input v-model="query.name" placeholder="请输入" clearable>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select v-model="query.status" placeholder="请选择" clearable>
                  <el-option v-for="(item, index) in statusData" :key="index"
                              :label="item.fullName" :value="item.id"
                              :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()"
                >查询</el-button
              >
              <el-button icon="el-icon-refresh-right" @click="reset()"
                >重置</el-button
              >
            </el-form-item>
          </el-col>
          <el-button
            type="primary"
            style="float: right"
            icon="el-icon-plus"
            v-if="activeName == '1'"
            @click="addOrUpdateHandle({})"
            >新增
          </el-button>
        </el-form>
      </el-row>

      <div class="CCIT-common-layout-main CCIT-flex-main">
        <!-- <div class="CCIT-common-head">
                    <div>
                                    <el-button type="primary" icon="el-icon-plus"
                                            @click="addOrUpdateHandle()">新增
                                    </el-button>
                                    <el-button type="text" icon="el-icon-download" @click="exportData()">导出
                                    </el-button>
                    </div>
                    <div class="CCIT-common-head-right">
                        <el-tooltip effect="dark" content="刷新" placement="top">
                            <el-link icon="icon-ym icon-ym-Refresh CCIT-common-head-icon" :underline="false"
                                    @click="reset()"/>
                        </el-tooltip>
                        <screenfull :isContainer="true"/>
                        <el-tooltip effect="dark" content="列设置" placement="top">
                            <el-link icon="icon-ym icon-ym-options CCIT-common-head-icon" :underline="false"/>
                        </el-tooltip>
                    </div>
                </div> -->

        <CCIT-table v-loading="listLoading" :data="list">
          <el-table-column prop="number" label="督办编号" align="left" />
          <el-table-column prop="name" label="督办名称" align="left" />
          <el-table-column prop="content" label="工作内容" align="left" v-if="activeName == '2' || activeName == '3' || activeName == '5'"/>
          <el-table-column prop="endtime" label="截止时间" align="left" />
          <el-table-column
            prop="status"
            label="状态"
            :formatter="stateFormat"
            align="left"
          />
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="addOrUpdateHandle(scope.row, true, activeName)"
                >详情
              </el-button>
              <!-- <el-button type="text"
                                                @click="addOrUpdateHandle(scope.row)">编辑
                                        </el-button> -->
              <!-- <el-button type="text" class="CCIT-table-delBtn"
                                                @click="handleDel(scope.row.id)">删除
                                        </el-button> -->
            </template>
          </el-table-column>
        </CCIT-table>
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="initData"
        />
      </div>
    </div>
    <CCIT-Form v-if="formVisible" ref="CCITForm" @refresh="refresh" />
    <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download" />
  </div>
</template>

<script>
import request from "@/utils/request";
import { getDictionaryDataSelector } from "@/api/systemData/dictionary";
import CCITForm from "./Form";
import ExportBox from "./ExportBox";
import { previewDataInterface } from "@/api/systemData/dataInterface";

export default {
  components: { CCITForm, ExportBox },
  data() {
    return {
      //默认标签页
      activeName: "1",
      query: {
        name: undefined,
        state: undefined,
      },
      defaultProps: {
        children: "children",
        label: "fullName",
      },
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        sort: "desc",
        sidx: "",
      },
      formVisible: false,
      exportBoxVisible: false,
      columnList: [
        { prop: "number", label: "任务编号" },
        { prop: "name", label: "任务名称" },
        { prop: "endtime", label: "截止时间" },
      ],
      statusData: [
        { fullName: "待接收", id: 0 },
        { fullName: "执行中", id: 1 },
        { fullName: "已反馈", id: 2 },
        { fullName: "超时办理中", id: 3 },
        { fullName: "超时未接收", id: 4 },
        { fullName: "已完结", id: 5 },
      ]
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  methods: {
    //处理表格数据状态
    stateFormat(row, column) {
      if (row.status === "0") {
        return "待接收";
      } else if (row.status === "1") {
        return "执行中";
      } else if (row.status === "3") {
        return "已反馈";
      } else if (row.status === "4") {
        return "超时办理中";
      } else if (row.status === "5") {
        return "超时未接收";
      }else if (row.status === "6") {
        return "已完结";
      }
    },
    handleClick(tab, event) {
      this.reset();
      console.log(tab, event);
    },
    initData() {
      this.query.state = this.activeName;
      this.listLoading = true;
      let query = {
        ...this.listQuery,
        ...this.query,
      };
      request({
        url: `/api/customer/api/system/Crm_supervision_task`,
        method: "get",
        data: query,
      }).then((res) => {
        this.list = res.data.list;
        this.total = res.data.pagination.total;

        this.listLoading = false;
      });
    },
    handleDel(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          request({
            url: `/api/customer/api/system/Crm_supervision_task/${id}`,
            method: "DELETE",
          }).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              onClose: () => {
                this.initData();
              },
            });
          });
        })
        .catch(() => {});
    },
    addOrUpdateHandle(data, isDetail, activeName) {
      this.formVisible = true;
      this.$nextTick(() => {
        this.$refs.CCITForm.init(data, isDetail, activeName);
      });
    },
    exportData() {
      this.exportBoxVisible = true;
      this.$nextTick(() => {
        this.$refs.ExportBox.init(this.columnList);
      });
    },
    download(data) {
      let query = { ...data, ...this.listQuery, ...this.query };
      request({
        url: `/api/customer/api/system/Crm_supervision_task/Actions/Export`,
        method: "GET",
        data: query,
      }).then((res) => {
        if (!res.data.url) return;
        window.location.href = this.define.comUrl + res.data.url;
        this.$refs.ExportBox.visible = false;
        this.exportBoxVisible = false;
      });
    },
    search() {
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: "desc",
        sidx: "",
      };
      this.initData();
    },
    refresh(isrRefresh) {
      this.formVisible = false;
      if (isrRefresh) this.reset();
    },
    reset() {
      for (let key in this.query) {
        this.query[key] = undefined;
      }
      this.listQuery = {
        currentPage: 1,
        pageSize: 20,
        sort: "desc",
        sidx: "",
      };
      this.initData();
    },
  },
};
</script>