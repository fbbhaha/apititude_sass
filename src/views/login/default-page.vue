<template>
  <div
    class="login-container"
    @keyup.enter.native="handleLogin"
    :style="loginbgImage"
  >
    <div class="login-content">
      <div class="login-img"></div>
      <div class="login-form">
        <div class="login-type">
          <div
            :class="{ 'login-title': true, selected: loginType === 1 }"
            @click="loginType = 1"
          >
            账号登录
          </div>
          <div
            :class="{ 'login-title': true, selected: loginType === 2 }"
            @click="loginType = 2"
          >
            手机号登录
          </div>
        </div>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          autocomplete="on"
          label-position="left"
          v-if="loginType === 1"
        >
          <el-form-item prop="account">
            <img src="../../assets/loginimg/username.png" alt="" />

            <el-input
              ref="account"
              v-model="loginForm.account"
              :placeholder="$t('login.username')"
              name="account"
              type="text"
              tabindex="1"
              autocomplete="on"
              size="large"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <!--<el-form-item class="rule-tip">{{$t('login.rule')}}</el-form-item>-->
          <el-tooltip
            v-model="capsTooltip"
            :content="$t('login.upper')"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <img src="../../assets/loginimg/password.png" alt="" />
              <el-input
                ref="password"
                v-model="loginForm.password"
                show-password
                :placeholder="$t('login.password')"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                size="large"
                placeholder="请输入密码"
              ></el-input>
              <!-- @keyup.enter.native="handleLogin" -->
            </el-form-item>
          </el-tooltip>
          <!-- <template v-if="needVerification">
            <el-form-item prop="code" v-if="verificationType == 0">
              <el-input
                ref="code"
                type="text"
                class="input-with-code"
                name="code"
                v-model="loginForm.code"
                autocomplete="on"
                tabindex="3"
                placeholder="请输入验证码"
                prefix-icon="el-icon-picture-outline"
                size="large"
              >
                <img
                  id="imgcode"
                  alt="点击切换验证码"
                  title="点击切换验证码"
                  :src="define.comUrl + imgUrl"
                  @click="changeImg"
                  slot="append"
                />
              </el-input>
            </el-form-item>
            <el-form-item v-else>
              <SliderCheck
                :class="{ shake: showSliderShake }"
                @on-success="loginForm.sliderCheck = true"
                @on-error="loginForm.sliderCheck = false"
              ></SliderCheck>
            </el-form-item>
          </template> -->
          <!-- <el-form-item>
            <el-checkbox v-model="remember" style="color: #a0a0a0"
              >自动登录</el-checkbox
            >
            <span
              style="
                cursor: pointer;
                color: #f19149;
                font-size: 0.75rem;
                margin-left: 5px;
              "
              >忘记密码？</span
            >
          </el-form-item> -->
          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            size="large"
            @click.native.prevent="handleLogin"
            >{{ $t("login.logIn") }}</el-button
          >

          <div class="foot">
            <span class="register">立即注册</span>
            <span class="forget">忘记密码</span>
          </div>
          <div class="forgetPassword">
            <el-checkbox v-model="confirmAgreement"
              >已阅读并同意详情查看《注册协议》《保密协议》</el-checkbox
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getConfig } from "@/api/user";
import SliderCheck from "@/components/Slider-Check";
export default {
  name: "Login",
  components: { SliderCheck },
  data() {
    return {
      loginType: 1,
      confirmAgreement: false,
      loginForm: {
        account: "",
        password: "",
        timestamp: "",
        code: "",
        type: 0,
        sliderCheck: false
      },
      loginRules: {
        account: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("login.accountTip")
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("login.passwordTip")
          }
        ],
        code: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("login.smsCode")
          }
        ]
      },
      capsTooltip: false,
      loading: false,
      showDialog: false,
      imgUrl: "",

      redirect: undefined,
      remember: false,
      otherQuery: {},

      codeLength: 4,
      needVerification: false,
      verificationType: 0,
      showSliderShake: false
    };
  },
  computed: {
    ...mapState({
      loginBg: state => state.settings.loginBg
    }),
    loginLoading() {
      return this.$store.state.user.loginLoading;
    },
    contentWidth() {
      return {
        width: screen.width >= 1920 ? "76%" : "80%"
      };
    },
    loginbgImage() {
      let loginBg = require("../../assets/loginimg/bg.png");
      return {
        backgroundImage: "url(" + loginBg + ")"
      };
    }
  },
  watch: {
    active(val) {
      this.loginForm.type = newVal;
      let _this = this;
      if (val != 3) {
        _this.loginForm.code = "";
        _this.faceShow = false;
        _this.closeVideo();
        return;
      }
      _this.initFaceScan();
    },
    loginLoading(val) {
      if (!val) this.loading = false;
    },
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // if (screen.width >= 1920) {
    //   require.ensure([], function (require) {
    //     require("../../assets/scss/bigScreen.scss");
    //   });
    // } else {
    //   require.ensure([], function (require) {
    //     require("../../assets/scss/smallScreen.scss");
    //   });
    // }
    const _this = this;
    document.onkeydown = function(e) {
      const { keyCode } = e;
      if (keyCode === 13) {
        _this.handleLogin();
      }
    };
    this.changeImg();
  },
  mounted() {
    // if (this.loginForm.account === '') {
    //   this.$refs.account.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
    this.$store.commit("user/SET_LOGIN_LOADING", false);
    this.getCookie();
    this.getConfig();
  },
  destroyed() {
    document.onkeydown = function(e) {
      const { keyCode } = e;
      if (keyCode === 13) {
      }
    };
  },
  methods: {
    getConfig() {
      getConfig("admin").then(res => {
        this.needVerification = !!res.data.enableVerificationCode;
        this.verificationType = res.verificationType || 0;
        if (this.needVerification && this.verificationType == 0) {
          this.codeLength = res.data.verificationCodeNumber || 4;
          this.changeImg();
        }
      });
    },

    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },

    handleLogin() {
      if (this.loading) return;
      if (!this.confirmAgreement) {
        return this.$message.warning("请先同意用户协议");
      }
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.needVerification && this.verificationType == 1) {
            if (!this.loginForm.sliderCheck) {
              this.showSliderShake = true;
              setTimeout(() => {
                this.showSliderShake = false;
              }, 1000);
              return;
            }
          }
          this.loading = true;
          this.$store.commit("user/SET_LOGIN_LOADING", true);
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              if (this.remember == true) {
                //传入账号名，密码，和保存天数3个参数
                this.setCookie(
                  this.loginForm.account,
                  this.loginForm.password,
                  30
                );
              } else {
                this.clearCookie();
              }
              console.log(this.loginForm);
              if (this.loginForm.account == "hanfei") {
                this.$router.push("/enterprise/home");
              } else {
                this.$router.push("/home");
              }

              // this.checkPassword();
            })
            .catch(() => {
              this.changeImg();
              this.$store.commit("user/SET_LOGIN_LOADING", false);
            });
        } else {
          this.changeImg();
          return false;
        }
      });
    },
    checkPassword() {
      this.$store.dispatch("user/changePassword", this.loginForm.password);
    },
    changeImg() {
      let timestamp = Math.random();
      this.loginForm.timestamp = timestamp;
      this.imgUrl = `/api/oauth/ImageCode/${this.codeLength || 4}/${timestamp}`;
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.loginForm.account = arr2[1]; //保存到保存数据的地方
            this.remember = true;
          } else if (arr2[0] == "userPwd") {
            this.loginForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    changeBg(i) {
      this.$store.dispatch("settings/changeSetting", {
        key: "loginBg",
        value: "bg" + i
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: #fff;
$cursor: #fff;

.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% 100%;
  .login-content {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    border-radius: 5px;
    box-shadow: 0px 0px 20px 0px rgba(127, 127, 127, 0.5);
    overflow: hidden;
    .login-img {
      width: 676.87px;
      height: 675px;
      background-image: url("../../assets/loginimg/left.png");
      background-image: 100% 100%;
      background-repeat: no-repeat;
    }
    .login-form {
      padding: 25px;
      background-color: $bg;
      position: relative;
      .login-type {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 30px 0 50px;
        gap: 30px;
        .login-title {
          font-family: PingFangSC-Medium;
          font-weight: 500;
          position: relative;
          font-size: 24px;
          color: #5c5d5e;
          cursor: pointer;
          &::after {
            content: "";
            width: 40px;
            height: 7px;
            background: #fff;
            border-radius: 8px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: -20px;
          }
          &.selected {
            font-size: 26px;
            color: #1a1a1b;
            &::after {
              background: #0971fd;
            }
          }
        }
      }

      .el-form {
        padding: 20px 30px;
        >>> .el-form-item {
          width: 100%;
          height: 70px;
          background: #eef3fb;
          border-radius: 35px;
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .el-form-item__content {
            width: 100%;
            height: 100%;
            padding: 0 20px;
            display: flex;
            align-items: center;
            .el-input {
              font-size: 20px;
              flex: 1;
              height: 100%;
              .el-input__inner {
                background-color: transparent;
                border: none;
                height: 100%;
              }
            }
          }
        }
        input:-webkit-autofill {
          box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-text-fill-color: #606266 !important;
        }
        input::-webkit-input-placeholder {
          color: #a0acb7;
        }
        .login-btn {
          width: 100%;
          height: 60px;
          border-radius: 35px;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .foot {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #188ae2;
          .register,
          .forget {
            cursor: pointer;
          }
        }
        .forgetPassword {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 20px;
        }
      }
    }
  }
}
.login-container .login-foot {
  text-align: center;
}
</style>
