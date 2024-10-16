<template>
  <div class="container">
    <div class="header">
      <span class="title">我的督办</span>
    </div>
    <van-tabs v-model="activeName" @change="handleClick">
      <van-tab
        v-for="(item, index) in tabs"
        :key="index"
        :title="item.label"
        :name="item.name"
      >
      </van-tab>
      <div class="scroll">
          <van-list
            v-model="listLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell-group
              v-for="(item, index) in list"
              :key="index"
              class="card"
            >
             <van-cell title="督办编号" :value="item.number" />
              <van-cell title="督办名称" :value="item.name" />
               <van-cell
                v-if="'2,3,5'.indexOf(activeName) > -1"
                title="工作内容"
                :value="item.content"
              />
              <van-cell title="截止时间" :value="item.endtime" />
               <van-cell title="状态" :value="stateFormat(item)" />
              
              <van-row type="flex" justify="end" class="button">
                <van-button
                  icon="info-o"
                  type="info"
                  size="small"
                  plain
                  hairline
                  @click="addOrUpdateHandle(item, true, activeName)"
                  >详情</van-button
                >
                <!-- <van-button
                  style="margin-left: 5px"
                  icon="delete-o"
                  type="danger"
                  size="small"
                  plain
                  hairline
                  @click="handleDel()"
                  >删除</van-button
                > -->
              </van-row>
            </van-cell-group>
          </van-list>
        </div>
    </van-tabs>
    <van-button
      v-if="activeName === '1'"
      class="add"
      icon="plus"
      type="info"
      round
      @click="addOrUpdateHandle({}, false, activeName)"
    ></van-button>
    <!-- <CCIT-Form v-if="formVisible" ref="CCITForm" @refresh="refresh" /> -->
    <Form v-show="formVisible" ref="CCITForm" :title="formTitle" :activeName="activeName" @close="closeForm" @refresh="refresh"></Form>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Dialog } from "vant";
import { getDictionaryDataSelector } from "@/api/systemData/dictionary";
import Form from "./Form";
import ExportBox from "./ExportBox";
import { previewDataInterface } from "@/api/systemData/dataInterface";

export default {
  components: { Form, ExportBox },
  data() {
    return {
      tabs: [
        { label: "我的管理", name: "1" },
        { label: "我的主办", name: "2" },
        { label: "我的交办", name: "3" },
        { label: "我的分管", name: "4" },
        { label: "我的协办", name: "5" },
      ],
      formTitle: "",
      list: [],
      loading: false,
      finished: false,
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
      formVisible: false,
    };
  },
  computed: {},
  created() {
    this.initData();
  },
  methods: {
    onLoad() {
      if(this.finished) return
      this.initData()
    },
    closeForm() {
      this.formVisible = false;
    },
    addUnderTaker(form) {

    },
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
      } else if (row.status === "6") {
        return "已完结";
      }
    },
    handleClick(tab, event) {
      this.reset();
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
        this.list = this.list.concat(res.data.list);
        this.total = res.data.pagination.total;
        if(this.list.length >= this.total) {
          this.finished = true
        } else {
          this.listQuery.currentPage++
        }
        this.listLoading = false;
      }).catch(err => {
        this.listLoading = false
        this.finished = true
      })
    },
    handleDel(id) {
      Dialog.confirm({
        title: "提示",
        message: "此操作将永久删除该数据, 是否继续?",
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
      // this.formTitle = id ? "编辑督办" : "新增督办";
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
      this.list = []
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
<style lang="scss" scoped>
.container {
  background-color: #fafafa;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    background-color: #fff;
    .back {
      position: absolute;
      top: 16px;
      left: 16px;
      cursor: pointer;
      font-size: 24px;
    }
    .title {
      font-weight: 600;
      font-size: 17px;
      text-transform: capitalize;
    }
  }
  .scroll {
    height: calc(100vh - 110px);
    overflow-y: auto;
  }
  .card {
    margin: 10px 20px;
    .button {
      padding: 0 10px 10px;
    }
  }
  .add {
    position: fixed;
    bottom: 35%;
    right: 30px;
  }
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>