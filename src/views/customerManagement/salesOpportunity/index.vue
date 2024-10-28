<template>
  <div class="SalesOpportunity">
    <div class="topButtons">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="innerDrawer = true"
        >新增销售机会</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%" height="calc(100% - 70px)">
      <el-table-column type="index" width="55" label="序号"> </el-table-column>
      <el-table-column prop="name" label="销售机会名称"> </el-table-column>
      <el-table-column prop="code" label="客户名称"> </el-table-column>
      <el-table-column prop="customerName" label="机会类型"> </el-table-column>
      <el-table-column prop="customerName" label="客户预算"> </el-table-column>
      <el-table-column prop="contactTel" label="预计成交时间">
      </el-table-column>
      <el-table-column prop="address" label="负责人"> </el-table-column>
      <el-table-column prop="address" label="协助人员"> </el-table-column>
      <el-table-column prop="address" label="创建人员"> </el-table-column>
      <el-table-column prop="address" label="创建时间"> </el-table-column>
      <el-table-column prop="address" label="负责人"> </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <div class="operationButtons">
            <i class="el-icon-edit" @click="editBaseMessage(scope.row)">
              编辑</i
            >
            <i class="el-icon-delete">删除</i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      title="销售机会"
      :append-to-body="true"
      :visible.sync="innerDrawer"
      size="calc(100% - 240px)"
      class="detail"
    >
      <div class="opportunityDetail">
        <div class="timeline-container">
          <div class="timeline">
            <div
              :class="{ 'timeline-step': true, active: index <= currentStep }"
              v-for="(step, index) in steps"
              :key="index"
            >
              <div class="timeline-arrow">
                {{ step.label }}
              </div>
              <div class="timeline-detail">
                <div class="timeline-circle">
                  <div class="icon-circle"></div>
                </div>
                <div class="line"></div>
                <div
                  :class="{
                    'timeline-date': true,
                    last: index === currentStep + 1
                  }"
                >
                  <i class="el-icon-location"></i>
                  <div v-if="index === currentStep + 1" class="current-step">
                    当前在此阶段
                  </div>
                  <span v-else>{{ step.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-form class="formBox">
          <CommonInput label="所属客户" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="机会名称" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="业务人员" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="机会联系人" :prop="'name'">
            <el-input />
          </CommonInput>

          <CommonInput label="报价金额" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="预计成交时间" :prop="'name'">
            <el-input />
          </CommonInput>

          <CommonInput label="机会分析" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="销售机会分析" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="详情描述" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="共享给谁" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="创建人员" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="创建时间" :prop="'name'">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </CommonInput>
          <CommonInput label="修改人员" :prop="'name'">
            <el-input />
          </CommonInput>
          <CommonInput label="修改时间" :prop="'name'">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </CommonInput>
        </el-form>
        <div class="bottomButton">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommonInput from "@/components/Common/Input/index.vue";

export default {
  name: "SalesOpportunity",
  props: {
    companyId: [Number, String]
  },
  data() {
    return {
      innerDrawer: false,
      companyMessage: {
        name: "无锡市晒福智能电子科技有限公司",
        status: "签约",
        fields: "网络设备设计与制造技术",
        updateTime: "2024-05-02"
      },
      tableData: [],
      dialogData: {},
      currentStep: 1,
      steps: [
        { label: "S1需求方案", date: "2024-03-31" },
        { label: "S2报价阶段", date: "2024-03-31" },
        { label: "S3签合同", date: "" }
      ]
    };
  },
  components: { CommonInput },
  methods: {
    editBaseMessage(data) {
      this.innerDrawer = true;
      this.dialogData = data;
    }
  }
};
</script>
<style lang="scss">
.SalesOpportunity {
  .topButtons {
    margin-bottom: 10px;
  }
}
.detail {
  .el-drawer {
    background: #f5f7fc;
    .el-drawer__header {
      padding-bottom: 20px;
      margin: 10px 0 0;
    }
  }
  .opportunityDetail {
    background: #ffffff;
    border: 1px solid #eef0f4;
    padding: 35px 30px;
    margin: 15px 20px;
  }
}
</style>

<style scoped lang="scss">
.timeline-container {
  width: 100%;
  margin: 20px 0 120px;
  .timeline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    // gap: 10px;

    .timeline-step {
      flex: 1;
      display: flex;
      align-items: center;
      position: relative;

      .timeline-arrow {
        width: 100%;
        position: relative;
        padding: 10px 30px;
        background-color: #e0e0e0;
        color: white;
        margin: 0 10px;
        white-space: nowrap;
        text-align: center;
        &::after {
          content: "";
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 20px solid #e0e0e0;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
        }
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 20px solid #fff;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
        }
      }
      .timeline-detail {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -31px;
        display: flex;
        align-items: center;
        .timeline-circle {
          width: 24px;
          height: 24px;
          background-color: #ccc;
          border-radius: 50%;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          justify-content: center;

          .icon-circle {
            width: 24px;
            height: 24px;
            background-color: #ccc;
            border-radius: 50%;
          }
        }
        .line {
          width: 100%;
          height: 2px;
          border: 2px solid #e0e6ee;
        }
        .timeline-date {
          font-weight: 400;
          font-size: 16px;
          color: #86868a;
          position: absolute;
          bottom: -60px;
          left: -22px;
          border: 2px solid #e0e6ee;
          border-radius: 10px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 5px;
          i {
            color: #2850e6;
            font-size: 18px;
          }
          &::before {
            content: "";
            width: 0;
            height: 0;
            border: 12px solid;
            position: absolute;
            top: -26px;
            left: 20px;
            border-color: transparent transparent #e0e6ee;
          }
          &::after {
            content: "";
            width: 0;
            height: 0;
            border: 12px solid;
            position: absolute;
            top: -24px;
            left: 20px;
            border-color: transparent transparent #fff;
          }
          &.last {
            background: #f5f7fc !important;
            &::after {
              border-color: transparent transparent #f5f7fc;
            }
          }
        }
      }

      &.active {
        .timeline-arrow {
          background-color: #4caf50; /* Active (green) */
          &::after {
            border-left-color: #4caf50; /* Active arrow tip */
          }
          &::before {
            border-left-color: #fff; /* Active arrow tip */
          }
        }
        .timeline-detail {
          .timeline-circle {
            border: 1px solid #4caf50;
            background-color: #fff;
            .icon-circle {
              width: 16px;
              height: 16px;
              background-color: #4caf50;
            }
          }
          .line {
            border-color: #4caf50;
          }
        }
      }
    }
  }
}
.formBox {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 40px;
}
.bottomButton {
  margin: 20px 0;
}
</style>
