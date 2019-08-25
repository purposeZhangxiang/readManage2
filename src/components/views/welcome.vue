<template>
  <div class="bg">
    <div class="header">
      <h2>admin 你好 欢迎登录微星助手管理系统</h2>
    </div>
    <div class="section">
      <div class="total">
        <p class="font">当前代理用户数</p>
        <p class="num">{{proxyTotal}}</p>
      </div>
      <div class="total">
        <p class="font">企业号总数</p>
        <p class="num">{{companyUserTotal}}</p>
      </div>
      <div class="total">
        <p class="font">企业设备总数</p>
        <p class="num">{{deviceTotal}}</p>
      </div>
      <div class="total">
        <p class="font">已激活月卡</p>
        <p class="num">{{monthTotal}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../api/http";
export default {
  data() {
    return {
      proxyTotal: "",
      companyUserTotal: "",
      deviceTotal: "",
      monthTotal: ""
    };
  },
  created() {
    this.getTotal();
  },
  methods: {
    getTotal() {
      // 代理用户数
      http("/manager/fetchAgentAdminList", "get").then(res => {
        this.proxyTotal = res.total;
      });
      // 当前代理数量
      http("/manager/userList", "get").then(res => {
        this.companyUserTotal = res.total;
        //企业用户设备吗
        let deviceTotal = 0;
        for (let val of res.list) {
          deviceTotal += val.deviceSize;
        }
        this.deviceTotal = deviceTotal;
      });
      // 激活的月卡
      http("/manager/codeList", "post", {
        type: 1,
        state: 2,
        rootType: 1 //root
      }).then(res => {
        let rootSize = res.total;
        http("/manager/codeList", "post", {
          type: 1,
          state: 2,
          rootType: 2 //root
        }).then(res => {
          let frootSize = res.total;
          this.monthTotal = rootSize + frootSize;
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.bg {
  // background: url("../../assets/img/welcome.png")no-repeat;
  // width: 100%;
  // height: 100vh;
  // box-sizing: border-box;
}
.header {
  // margin-top: 40px;
}
h2 {
  text-align: center;
  color: black;
}

.section {
  width: 1000px;
  height: 200px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.total {
  width: 200px;
  height: 100px;
  background: white;
  box-shadow: 1px 2px 2px 2px silver;
  border-radius: 5px;
  text-align: center;
}

.font {
  font-weight: bold;
}

.num {
  color: #721414;
}
p {
  display: block;
  margin-block-start: 1em;
}
</style>

