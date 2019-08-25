<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
    <div class="thanks">
      <!-- <article>首先,感谢您对微星科技的支持！在使用软件的过程中有什么好的意见可以及时反馈我们</article> -->
    </div>
    <!-- 表格 -->

    <div class="table">
      <div>
        <el-table ref="multipleTable" :data="rootRemain" tooltip-effect="dark" border>
          <!-- <el-table-column prop="codeData.total" label="总购买数"></el-table-column>
          <el-table-column prop="codeData.remain" label="剩余数"></el-table-column>
          <el-table-column prop="codeData.gnkg" label="功能开关"></el-table-column>-->
          <el-table-column label="ROOT" align="center">
            <el-table-column
              v-for="(item,index) in rootTb"
              :key="index"
              :label="item.label"
              :prop="item.prop"
            ></el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="intro">
        <p>
          你购买的root码总数为:
          <span class="total">{{rootTotal}}</span>个
          root码详情请看左边表格
        </p>
        <p>
          你购买的非root码总数为:
          <span class="total">{{frootTotal}}</span>个
          非root码详情请看右边表格
        </p>
        <p style="color:red">特别提示:新增企业用户时该企业用户下面的设备号功能已经定死不可更改,请谨慎操作</p>
        <p style="color:red">选择功能开关时时请详细对比此页面表格的剩余数进行操作</p>
      </div>
      <div>
        <el-table :data="frootRemain" border>
          <el-table-column label="非ROOT" align="center">
            <el-table-column
              v-for="(item,index) in rootTb"
              :key="index"
              :label="item.label"
              :prop="item.prop"
            ></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../../api/http";
import globalFunc from "../../../util/globalFunction";
export default {
  components: {
    breadNav: () => import("../../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["代理必看"],
      rootRemain: [],
      frootRemain: [],
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
      ],
      rootTotal: "",
      frootTotal: ""
    };
  },
  created() {
    this.getRemain();
  },
  methods: {
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

<style lang="less">
.thanks {
  margin-top: 10px;
}
.table {
  display: flex;
}
.table div {
  flex: 1;
}
.intro {
  text-align: center;
  font-size: 16px;

  p {
    line-height: 30px;
  }
  .total {
    font-size: 20px;
    color: red;
  }
}
</style>

