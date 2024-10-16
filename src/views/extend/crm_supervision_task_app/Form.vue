<template>
  <transition name="el-zoom-in-center">
    <div class="container">
      <div class="header">
        <van-icon class="back" name="arrow-left" @click="goBack" />
        <span class="title">
          {{ !dataForm.id ? "新建" : isDetail ? "详情" : "编辑" }}
        </span>
      </div>
      <van-form class="form" ref="elForm">
        <van-field
          v-model="dataForm.srctype"
          label="来源"
          :rules="rules.srctype"
        />
        <van-field
          :readonly="isDetail"
          v-model="dataForm.name"
          label="督办名称"
          placeholder="请输入督办名称"
          :rules="rules.name"
        />

        <van-field
          :readonly="isDetail"
          v-model="dataForm.remark"
          rows="4"
          autosize
          label="督办内容"
          type="textarea"
          maxlength="150"
          placeholder="请输入督办内容"
          show-word-limit
          :rules="rules.remark"
        />
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="ccit.toDate(dataForm.endtime)"
          label="截止时间"
          placeholder="请选择截止时间"
          :rules="rules.endtime"
          @click="showPicker = true"
        />

        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
            :disabled="isDetail"
            type="datetime"
            v-model="currentDate"
            @confirm="timeConfirm"
            @cancel="showPicker = false"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>

        <van-field
          readonly
          clickable
          name="radio"
          v-model="dataForm.isremind"
          label="是否提醒"
          :rules="rules.isremind"
        >
          <template #input>
            <van-radio-group
              :disabled="isDetail"
              v-model="dataForm.isremind"
              direction="horizontal"
            >
              <van-radio name="1" style="margin-right: 40rpx">是</van-radio>
              <van-radio name="0">否</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <div v-if="dataForm.isremind == 1" >
        <van-field label="提醒周期">
          <template #input>
            <van-radio-group
              direction="horizontal"
              v-model="dataForm.remindcycle"
             @change="dataForm.remindtime = undefined"
            >
              <van-radio name="每天">每天</van-radio>
              <van-radio name="每周">每周</van-radio>
              <van-radio name="每月">每月</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <div v-if="dataForm.remindcycle == '每天'">
        <van-field label="每天几点" :value="dataForm.remindtime" @click="showdayPicker = true" readonly />
          <van-popup v-model="showdayPicker" position="bottom" >
              <van-datetime-picker
                :disabled="isDetail"
                v-model="currentDate1"
                @confirm="dayConfirm"
                type="time"
                title="选择时间"
                :min-hour="0"
                :max-hour="23"
                @cancel="showdayPicker = false"
              />
          </van-popup>
        </div>
        <div v-if="dataForm.remindcycle == '每周'">
          <van-field label="每周几" :value="dataForm.remindtime"
          readonly @click="showweekPicker = true" />
          <van-popup v-model="showweekPicker" round position="bottom" >
              <van-picker :columns="week" 
                v-model="currentDate"
                show-toolbar="true"
                @confirm="weekConfirm"
                @cancel="showweekPicker = false"/>
          </van-popup>
        </div>
        <div v-if="dataForm.remindcycle == '每月'">
          <van-field label="每月几号" readonly
            :value="ccit.toDate(dataForm.remindtime,'dd')" 
            @click="showmonthPicker = true" />
            <van-popup v-model="showmonthPicker" position="bottom" > 
              <van-datetime-picker
                v-model="currentDate"
                type="month-day"
                title="选择月日"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="monthConfirm"
                @cancel="showmonthPicker = false"
              />
          </van-popup>
        </div>
        <van-field label="提醒对象">
          <template #input>
            <van-checkbox-group v-model="remindtargetarr" direction="horizontal">
              <van-checkbox name="主办" shape="square" style="margin-right: 40rpx">主办</van-checkbox>
              <van-checkbox name="协办" shape="square">协办</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
         <van-field label="提醒方式">
          <template #input>
            <van-checkbox-group v-model="remindmodearr" :disabled="isDetail" direction="horizontal">
              <van-checkbox name="系统消息" shape="square" style="margin-right: 40rpx">系统消息</van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
      </div>

        <van-field
          readonly
          clickable
          :value="dataForm.drafter"
          label="起草人"
        ></van-field>
        <van-field class="accessory" readonly clickable label="附件">
          <template #input>
            <CCIT-UploadFz
              v-model="accessoryList"
              :fileSize="2"
              sizeUnit="MB"
              :limit="9"
              buttonText="点击上传"
              :disabled="isDetail"
            >
            </CCIT-UploadFz>
          </template>
        </van-field>
        <template
          v-if="
            !isDetail || dataForm.crm_supervision_task_itemEntityList.length
          "
        >
          <van-divider v-if="isDetail">承办人信息</van-divider>
          <van-field v-else class="accessory" readonly label="承办人信息">
            <template v-if="!isDetail" #input>
              <van-button
                icon="plus"
                type="info"
                size="small"
                plain
                @click="addOrUpdateHandle()"
                >新建</van-button
              >
            </template>
          </van-field>
          <van-collapse accordion v-model="collapse1" :border="false">
            <van-collapse-item
              v-for="(
                item, index
              ) in dataForm.crm_supervision_task_itemEntityList"
              :key="index"
              :name="index"
            >
              <template #title>
                <div>承办人{{ index + 1 }}</div>
              </template>
              <van-cell-group class="card">
                <van-cell title="工作内容" :value="item.content" />
                <van-cell
                  title="开始时间"
                  :value="ccit.toDate(item.starttime)"
                />
                <van-cell title="结束时间" :value="ccit.toDate(item.endtime)" />
                <van-cell
                  title="主办部门"
                  :value="departmentText(item.hostdept)"
                />
                <van-cell title="主办人" :value="userText(item.sponsor)" />
                <van-cell
                  title="协办部门"
                  :value="departmentText(item.assistingdept)"
                />
                <van-cell title="协办人" :value="userText(item.assistant)" />
                <van-row
                  v-if="!isDetail"
                  type="flex"
                  justify="end"
                  class="button"
                >
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
                    @click="handleDelcrm_supervision_task_itemEntityList(index)"
                    >删除</van-button
                  >
                </van-row>
              </van-cell-group></van-collapse-item
            >
          </van-collapse>
        </template>
        <template v-if="operatingData.length">
          <van-divider>流转记录</van-divider>
          <van-steps
            direction="vertical"
            active-color="#969799"
            active-icon="circle"
          >
            <van-step v-for="(activity, index) in operatingData" :key="index">
              <h4
                style="color: #46a6ff"
                v-if="activity.type == '3'"
                @click="feedbackDetails(activity.redeployid)"
              >
                {{ activity.details }} <van-icon name="eye-o" />
              </h4>
              <h4 v-else>{{ activity.details }}</h4>
              <span>{{ activity.submittime }}</span>
            </van-step>
          </van-steps>
        </template>
        <template v-if="isDetail && DecomposeTaskList.length > 0">
          <van-divider>分解任务信息</van-divider>
          <van-collapse accordion v-model="collapse2" :border="false">
            <van-collapse-item
              v-for="(item, index) in DecomposeTaskList"
              :key="index"
              :name="index"
            >
              <template #title>
                <div>分解任务{{ index + 1 }}</div>
              </template>
              <van-cell-group class="card">
                <van-cell title="工作内容" :value="item.content" />
                <van-cell
                  title="开始时间"
                  :value="ccit.toDate(item.starttime)"
                />
                <van-cell title="结束时间" :value="ccit.toDate(item.endtime)" />
                <van-cell title="主办部门" :value="item.hostdept" />
                <van-cell title="主办人" :value="item.sponsor" />
                <van-cell title="协办部门" :value="item.assistingdept" />
                <van-cell
                  title="协办人"
                  :value="item.assistant"
                /> </van-cell-group
            ></van-collapse-item>
          </van-collapse>
        </template>
      </van-form>
      <div v-if="!isDetail" style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          @click="dataFormSubmit"
          >确定</van-button
        >
      </div>
      <div v-else style="margin: 16px">
        <template
          v-if="
            (activeName == '2' || activeName == '5') &&
            redeployData.status == '0'
          "
        >
          <van-row>
            <van-col :span="8">
              <van-button
                block
                style="border-radius: 999px 0 0 999px"
                type="info"
                native-type="submit"
                @click="acceptOrReject(1)"
                >接 受</van-button
              >
            </van-col>
            <van-col :span="8">
              <van-button
                block
                type="info"
                native-type="submit"
                @click="innerVisible = true"
                >转 派</van-button
              >
            </van-col>
            <van-col :span="8">
              <van-button
                block
                style="border-radius: 0 999px 999px 0"
                type="info"
                native-type="submit"
                @click="decomposeVisible = true"
                >分 解</van-button
              >
            </van-col>
          </van-row>
        </template>
        <van-button
          v-if="
            (activeName == '2' || activeName == '5') &&
            redeployData.status == '1'
          "
          round
          block
          type="info"
          native-type="submit"
          @click="feedbackVisible = true"
          >反 馈</van-button
        >
        <van-button
          v-if="
            (activeName == '1' || activeName == '3' || activeName == '4') &&
            redeployData.status != '3' &&
            redeployData.status != '6'
          "
          @click="urge()"
          round
          block
          type="info"
          native-type="submit"
          >催 办</van-button
        >
        <van-button
          v-if="activeName == '1' && redeployData.status == '3'"
          @click="finish()"
          round
          block
          type="info"
          native-type="submit"
          >办 结</van-button
        >
      </div>
      <under-taker
        ref="UnderTaker"
        v-show="showUnderTaker"
        :departmentTreeData="departmentTreeData"
        :userList="userList"
        @close="showUnderTaker = false"
        @submit="handleUnderTaker"
      ></under-taker>
      <feedback
        ref="Feedback"
        :activeName="activeName"
        :redeployData="redeployData"
        v-show="feedbackVisible"
        @close="(feedbackVisible = false), getListByActiveName()"
      ></feedback>
      <decompose
        ref="Decompose"
        :activeName="activeName"
        :redeployData="redeployData"
        v-show="decomposeVisible"
        @close="(decomposeVisible = false), getDecomposeTaskList()"
      ></decompose>
      <!-- 转派 -->
      <van-popup v-model="innerVisible" position="bottom">
        <van-picker
          show-toolbar
          title="承办人"
          :columns="filterUserList"
          @confirm="redeploy"
          @cancel="innerVisible = false"
        >
          <template slot="columns-top">
            <van-field placeholder="输入用户名或账号搜索" class="search" right-icon="search" v-model="keyword" @input="filterUser"></van-field>
          </template>
        </van-picker>
      </van-popup>
    </div>
  </transition>
</template>
<script>
import request from "@/utils/request";
import UnderTaker from "./Undertaker.vue";
import Feedback from "./Feedback";
import Decompose from "./Decompose";
import { getDepartmentMember } from "@/api/permission/userOrganize";
import { getDepartmentList,getDepartmentListApp } from "@/api/permission/department";
import { UserListAll } from "@/api/permission/user";

export default {
  components: { UnderTaker, Feedback, Decompose },
  props: ["title", "activeName"],
  data() {
    return {
      collapse1: 0,
      collapse2: 0,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      currentDate1: new Date(),
      showPicker: false,
      showdayPicker: false,
      showweekPicker: false,
      showmonthPicker: false,
      showUnderTaker: false,
      //协办人下拉数据
      assistantOptions: [],
      //主办人下拉数据
      sponsorOptions: [],
      remindtargetarr: [],
      remindmodearr: [],
      userList: [],
      filterUserList: [],
      keyword: '',
      week: [
        {
          id: "1",
          text: "周一",
        },
        {
          id: "2",
          text: "周二",
        },
        {
          id: "3",
          text: "周三",
        },
        {
          id: "4",
          text: "周四",
        },
        {
          id: "5",
          text: "周五",
        },
        {
          id: "6",
          text: "周六",
        },
        {
          id: "7",
          text: "周日",
        },
      ],
      //分解任务列表list
      DecomposeTaskList: [],
      decomposeVisible: false,
      //分解提交数据
      decomposeLists: { decomposeList: [] },
      //反馈页面是否查看
      isFeedback: false,
      operatingData: [],
      feedbackFormData: {
        feedbackContent: undefined,
        feedbackAccessory: undefined,
      },
      feedbackVisible: false,
      departmentTreeData: [],
      redeployData: {},
      innerVisible: false,
      loading: false,
      visible: false,
      isDetail: false,
      dataForm: {
        srctype: undefined,
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
      rules: {
        srctype: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          }
        ],
        name: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        remark: [
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
      isremindOptions: [
        { fullName: "是", id: 1 },
        { fullName: "否", id: 0 },
      ],
      accessoryList: [],
      accessory: [],
      feedbackAccessoryList: [],
      feedbackAccessory: [],
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
    this.$store.dispatch("user/getInfo").then(() => {
      this.dataForm.drafter = this.$store.getters.userInfo.userName;
    });
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
      this.filterUserList = res.data.list
    });
  },
  mounted() {},
  methods: {
    goBack() {
      this.$refs["elForm"].resetValidation();
      this.$emit("close");
    },
    timeConfirm(time) {
      this.dataForm.endtime = time.getTime();
      this.showPicker = false;
    },
    dayConfirm(time) {
      this.dataForm.remindtime = time;
      this.showdayPicker = false;
    },
    weekConfirm(time) {
      this.dataForm.remindtime = time.text;
      this.showweekPicker = false;
    },
    monthConfirm(time) {
      this.dataForm.remindtime = time;
      this.showmonthPicker = false;
    },
    addOrUpdateHandle(item, index) {
      this.underTakerAction = item ? "U" : "A";
      this.underTakerIndex = index;
      this.showUnderTaker = true;
      this.$refs.UnderTaker.init(item);
    },
    //部门人员联动
    getDeptMember(type, objectId) {
      this.sponsorOptions = [];
      this.assistantOptions = [];
      getDepartmentMember(objectId).then((res) => {
        if (type == 0) {
          this.sponsorOptions = res.data.list;
        } else if (type == 1) {
          this.assistantOptions = res.data.list;
        }
      });
    },
    must(obj) {
      if (
        obj.columnIndex == 1 ||
        obj.columnIndex == 2 ||
        obj.columnIndex == 3 ||
        obj.columnIndex == 4
      ) {
        return "must";
      }
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
    //查询反馈详情
    feedbackDetails(redeployid) {
      this.feedbackVisible = true;
      this.$nextTick(() => {
        this.$refs.Feedback.init(redeployid);
      });
    },
    //查询操作记录
    getListByActiveName() {
      request({
        url: `/api/customer/api/system/Crm_supervise_task_operating_record/getListByActiveName`,
        method: "post",
        data: {
          activeName: this.activeName,
          taskId: this.redeployData.id,
          redeployId: this.redeployData.redeployId,
          taskItemId: this.redeployData.taskItemId,
        },
      }).then((res) => {
        this.operatingData = res.data;
      });
    },
    //完结
    finish() {
      request({
        url: `/api/customer/api/system/Crm_supervision_task/finish`,
        method: "post",
        data: {
          activeName: this.activeName,
          taskId: this.redeployData.id,
          redeployId: this.redeployData.redeployId,
          taskItemId: this.redeployData.taskItemId,
        },
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {
            (this.visible = false), this.$emit("refresh", true);
          },
        });
      });
    },
    //催办
    urge() {
      request({
        url: `/api/customer/api/system/Crm_supervision_task/urge`,
        method: "post",
        data: {
          activeName: this.activeName,
          taskId: this.redeployData.id,
          redeployId: this.redeployData.redeployId,
          taskItemId: this.redeployData.taskItemId,
        },
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {},
        });
      });
    },
    //提交反馈
    feedback() {
      this.$set(
        this.feedbackFormData,
        "feedbackAccessory",
        this.feedbackAccessoryList.length
          ? JSON.stringify(this.feedbackAccessoryList)
          : ""
      );
      this.$refs["feedbackForm"].validate((valid) => {
        if (valid) {
          request({
            url: `/api/customer/api/system/Crm_redeploy_record/feedback`,
            method: "post",
            data: {
              feedbackContent: this.feedbackFormData.feedbackContent,
              feedbackAccessory: this.feedbackFormData.feedbackAccessory,
              activeName: this.activeName, //2主办，5协办
              redeployId: this.redeployData.redeployId,
              taskItemId: this.redeployData.taskItemId,
              taskId: this.redeployData.id,
            },
          }).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 1000,
              onClose: () => {
                (this.feedbackVisible = false),
                  (this.visible = false),
                  this.$emit("refresh", true);
              },
            });
          });
        }
      });
    },
    //关闭Dialog时调用
    closeDialog() {
      // this.isDetail = true;
      this.isFeedback = false;
    },
    //接受或拒绝
    acceptOrReject(status) {
      request({
        url: `/api/customer/api/system/Crm_redeploy_record/acceptOrReject`,
        method: "post",
        data: {
          taskId: this.redeployData.id,
          activeName: this.activeName, //2主办，5协办
          status: status,
          redeployId: this.redeployData.redeployId,
          taskItemId: this.redeployData.taskItemId,
        },
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {
            (this.visible = false), this.$emit("refresh", true);
          },
        });
      });
    },
    //转派
    redeploy(item) {
      this.dataForm.transfer = item.id;
      request({
        url: `/api/customer/api/system/Crm_supervision_task/redeploy`,
        method: "post",
        data: {
          activeName: this.activeName, //2主办，5协办
          transfer: this.dataForm.transfer,
          redeployId: this.redeployData.redeployId,
          taskItemId: this.redeployData.taskItemId,
          taskId: this.redeployData.id,
        },
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {
            (this.innerVisible = false),
              (this.visible = false),
              this.$emit("refresh", true);
          },
        });
      });
    },
    init(data, isDetail, activeName) {
      this.redeployData = data;
      this.activeName = activeName;
      this.dataForm.id = data.id || 0;
      this.visible = true;
      this.isDetail = isDetail || false;
      this.$nextTick(() => {
        //新建时，初始化数据
        if (!isDetail) {
          this.dataForm = {
            remindtime: undefined,
            isremind: 0,
            drafter: this.$store.getters.userInfo.userName,
            crm_supervision_task_itemEntityList: [],
          };
          this.accessoryList = [];
        }
        // this.$refs["elForm"].resetFields();
        if (this.dataForm.id) {
          this.loading = true;
          request({
            url:
              "/api/customer/api/system/Crm_supervision_task/" +
              this.dataForm.id +
              "/" +
              this.activeName +
              "/" +
              this.redeployData.redeployId,
            method: "get",
          }).then((res) => {
            this.dataForm = res.data;
            this.accessoryList = this.dataForm.accessory
              ? JSON.parse(this.dataForm.accessory)
              : [];
            this.remindmodearr = this.dataForm.remindmode
              ? this.dataForm.remindmode.split(",")
              : [];
            this.remindtargetarr = this.dataForm.remindtarget
              ? this.dataForm.remindtarget.split(",")
              : [];
            this.dataForm.crm_supervision_task_itemEntityList = this.dataForm
              .crm_supervision_task_itemEntityList
              ? this.dataForm.crm_supervision_task_itemEntityList
              : [];
            this.loading = false;
          });
        }
      });
      this.getListByActiveName();
      //获取分解任务数据
      this.getDecomposeTaskList();
    },
    // 表单提交
    dataFormSubmit() {
      this.$set(
        this.dataForm,
        "accessory",
        this.accessoryList.length ? JSON.stringify(this.accessoryList) : ""
      );

      this.$set(
        this.dataForm,
        "remindmode",
        this.remindmodearr.length ? this.remindmodearr.toString() : ""
      );

      this.$set(
        this.dataForm,
        "remindtarget",
        this.remindtargetarr.length ? this.remindtargetarr.toString() : ""
      );
      this.$refs["elForm"]
        .validate()
        .then(() => {
          //承办人校验
          if (this.dataForm.crm_supervision_task_itemEntityList.length < 1) {
            this.$message({
              message: "请添加承办人",
              type: "warning",
            });
            return;
          }
          if (!this.dataForm.id) {
            request({
              url: `/api/customer/api/system/Crm_supervision_task`,
              method: "post",
              data: this.dataForm,
            }).then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1000,
                onClose: () => {
                  (this.visible = false), this.$emit("refresh", true);
                },
              });
            });
          } else {
            request({
              url:
                "/api/customer/api/system/Crm_supervision_task/" +
                this.dataForm.id,
              method: "PUT",
              data: this.dataForm,
            }).then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refresh", true);
                },
              });
            });
          }
        })
        .catch(() => {});
    },
    handleUnderTaker(item) {
      if (this.underTakerAction === "U") {
        this.dataForm.crm_supervision_task_itemEntityList.splice(
          this.underTakerIndex,
          1,
          item
        );
      } else {
        this.dataForm.crm_supervision_task_itemEntityList.push(item);
      }
    },
    addHandlecrm_supervision_task_itemEntityList() {
      let item = {
        content: undefined,
        starttime: undefined,
        endtime: undefined,
        hostdept: undefined,
        sponsor: undefined,
        assistingdept: undefined,
        assistant: undefined,
      };
      this.dataForm.crm_supervision_task_itemEntityList.push(item);
    },
    addDecomposeList() {
      let item = {
        content: undefined,
        starttime: undefined,
        endtime: undefined,
        hostdept: undefined,
        sponsor: undefined,
        assistingdept: undefined,
        assistant: undefined,
      };
      this.decomposeDataForm.decomposeList.push(item);
    },
    handleDelcrm_supervision_task_itemEntityList(index) {
      this.dataForm.crm_supervision_task_itemEntityList.splice(index, 1);
    },
    delDecomposeList(index) {
      this.decomposeDataForm.decomposeList.splice(index, 1);
    },
    filterUser(query) {
      if(query) {
        let list = this.userList
        this.filterUserList = list.filter(item => {
          return item.realName.indexOf(query) > -1 || item.account.indexOf(query) > -1
        })
      } else {
        this.filterUserList = this.userList
      }
    }
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
.accessory {
  >>> .van-field__label {
    line-height: 32px;
  }
}
.card {
  margin: 10px;
  .button {
    padding: 0 10px 10px;
  }
}
.search {
  margin: 5px 20px;
  background: #fafafa;
  width: auto;
}
</style>