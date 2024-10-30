<template>
  <div class="policyManagement">
    <div class="leftContent">
      <div class="leftButton" @click="showBaseMessage(1)">
        <i class="el-icon-setting"></i>
        管理产品类型
      </div>
      <el-tree
        class="treeBox"
        :data="treeData"
        :props="{
          children: 'children',
          label: 'label'
        }"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <!-- <div class="custom-tree-node" slot-scope="{ node, data }">
          {{ node.label }}
        </div> -->
      </el-tree>
    </div>
    <div class="rightContent">
      <div class="searchBox">
        <div class="left">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="showBaseMessage(2)"
            >新增客户</el-button
          >
        </div>
        <div class="right">
          <el-input
            v-model="searchParams.companyName"
            placeholder="请输入客户信息"
            prefix-icon="el-icon-search"
            style="margin-right: 20px;"
          >
          </el-input>
          <el-button plain>重置</el-button>
          <el-button type="primary">搜索</el-button>
          <TableColumnControl :columns="tableColumn" />
        </div>
      </div>
      <div class="content">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="calc(100% - 70px)"
        >
          <el-table-column
            v-for="item in tableColumn"
            :key="item.field"
            :prop="item.field"
            :label="item.name"
          >
          </el-table-column>
          <el-table-column label="操作" align="center" width="140">
            <template slot-scope="scope">
              <div class="operationButtons">
                <i class="el-icon-edit" @click="showBaseMessage(scope.row)"></i>
                <i class="el-icon-delete"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-drawer
      :class="drawerType === 1 ? 'policyType' : 'policyEdit'"
      :visible.sync="showDrawer"
      direction="rtl"
      :title="
        drawerType === 1
          ? '产品类型'
          : drawerType === 2
          ? '新增政策'
          : '编辑政策'
      "
      size="calc(100% - 240px)"
      :show-close="false"
      append-to-body
      destroy-on-close
    >
      <edit-policy v-if="drawerType !== 1" />
      <policy-type v-else />
    </el-drawer>
  </div>
</template>

<script>
import TableColumnControl from "@/components/Common/TableColumnControl/index.vue";
import EditPolicy from "./EditPolicy.vue";
import PolicyType from "./PolicyType.vue";

export default {
  name: "policyManagement",
  data() {
    return {
      searchParams: {
        companyName: "",
        companyType: null,
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        { name: "客户名称", field: "companyName" },
        { name: "客户类型", field: "code" },
        { name: "业务员", field: "customerName1" },
        { name: "联系人", field: "customerName2" },
        { name: "手机号", field: "contactTel" },
        { name: "城市", field: "address" },
        { name: "最后行动时间", field: "datetime" }
      ],
      tableData: [],
      showDrawer: false,
      drawerType: 1, // 1 产品类型 2 新增产品 3 编辑产品
      baseMessage: null,
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            },
            {
              label: "一级 2",
              children: [
                {
                  label: "二级 2-1",
                  children: [
                    {
                      label: "三级 2-1-1"
                    }
                  ]
                },
                {
                  label: "二级 2-2",
                  children: [
                    {
                      label: "三级 2-2-1"
                    }
                  ]
                }
              ]
            },
            {
              label: "一级 3",
              children: [
                {
                  label: "二级 3-1",
                  children: [
                    {
                      label: "三级 3-1-1"
                    }
                  ]
                },
                {
                  label: "二级 3-2",
                  children: [
                    {
                      label: "三级 3-2-1"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  components: { TableColumnControl, EditPolicy, PolicyType },
  methods: {
    showBaseMessage(type, data) {
      this.drawerType = type;
      this.baseMessage = data;
      this.showDrawer = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.policyManagement {
  height: 100%;
  display: flex;
  padding-left: 10px;
  .leftContent {
    width: 200px;
    height: 100%;
    background: #fff;
    box-shadow: 0 2px 4px 0 #0000000d, 0 1px 2px 0 #190f0f12,
      0 0 1px 0 #00000014;
    border-radius: 6px;
    padding: 20px 12px;
    flex-shrink: 0;
    .leftButton {
      height: 40px;
      background: #1890ff;
      box-shadow: 0 2px 8px -2px #001b6614, 0 1px 4px -1px #002a8c14,
        0 0 1px 0 #001b6614;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
      i {
        font-size: 20px;
      }
    }
    .treeBox {
      height: calc(100% - 40px);
      overflow: auto;
      padding-top: 20px;
    }
    >>> .el-tree {
      .is-current {
        & > .el-tree-node__content {
          background: #ecf1fe;
          box-shadow: 0 2px 8px -2px #001b6614, 0 1px 4px -1px #002a8c14,
            0 0 1px 0 #001b6614;
          .el-tree-node__label {
            color: #1890ff;
          }
        }
      }
      .el-tree-node__content {
        height: 37px;
        border-radius: 8px;
      }
    }
  }
  .rightContent {
    height: 100%;
    flex-grow: 1;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 #0000000d, 0 1px 2px 0 #190f0f12,
      0 0 1px 0 #00000014;
    border-radius: 6px;
    margin: 0 0 0 10px;
    .searchBox {
      height: 84px;
      padding: 0 20px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      .right {
        display: flex;
        align-items: center;
      }
    }
    .content {
      height: calc(100% - 98px);
      padding: 10px 24px 16px;

      .filterBox {
        // padding: 16px 24px;
        padding: 0 20px;
        height: 56px;
        background: #f5f7fc;
        border: 1px solid #e7ebf1;
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 14px;
        .filterItem {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #242425;
          letter-spacing: 0.22px;
          padding: 10px 15px;
          &.selected {
            background: #c9d3ed;
            border-radius: 4px;
            font-weight: 800;
          }
        }
      }
      .operationButtons {
        display: flex;
        gap: 18px;
        justify-content: center;
        i {
          cursor: pointer;
          font-size: 16px;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
}

.policyType {
  >>> .el-drawer {
    background: #f5f7fc;
    padding: 50px 30px 40px 20px;
    .el-drawer__header {
      margin-bottom: 10px;
      padding: unset;
      font-size: 16px;
      color: #242425;
    }
  }
}
.policyEdit {
  >>> .el-drawer {
    .el-drawer__header {
      margin-bottom: 0;
      padding-top: unset;
      background: #f5f7fc;
      height: 57px;
      font-weight: 500;
      font-size: 16px;
      color: #000000d9;
    }
  }
}
</style>
