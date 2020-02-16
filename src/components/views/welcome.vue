<template>
  <div class="bg">
    <div class="header">
      <h2>{{username}} 你好 欢迎登录阅读管理系统</h2>
      <h3>感谢你对我们的信任和支持 我们会做得更好</h3>
    </div>
    <div class="section" v-if="level==1">
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
    <!-- 代理 -->
    <!-- <div v-else style="text-align:center">
      <img src="../../assets/img/welcome.png" alt />
    </div>-->

    <div v-else class="proxyBox">
      <div class="calender">
        <el-calendar v-model="calendar"></el-calendar>
      </div>
      <div class="codeInfo">
        <div class="proxyTitle">剩余码信息</div>
        <div class="tips">
         <span style="color:red"> 温馨提示：</span>
          <br />1-新增企业用户时该企业用户下面的设备号功能已经定死不可更改,请谨慎操作
          <br />2-选择功能开关时时请详细对比此页面表格的剩余数进行操作
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="ROOR码查询" name="1">
            <!-- table1 -->
            <el-table ref="multipleTable" :data="rootRemain" tooltip-effect="dark" border>
              <el-table-column
                v-for="(item,index) in rootTb"
                :key="index"
                :label="item.label"
                :prop="item.prop"
              ></el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="非ROOR码查询" name="2">
            <el-table :data="frootRemain" border>
              <el-table-column
                v-for="(item,index) in rootTb"
                :key="index"
                :label="item.label"
                :prop="item.prop"
              ></el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
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
      },
      // proxy page var
      calendar: new Date(),
      activeNames: [],
      rootRemain: [],
      rootTb: [
        {
          label: "功能开关",
          prop: "codeData.gnkg"
        },
        {
          label: "此功能码购买总数",
          prop: "codeData.total"
        },
        {
          label: "此功能码剩余数",
          prop: "codeData.remain"
        }
      ]
    };
  },
  created() {
    this.getLevel();
    this.getTotal();
  },
  methods: {
    getTotal() {
      http("/statis/index", "get").then(res => {
        this.total = res;
      });
    },
    getLevel() {
      let levelkey = window.btoa("level");
      let levelval = atob(sessionStorage.getItem(levelkey));
      this.username = sessionStorage.getItem("username");
      this.level = levelval;
    },

    handleChange(val) {
      console.log(val);

      this.getRemain();
    },
    // 获取代理剩余码
    getRemain() {
      http("/manager/fetchAgentLaveFunCode", "get", {
        rootType: "1"
      }).then(res => {
        this.rootRemain = res;
        let sum = 0;
        for (let val of res) {
          sum += val.codeData.total;
        }
        this.rootTotal = sum;
      });
      http("/manager/fetchAgentLaveFunCode", "get", {
        rootType: "2"
      }).then(res => {
        this.frootRemain = res;
        let sum = 0;
        for (let val of res) {
          sum += val.codeData.total;
        }
        this.frootTotal = sum;
      });
    }
  }
};
</script>

<style lang="less" scoped>
h2,
h3 {
  text-align: center;
  color: black;
  line-height: 30px;
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

// proxy css
.proxyBox {
  display: flex;
  padding: 10px;
  div {
    flex: 1;
  }
  .proxyTitle {
    text-align: center;
    height: 53px;
    line-height: 53px;
    font-weight: bold;
  }
  .tips {
    padding: 6px 0;
  }
}
</style>

