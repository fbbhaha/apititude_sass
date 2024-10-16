<template>
  <div class="content">
    <div class="title-main">
      <div class="title-left">企研税通——企业研发项目(费用)管理服务平台</div>
      <div class="title-right">
        <el-button @click="$router.push('/loginindex')"> 企业端登录 </el-button>
        <el-button @click="$router.push('/loginindex')"> 管理端登录 </el-button>
        <el-button> 用户手册 </el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="content-main-title">
        <div class="content-main-title-top">加计扣除政策</div>
        <ul class="content-main-title-ul">
          <li v-for="(item, index) in ullist" @click="targetclike(item.url)" :key="index">
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="content-main-img"></div>
    </div>

    <footer class="footer">
      <div class="footer-left">
        <div class="footer-left-img"></div>
        <div class="footer-left-text">操作流程</div>
      </div>
      <div class="footer-right">
        <div class="footer-right-div">
          <div class="footer-right-img">
            <div class="lvdian"></div>
            <img src="../../assets/loginimg/组 7.png" alt="" />
          </div>
          <div class="footer-right-img">
            <div class="huidian"></div>
            <img src="../../assets/loginimg/组 8.png" alt="" />
          </div>
          <div class="footer-right-img">
            <div class="huidian"></div>

            <img src="../../assets/loginimg/组 9.png" alt="" />
          </div>
          <div class="footer-right-img">
            <div class="huidian"></div>

            <img src="../../assets/loginimg/组 10.png" alt="" />
          </div>
          <div class="footer-right-img">
            <div class="huidian"></div>

            <img src="../../assets/loginimg/组 11.png" alt="" />
          </div>
          <div class="footer-right-img">
            <div class="huidian"></div>
            <img src="../../assets/loginimg/组 12.png" alt="" />
          </div>
        </div>
        <div class="footer-right-text">
          <div class="footer-right-text-div">
            <div class="footer-right-text-title">1、企业信息管理</div>

            <div class="footer-right-text-s">
              系统自动提取企业基本信息和归口科技、税务主管部门
            </div>
          </div>
          <div class="footer-right-text-div">
            <div class="footer-right-text-title">2、项目信息采集</div>

            <div class="footer-right-text-s">
              系统自动采集企业立项的省级科技计划项目、手工添加企业其他自研项目
            </div>
          </div>
          <div class="footer-right-text-div">
            <div class="footer-right-text-title">3、项目按年度管理</div>

            <div class="footer-right-text-s">
              设置项目年度信息、按年度归集研发支出
            </div>
          </div>
          <div class="footer-right-text-div">
            <div class="footer-right-text-title">4、明细账科目匹配</div>

            <div class="footer-right-text-s">
              设置企业财务明细账科目和加计扣除优惠科目之间的对应关系
            </div>
          </div>
          <div class="footer-right-text-div">
            <div class="footer-right-text-title">5、项目明细账管理</div>

            <div class="footer-right-text-s">
              将财务明细账导出到模板后，导入到系统中
            </div>
          </div>
          <div class="footer-right-text-div">
            <div class="footer-right-text-title">6、研发辅助账汇总</div>

            <div class="footer-right-text-s">
              自动生成研发支出辅助账、辅助账汇总表、优惠明细表
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ullist: [
        {
          title: "国税〔2022〕28号",
          url:'http://www.chinatax.gov.cn/chinatax/n810341/n810825/c101434/c5169007/content.html'
          
        },
        {
          title: "国税〔2022〕17号",
          url:'http://www.chinatax.gov.cn/chinatax/n810341/n810825/c101434/c5181400/content.html'
        },
        {
          title: "国税〔2022〕1356号",
          url:'http://www.chinatax.gov.cn/chinatax/n364/c5181129/content.html'
        },
        {
          title: "国税〔2022〕25号",
          url:'http://www.chinatax.gov.cn/chinatax/n363/c5180817/content.html'
        },
        {
          title: "国税〔2022〕16号",
           url:'http://www.chinatax.gov.cn/chinatax/n810341/n810825/c101434/c5178626/content.html'
        },
        {
          title: "国税〔2017〕34号",
             url:'http://www.chinatax.gov.cn/n810341/n810755/c2597736/content.html'
        },
        {
          title: "国税〔2015〕119号",
             url:'http://www.chinatax.gov.cn/n810341/n810755/c1878881/content.html'

        },
      ],
    };
  },
  methods: {
    targetclike(url) {
      window.open(url)
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  background: #0f8cf2;
  padding: 0 8%;
}
.title-main {
  width: 100%;
  height: 56px;
  line-height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title-left {
    font-size: 25px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #ffffff;
  }
  .title-right {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #333333;
    margin-right: 5%;
  }
}
.content-main {
  width: 100%;
  height: 504px;
  display: flex;
  align-items: center;
  justify-content: center;
  .content-main-title {
    width: 16%;
    height: 100%;

    .content-main-title-top {
      padding: 1%;
      width: 100%;
      height: 124px;
      line-height: 124px;
      font-size: 25px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: center;
      color: #ffffff;
    }
    .content-main-title-ul {
      width: 100%;
      height: 380px;
      overflow: hidden;
      text-align: center;

      background: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      li {
        color: #ffffff;
        font-size: 16px;
        margin: 44px 0;
        cursor: pointer;
        &:first-child {
          margin: 12px 0;
        }
        &:last-child {
          margin: 12px 0;
        }
      }
    }
  }
  .content-main-img {
    width: 84%;
    height: 100%; 
    background: url("../../assets/loginimg/loginimg.png");
    background-size: 90% 90%;
    background-repeat: no-repeat;
    background-position: center;
  }
}
.footer {
  width: 100%;
  padding-top: 92px;
  display: flex;
  justify-content: center;
  align-items: center;

  .footer-left {
    width: 16%;
    height: 100%;
    padding-top: 20px;
    text-align: center;
    .footer-left-img {
      margin: 0 auto;
      width: 117px;
      height: 118px;
      background: url("../../assets/loginimg/caozuo.png");
      background-size: 100%;
    }
    .footer-left-text {
      font-size: 30px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #ffffff;
      margin-top: 12px;
    }
  }
  .footer-right {
    width: 84%;
    height: 100%;
    .footer-right-div {
      width: 100%;
      height: 102px;
      display: flex;
      justify-content: space-around;
      border-bottom: 2px dashed #ccc;
      .footer-right-img {
        width: 80px;
        height: 80px;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          bottom: -30px;
          left: 50%;
          width: 20px;
          height: 20px;
          background: #ffffff;
          border-radius: 50%;
          transform: translateX(-50%);
        }
        .lvdian {
          position: absolute;
          bottom: -25px;
          left: 50%;
          width: 10px;
          height: 10px;
          z-index: 99;
          background: #0f8cf2;
          border-radius: 50%;
          transform: translateX(-50%);
        }
        .huidian {
          position: absolute;
          bottom: -25px;
          left: 50%;
          width: 10px;
          height: 10px;
          z-index: 99;
          background: #cecece;
          border-radius: 50%;
          transform: translateX(-50%);
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .footer-right-text {
      margin-top: 20px;
      width: 100%;
      min-height: 81px;

      display: flex;
      justify-content: space-around;

      .footer-right-text-div {
        width: 144px;
        height: 100%;
      }
      .footer-right-text-title {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
      }
      .footer-right-text-s {
        margin-top: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        line-height: 20px;
      }
    }
  }
}
</style>