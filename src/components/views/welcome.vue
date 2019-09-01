<template>
  <div class="bg">
    <div class="header">
      <h2>{{username}} 你好 欢迎登录微星助手管理系统</h2>
    </div>
    <div class="section">
      <div class="total">
        <p class="font">当前代理用户数</p>
        <p class="num">{{total.proxyNum?total.proxyNum:0}}</p>
      </div>
      <div class="total">
        <p class="font">企业号总数</p>
        <p class="num">{{total.userNum?total.userNum:0}}</p>
      </div>
      <div class="total">
        <p class="font">企业设备总数</p>
        <p class="num">{{total.deviceNum?total.deviceNum:0}}</p>
      </div>
      <div class="total">
        <p class="font">发放测试码总数</p>
        <p class="num">{{total.testCodeNum?total.testCodeNum:0}}</p>
      </div>
      <!-- yue -->
      <div class="total">
        <p class="font">生成月卡总数</p>
        <p class="num">{{total.month.total?total.month.total:0}}</p>
      </div>
      <div class="total">
        <p class="font">使用中的月卡</p>
        <p class="num">{{total.month.isUsing?total.month.isUsing:0}}</p>
      </div>
      <div class="total">
        <p class="font">未激活的月卡</p>
        <p class="num">{{total.month.unUse?total.month.unUse:0}}</p>
      </div>
      <div class="total">
        <p class="font">已过期的月卡</p>
        <p class="num">{{total.month.used?total.month.used:0}}</p>
      </div>
      <!-- season -->
      <div class="total">
        <p class="font">生成季卡总数</p>
        <p class="num">{{total.season.total?total.season.total:0}}</p>
      </div>
      <div class="total">
        <p class="font">使用中的季卡</p>
        <p class="num">{{total.season.isUsing?total.season.isUsing:0}}</p>
      </div>
      <div class="total">
        <p class="font">未激活的季卡</p>
        <p class="num">{{total.season.unUse?total.season.unUse:0}}</p>
      </div>
      <div class="total">
        <p class="font">已过期的季卡</p>
        <p class="num">{{total.season.used?total.season.used:0}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../api/http";
export default {
  data() {
    return {
      total: {
        proxyNum: "",
        month: {
          total: ""
        },
        season: {
          total: ""
        }
      }
    };
  },
  created() {
    this.getTotal();
    this.username = sessionStorage.getItem("username");
  },
  methods: {
    getTotal() {
      http("/statis/index", "get").then(res => {
        this.total = res;
      });
    }
  }
};
</script>

<style lang="less" scoped>
h2 {
  text-align: center;
  color: black;
}

.section {
  width: 1000px;
  height: 200px;
  margin: 20px auto;
  display: flex;
  // justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  .total {
    width: 200px;
    height: 100px;
    background: white;
    box-shadow: 1px 2px 2px 2px silver;
    border-radius: 5px;
    text-align: center;
    margin: 10px;
  }
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

