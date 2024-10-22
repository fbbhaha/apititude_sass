<template>
  <div class="ActionHistory">
    <div class="leftContent">
      <div class="searchBox">
        <el-input
          v-model="searchParams.personName"
          placeholder="请输入姓名"
          prefix-icon="el-icon-search"
        />
      </div>
      <div class="personList">
        <div
          :class="{ personItem: true, selected: selectedPersonIndex == index }"
          v-for="(item, index) in personList"
          :key="item.id"
          @click="selectedPersonIndex = index"
        >
          <el-avatar
            shape="square"
            :src="item.avatar"
            :size="50"
            style="grid-row: 1 / 3; "
          ></el-avatar>
          <div class="name">{{ item.name }}</div>
          <div class="position">{{ item.position }}</div>
        </div>
      </div>
    </div>
    <div class="rightContent">
      <div class="searchBox">
        <div class="left">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="showDialog = true"
            >新增行动记录</el-button
          >
        </div>
        <div class="right">
          <el-input
            v-model="searchParams.companyName"
            placeholder="请输入行动信息"
            prefix-icon="el-icon-search"
            style="margin-right: 20px;"
          >
          </el-input>
          <el-button plain>重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </div>
      <div class="content">
        <div class="filterBox">
          <div
            :class="{
              filterItem: true,
              selected: searchParams.recordType == index
            }"
            v-for="(item, index) in filterButtons"
            :key="item.name"
            @click="searchParams.recordType = index"
          >
            <img :src="item.icon" alt="" />
            {{ item.name }}
          </div>
        </div>
        <div class="cardList">
          <div class="cardItem" v-for="item in recordList" :key="item">
            <div class="top">
              <div class="left">
                <el-avatar
                  shape="square"
                  :src="item.avatar"
                  :size="50"
                ></el-avatar>
                <span>{{ item.position }}</span>
              </div>
              <div class="right">
                <div class="name">{{ item.name }}</div>
                <div class="dateType">
                  {{
                    item.datetime +
                      "&nbsp;&nbsp;&nbsp;" +
                      dictionary.xdlx[item.recordType].name
                  }}
                </div>
                <div class="msg">{{ item.content }}</div>
              </div>
            </div>
            <div class="bottom">
              <i class="el-icon-edit" @click="editBaseMessage(item)"></i>
              <i class="el-icon-delete"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showDialog" :modal="false" width="500px">
      <el-form :model="form">
        <el-form-item label="行动类型">
          <el-select
            v-model="dialogData.recordType"
            placeholder="请选择行动类型"
          >
            <el-option
              :label="item.name"
              :value="item.value"
              v-for="item in dictionary.xdlx"
              :key="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行动时间">
          <el-date-picker
            v-model="dialogData.datetime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="详细信息">
          <el-input
            v-model="dialogData.content"
            autocomplete="off"
            style="width:300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ActionHistory",
  data() {
    return {
      searchParams: {
        companyName: "",
        companyType: null,
        currentPage: 1,
        pageSize: 10,
        personName: "",
        recordType: 0
      },
      recordList: [
        {
          name: "张三",
          position: "CEO",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          datetime: "2024-09-10 12:30:00",
          recordType: "1",
          content: "回访客户，询问产品使用后的效果"
        },
        {
          name: "张三",
          position: "CEO",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          datetime: "2024-09-10 12:30:00",
          recordType: "1",
          content: "回访客户，询问产品使用后的效果"
        },
        {
          name: "张三",
          position: "CEO",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          datetime: "2024-09-10 12:30:00",
          recordType: "1",
          content: "回访客户，询问产品使用后的效果"
        },
        {
          name: "张三",
          position: "CEO",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          datetime: "2024-09-10 12:30:00",
          recordType: "1",
          content: "回访客户，询问产品使用后的效果"
        }
      ],
      personList: [
        {
          name: "张三",
          id: 1,
          position: "CEO",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          name: "李四",
          id: 2,
          position: "CFO",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          name: "测试1",
          id: 3,
          position: "职员",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          name: "测试2",
          id: 4,
          position: "职员",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          name: "张三",
          id: 1,
          position: "CEO",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        {
          name: "李四",
          id: 2,
          position: "CFO",
          avatar:
            "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        }
      ],
      selectedPersonIndex: 0,

      dictionary: {
        xdlx: [
          {
            name: "销售工作",
            icon: require("@/assets/images/customer/xsgz.png"),
            value: "0"
          },
          {
            name: "账号试用",
            icon: require("@/assets/images/customer/zhsy.png"),
            value: "1"
          },
          {
            name: "系统安装",
            icon: require("@/assets/images/customer/xtaz.png"),
            value: "2"
          },
          {
            name: "演示系统",
            icon: require("@/assets/images/customer/ysxt.png"),
            value: "3"
          },
          {
            name: "老客户关系维护",
            icon: require("@/assets/images/customer/gxwh.png"),
            value: "4"
          },
          {
            name: "提需求",
            icon: require("@/assets/images/customer/xq.png"),
            value: "5"
          },
          {
            name: "系统培训",
            icon: require("@/assets/images/customer/xtpx.png"),
            value: "6"
          },
          {
            name: "售后客户服务",
            icon: require("@/assets/images/customer/shkhfw.png"),
            value: "7"
          }
        ]
      },
      filterButtons: [],
      showDialog: false,
      dialogData: {
        recordType: "0",
        datetime: "",
        content: ""
      }
    };
  },
  mounted() {
    this.filterButtons = [
      {
        name: "不做筛选",
        icon: require("@/assets/images/customer/bsx.png"),
        value: ""
      },
      ...this.dictionary.xdlx
    ];
  },
  methods: {
    editBaseMessage(data) {
      this.showDialog = true;
      this.dialogData = data;
    }
  }
};
</script>

<style scpoed lang="scss">
.ActionHistory {
  height: 100%;
  display: flex;
  gap: 20px;
  .leftContent {
    width: 244px;
    height: 100%;
    background: #f5f7fc;
    border: 1px solid #e5e6e8;
    padding: 20px 12px;
    .searchBox {
      height: 40px;
    }
    .personList {
      height: calc(100% - 40px);
      overflow: auto;
      .personItem {
        padding: 16px 0;
        border-bottom: 1px solid #eaeef3;
        display: grid;
        grid-template-columns: 50px auto;
        align-items: center;
        gap: 0 10px;
        cursor: pointer;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #242425;
        }
        .position {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #242425;
        }
      }
      .selected {
        background-color: #c9d3ed;
        padding: 16px 10px;
        border-radius: 10px;
        transition: all 0.5s;
      }
    }
  }
  .rightContent {
    height: 100%;
    flex-grow: 1;
    .searchBox {
      margin: 0 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right {
        display: flex;
        align-items: center;
      }
    }
    .content {
      height: calc(100% - 47px);
      overflow: auto;
      padding: 0 0;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      .filterBox {
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
          display: flex;
          align-items: center;
          gap: 3px;
          cursor: pointer;
          &.selected {
            background: #c9d3ed;
            border-radius: 4px;
            font-weight: 800;
          }
        }
      }

      .cardList {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        padding: 0 20px;
        gap: 20px;
        .cardItem {
          height: 153px;
          background: #f5f7fc;
          box-shadow: 0 2px 4px 0 #0000000d, 0 1px 2px 0 #190f0f12,
            0 0 1px 0 #00000014;
          border-radius: 6px;
          display: flex;
          flex-direction: column;

          .top {
            display: flex;
            gap: 16px;
            flex-grow: 1;
            padding: 20px;
            .left {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
              span {
                font-weight: 400;
                font-size: 14px;
                color: #242425;
              }
            }
            .right {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .name {
                font-weight: 500;
                font-size: 18px;
                color: #1677ff;
              }
              .dateType {
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 14px;
                color: #54585a;
              }
              .msg {
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 14px;
                color: #242425;
              }
            }
          }
          .bottom {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 10px 20px;
            gap: 20px;
            border-top: 1px solid #54585a33;
            i {
              cursor: pointer;
              &:hover {
                color: #1677ff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
