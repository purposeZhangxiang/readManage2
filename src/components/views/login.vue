<template>
  <div class="container">
    <div class="form1">
      <div class="title">
        <h2>{{name}}</h2>
      </div>
      <el-form :model="formObj" :rules="rules" ref="formObj" label-width="100px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formObj.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formObj.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formObj')">登录</el-button>
          <el-button @click="resetForm('formObj')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="company">©2019 保定微星科技有限公司</div>
  </div>
</template>

<script>
import { login } from "../../api/http";
export default {
  data() {
    /**
     *@method checkAccount 账号验证规则
     *@method validatePass 密码验证规则
     *@param {formObj} 双向绑定表单值
     *@param {rules} 用什么事件去触发验证函数
     *@param {name} 后台管理系统名称
     */
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      formObj: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      name: "阅读管理系统"
    };
  },
  created() {},
  methods: {
    /**
     * @method submitForm 登录方法
     * @method resetForm 重置input框
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push("/home");

          // login("/manager/login", "post", this.formObj).then(res => {
          //   sessionStorage.setItem("token", res.token);
          //   this.$router.push("/home");
          //   // this.$store.dispatch("login");
          // });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  height: 100vh;
  background: url("../../assets/img/bg.png");
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  .form1 {
    width: 400px;
    position: absolute;
    top: calc(50% - 123px);
    // transform: translateY(-130px);
    left:calc(50% - 200px);
  }
  .title {
    height: 60px;
    text-align: center;
    color: white;
  }
  .company{
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
     color: white;
  }
}

.el-form-item__label {
  color: white;
}
</style>

