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
        <el-table
          ref="multipleTable"
          :data="rootRemain"
          tooltip-effect="dark"
          style="width: 100%"
          border
        >
          <el-table-column prop="codeData.total" label="总购买数" min-width="100" width="150"></el-table-column>
          <el-table-column prop="codeData.remain" label="剩余数" min-width="100" width="150"></el-table-column>
          <el-table-column prop="codeData.gnkg" label="功能开关" min-width="100" width="150"></el-table-column>
        </el-table>
      </div>
      <div></div>
      <div>
        <el-table :data="frootRemain" border style="width: 100%">
          <el-table-column prop="codeData.total" label="总购买数" width="180"></el-table-column>
          <el-table-column prop="codeData.remain" label="剩余数" width="180"></el-table-column>
          <el-table-column prop="codeData.gnkg" label="功能开关"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../api/http";
import globalFunc from "../../util/globalFunction";
export default {
  components: {
    breadNav: () => import("../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["代理必看"],
      rootRemain: [],
      frootRemain: []
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
        debugger;
        this.rootRemain = res;
      });
      http("/manager/fetchAgentLaveFunCode", "get", {
        rootType: "2"
      }).then(res => {
        this.frootRemain = res;
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
</style>

