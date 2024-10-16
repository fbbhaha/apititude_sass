<template>
  <transition name="el-zoom-in-center">
    <div class="container">
      <div class="header">
        <van-icon class="back" name="arrow-left" @click="goBack" />
        <span class="title">反馈</span>
      </div>
      <van-form ref="elForm" class="form" @submit="feedback">
        <van-field
          v-model="feedbackFormData.feedbackContent"
          rows="4"
          autosize
          :readonly="isFeedback"
          label="反馈内容"
          type="textarea"
          maxlength="150"
          placeholder="请输入反馈内容"
          show-word-limit
          :rules="rules.feedbackContent"
        />
        <van-field class="accessory" readonly clickable label="附件">
          <template #input>
            <CCIT-UploadFz
              v-model="feedbackAccessoryList"
              :fileSize="2"
              sizeUnit="MB"
              :limit="9"
              buttonText="点击上传"
              :disabled="isFeedback"
            >
            </CCIT-UploadFz>
          </template>
        </van-field>
        <div style="margin: 16px" v-if="!isFeedback">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </transition>
</template>
<script>
import request from "@/utils/request";
export default {
  components: {},
  props: ["activeName", "redeployData"],
  data() {
    return {
      //反馈页面是否查看
      isFeedback: false,
      feedbackFormData: {
        feedbackContent: undefined,
        feedbackAccessory: undefined,
      },
      feedbackVisible: false,
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
      feedbackAccessoryList: [],
      feedbackAccessory: [],
    };
  },
  watch: {},
  mounted() {},
  methods: {
    goBack() {
      this.$emit("close");
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
      this.$refs["elForm"]
        .validate()
        .then(() => {
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
                this.$emit("close");
              },
            });
          });
        })
        .catch(() => {});
    },
    init(id) {
      (this.feedbackFormData = {
        feedbackContent: "",
        feedbackAccessory: "",
      }),
        request({
          url: `/api/customer/api/system/Crm_redeploy_record/` + id,
          method: "get",
        }).then((res) => {
          this.feedbackFormData = res.data;
          this.feedbackAccessoryList = this.feedbackFormData.feedbackAccessory
            ? JSON.parse(this.feedbackFormData.feedbackAccessory)
            : [];
          this.isFeedback = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  z-index: 101;
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
.accessory {
  >>> .van-field__label {
    line-height: 32px;
  }
}
</style>