<template>
  <transition name="el-zoom-in-center">
    <div class="container">
      <div class="header">
        <van-icon class="back" name="arrow-left" @click="goBack" />
        <span class="title">{{ title }}</span>
      </div>
      <van-form ref="elForm" class="form" @submit="dataFormSubmit">
        <van-field
          v-model="dataForm.content"
          rows="4"
          autosize
          label="工作内容"
          type="textarea"
          maxlength="150"
          placeholder="请输入工作内容"
          show-word-limit
          :rules="rules.content"
        />
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="ccit.toDate(dataForm.starttime)"
          label="开始时间"
          placeholder="请选择开始时间"
          :rules="rules.starttime"
          @click="pickerTime('starttime')"
        />
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="ccit.toDate(dataForm.endtime)"
          label="结束时间"
          placeholder="请选择结束时间"
          :rules="rules.endtime"
          @click="pickerTime('endtime')"
        />
        <van-field
          readonly
          clickable
          :value="departmentText(dataForm.hostdept)"
          label="主办部门"
          placeholder="请选择主办部门"
          :rules="rules.hostdept"
          @click="showPopupUp('hostdept')"
        >
        </van-field>
        <van-field
          readonly
          clickable
          :value="userText(dataForm.sponsor)"
          label="主办人"
          placeholder="请选择主办人"
          @click="showPopupUp('sponsor')"
        >
        </van-field>
        <van-field
          readonly
          clickable
          :value="departmentText(dataForm.assistingdept)"
          label="协办部门"
          placeholder="请选择协办部门"
          @click="showPopupUp('assistingdept')"
        >
        </van-field>
        <van-field
          readonly
          clickable
          :value="userText(dataForm.assistant)"
          label="协办人"
          placeholder="请选择协办人"
          @click="showPopupUp('assistant')"
        >
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="datetime"
          v-model="currentDate"
          @confirm="timeConfirm"
          @cancel="showPicker = false"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>
      <van-popup v-model="showTreePopup" position="bottom">
        <van-picker
          show-toolbar
          :title="popupTitle"
          :columns="treeData"
          :loading="loading"
          @confirm="pickerConfirm"
          @cancel="showTreePopup = false"
        />
      </van-popup>
    </div>
  </transition>
</template>
<script>
import request from "@/utils/request";
import { getDepartmentMember } from "@/api/permission/userOrganize";
export default {
  components: {},
  props: ["departmentTreeData", "userList"],
  data() {
    return {
      title: "",
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      showPicker: false,
      showTreePopup: false,
      timeKey: "",
      popupTitle: "",
      popupType: "",
      treeData: [],
      redeployData: {},
      loading: false,
      dataForm: {
        remindtime: undefined,
        remindmode: undefined,
        remindtarget: undefined,
        remindcycle: undefined,
        transfer: undefined,
        name: undefined,
        endtime: undefined,
        isremind: 0,
        drafter: this.$store.getters.userInfo.userName,
        accessory: [],
        remark: undefined,
        crm_supervision_task_itemEntityList: [],
      },
      rules: {
        name: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        endtime: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        isremind: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        feedbackContent: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        transfer: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            trigger: ["change", "blur"],
          },
        ],
        starttime: [
          {
            required: true,
            trigger: ["change", "blur"],
          },
        ],
        endtime: [
          {
            required: true,
            trigger: ["change", "blur"],
          },
        ],
        hostdept: [
          {
            required: true,
            trigger: ["change", "blur"],
          },
        ],
      },
      action: "A",
    };
  },
  watch: {},
  computed: {
    departmentText() {
      return (val) => {
        if (this.departmentTreeData.length && val) {
          let obj = this.departmentTreeData.find((item) => {
            return item.id === val;
          });
          return obj ? obj.text : "";
        }
        return "";
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
  mounted() {},
  methods: {
    goBack() {
      this.$emit("close");
    },
    showPopupUp(type) {
      this.popupType = type;
      this.treeData = [];
      if (type === "hostdept") {
        this.treeData = this.departmentTreeData;
        this.popupTitle = "主办部门";
      } else if (type === "sponsor") {
        if (!this.dataForm.hostdept) {
          this.$message({
            message: "请先选择主办部门",
            type: "warning",
          });
          return;
        }
        this.popupTitle = "主办人";
        this.loading = true;
        getDepartmentMember(this.dataForm.hostdept)
          .then((res) => {
            res.data.list.forEach((item) => {
              item.id = item.userId;
              item.text = item.realName;
            });
            this.treeData = res.data.list;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else if (type === "assistingdept") {
        this.popupTitle = "协办部门";
        this.treeData = this.departmentTreeData;
      } else if (type === "assistant") {
        if (!this.dataForm.assistingdept) {
          this.$message({
            message: "请先选择协办部门",
            type: "warning",
          });
          return;
        }
        this.popupTitle = "协办人";
        this.loading = true;
        getDepartmentMember(this.dataForm.assistingdept)
          .then((res) => {
            res.data.list.forEach((item) => {
              item.id = item.userId;
              item.text = item.realName;
            });
            this.treeData = res.data.list;
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      }
      this.showTreePopup = true;
    },
    pickerTime(key) {
      this.showPicker = true;
      this.timeKey = key;
    },
    timeConfirm(time) {
      this.dataForm[this.timeKey] = time.getTime();
      this.showPicker = false;
    },
    pickerConfirm(val) {
      if (val.id === this.dataForm[this.popupType]) {
        this.showTreePopup = false;
        return;
      }
      this.dataForm[this.popupType] = val.id;
      if (this.popupType === "hostdept") {
        this.dataForm.sponsor = "";
      }
      if (this.popupType === "assistingdept") {
        this.dataForm.assistant = "";
      }
      this.showTreePopup = false;
    },
    async getUserData() {
      this.userData = await this.$store.dispatch("base/getUserTree");
    },
    init(data) {
      this.action = data ? "U" : "A";
      this.title = data ? "编辑承办人" : "新建承办人";
      if (data) {
        this.dataForm = JSON.parse(JSON.stringify(data));
      } else {
        this.dataForm = {
          remindtime: undefined,
          remindmode: undefined,
          remindtarget: undefined,
          remindcycle: undefined,
          transfer: undefined,
          name: undefined,
          endtime: undefined,
          isremind: 0,
          drafter: this.$store.getters.userInfo.userName,
          accessory: [],
          remark: undefined,
          crm_supervision_task_itemEntityList: [],
        };
      }
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["elForm"]
        .validate()
        .then(() => {
          this.$emit("submit", this.dataForm);
          this.$emit("close");
          this.$refs["elForm"].resetValidation();
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fafafa;
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
  }
}
</style>