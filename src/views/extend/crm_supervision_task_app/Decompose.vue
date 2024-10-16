<template>
  <transition name="el-zoom-in-center">
    <div class="container">
      <div class="header">
        <van-icon class="back" name="arrow-left" @click="goBack" />
        <span class="title">分解</span>
      </div>
      <div class="form">
        <template v-if="decomposeDataForm.decomposeList.length">
          <van-cell-group
            v-for="(item, index) in decomposeDataForm.decomposeList"
            :key="index"
            class="card"
          >
            <van-cell title="工作内容" :value="item.content" />
            <van-cell title="开始时间" :value="ccit.toDate(item.starttime)" />
            <van-cell title="结束时间" :value="ccit.toDate(item.endtime)" />
            <van-cell title="主办部门" :value="departmentText(item.hostdept)" />
            <van-cell title="主办人" :value="userText(item.sponsor)" />
            <van-cell
              title="协办部门"
              :value="departmentText(item.assistingdept)"
            />
            <van-cell title="协办人" :value="userText(item.assistant)" />
            <van-row type="flex" justify="end" class="button">
              <van-button
                icon="edit"
                type="info"
                size="small"
                plain
                hairline
                @click="addOrUpdateHandle(item, index)"
                >编辑</van-button
              >
              <van-button
                style="margin-left: 5px"
                icon="delete-o"
                type="danger"
                size="small"
                plain
                hairline
                @click="delDecomposeList(index)"
                >删除</van-button
              >
            </van-row>
          </van-cell-group>
        </template>
        <template v-else>
          <van-empty description="暂无分解任务" />
        </template>
      </div>
      <div style="margin: 16px">
        <van-row>
          <van-col :span="12">
            <van-button
              style="border-radius: 999px 0 0 999px"
              round
              block
              type="info"
              native-type="submit"
              @click="addOrUpdateHandle()"
              >新增</van-button
            >
          </van-col>
          <van-col :span="12">
            <van-button
              :disabled="decomposeDataForm.decomposeList.length == 0"
              style="border-radius: 0 999px 999px 0"
              block
              type="info"
              native-type="submit"
              @click="decompose()"
              >确定</van-button
            >
          </van-col>
        </van-row>
      </div>
      <under-taker
        ref="UnderTaker"
        v-show="showUnderTaker"
        :departmentTreeData="departmentTreeData"
        :userList="userList"
        @close="showUnderTaker = false"
        @submit="handleUnderTaker"
      ></under-taker>
    </div>
  </transition>
</template>
<script>
import request from "@/utils/request";
import UnderTaker from "./Undertaker.vue";
import { getDepartmentList,getDepartmentListApp } from "@/api/permission/department";
import { UserListAll } from "@/api/permission/user";

export default {
  components: { UnderTaker  },
  props: ["title", "activeName", "redeployData"],
  data() {
    return {
      showUnderTaker: false,
      remindtargetarr: [],
      userList: [],
      //分解任务列表list
      DecomposeTaskList: [],
      //分解数据
      decomposeDataForm: {
        decomposeList: [],
      },
      //分解提交数据
      decomposeLists: { decomposeList: [] },
      departmentTreeData: [],
      dataForm: {
        remindtime: undefined,
        remindmode: undefined,
        remindtarget: undefined,
        remindcycle: undefined,
        transfer: undefined,
        name: undefined,
        endtime: undefined,
        isremind: 0,
        drafter: "",
        accessory: [],
        remark: undefined,
        crm_supervision_task_itemEntityList: [],
      },
      underTakerAction: "A",
      underTakerIndex: 0,
    };
  },
  computed: {
    departmentText() {
      return (val) => {
        if (this.departmentTreeData.length && val) {
          let obj = this.departmentTreeData.find((item) => {
            return item.id === val;
          });
          return obj ? obj.text : "";
        }
      };
    },
    userText() {
      return (val) => {
        if (this.userList.length && val) {
          let obj = this.userList.find((item) => {
            return item.id === val;
          });
          return obj ? obj.text : "";
        }
      };
    },
  },
  watch: {},
  created() {
    // 获取部门树
    getDepartmentListApp("96240625-934F-490B-8AA6-0BC775B18468").then((res) => {
      res.data.list.forEach((item) => {
        item.text = item.fullName;
      });
      this.departmentTreeData = res.data.list;
    });
    UserListAll().then((res) => {
      res.data.list.forEach((item) => {
        item.text = item.realName;
      });
      this.userList = res.data.list;
    });
  },
  mounted() {},
  methods: {
    goBack() {
      this.decomposeDataForm.decomposeList = []
      this.$emit("close");
    },
    addOrUpdateHandle(item, index) {
      this.underTakerAction = item ? "U" : "A";
      this.underTakerIndex = index;
      this.showUnderTaker = true;
      this.$refs.UnderTaker.init(item);
    },
    //获取分解任务列表
    getDecomposeTaskList() {
      request({
        url:
          `/api/customer/api/system/Crm_supervision_task/getDecomposeTaskList/` +
          this.redeployData.taskItemId,
        method: "get",
      }).then((res) => {
        this.DecomposeTaskList = res.data;
      });
    },
    //分解任务
    decompose() {
      if (this.decomposeDataForm.decomposeList < 1) {
        this.$message({
          message: "请添加承办人",
          type: "warning",
        });
        return;
      }
      this.decomposeDataForm.crm_supervision_task_itemEntityList =
        this.decomposeDataForm.decomposeList;
      this.decomposeDataForm.activeName = this.activeName;
      this.decomposeDataForm.taskId = this.redeployData.id;
      this.decomposeDataForm.redeployId = this.redeployData.redeployId;
      this.decomposeDataForm.taskItemId = this.redeployData.taskItemId;
      request({
        url: `/api/customer/api/system/Crm_supervision_task/decompose`,
        method: "post",
        data: this.decomposeDataForm,
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {
            this.$emit("close");
          },
        });
      });
    },
    handleUnderTaker(item) {
      if (this.underTakerAction === "U") {
        this.decomposeDataForm.decomposeList.splice(
          this.underTakerIndex,
          1,
          item
        );
      } else {
        this.decomposeDataForm.decomposeList.push(item);
      }
    },
    delDecomposeList(index) {
      this.decomposeDataForm.decomposeList.splice(index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
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
  .form {
    margin: 10px 20px;
    overflow: auto;
    flex: 1;
  }
}
.card {
  margin: 10px 0;
  .button {
    padding: 0 10px 10px;
  }
}
</style>