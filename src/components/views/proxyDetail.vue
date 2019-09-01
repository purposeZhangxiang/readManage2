<template>
  <div>
    <breadNav :nowLocation="nowLocation" />
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate">
      <el-form-item>
        <el-button type="primary" @click="expansionNewType">扩容新种类码</el-button>
      </el-form-item>
    </el-form>
    <p>
      该代理用户共购买root码
      <span class="total">{{rootTotal}}</span> 个,非root码
      <span class="total">{{frootTotal}}</span> 个
    </p>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :highlight-current-row="true"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="rootSize" label="已购root码总数" min-width="100" width="150"></el-table-column>
      <el-table-column prop="rootGnkg" label="root码功能开关" min-width="100" width="150"></el-table-column>
      <el-table-column prop="frootSize" label="已购非root码总数" min-width="100" width="150"></el-table-column>
      <el-table-column prop="frootGnkg" label="非root码功能开关" min-width="100" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleExpansion(scope.$index, scope.row)">扩容数量</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog :title="proxyTitle" :visible.sync="proxyDialog" width="30%">
      <!-- form 扩容新类型 -->
      <el-form :model="proxyformType" v-if="proxyTitle=='扩容新种类' ">
        <el-row>
          <el-form-item label="已购非root码" label-width="120px">
            <el-input-number v-model="proxyformType.frootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="非root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyformType.frootGnkg" size="middle">
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="已购root码" label-width="120px">
            <el-input-number v-model="proxyformType.rootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyformType.rootGnkg" size="middle">
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- form 扩容数量 -->
      <el-form :model="proxyformSize" v-if="proxyTitle=='扩容数量' ">
        <el-row>
          <el-form-item label="扩容非root码" label-width="120px">
            <el-input-number v-model="proxyformSize.frootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="扩容root码" label-width="120px">
            <el-input-number v-model="proxyformSize.rootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="proxyDialog = false">取 消</el-button>
        <el-button type="primary" @click="proxySure">确 定</el-button>
      </div>
    </el-dialog>
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
      nowLocation: ["代理用户详情"],
      proxyId: "",
      rootStatus: "1",
      tableData: [],
      multipleSelection: [],
      proxyTitle: "",
      proxyDialog: false,
      proxyformType: {
        frootGnkg: [],
        frootSize: 0,
        rootGnkg: [],
        rootSize: 0
      },
      gnOptions: [1, 2, 3, 4, 5, 6, 7, 8],
      proxyformSize: {
        frootSize: "",
        rootSize: ""
      },
      row: {},
      rootTotal: "",
      frootTotal: ""
    };
  },
  created() {
    //接收路由参数
    this.proxyId = this.$route.query.proxyId;
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      http("/manager/fetchAgentAdminById", "get", {
        id: this.proxyId
      }).then(res => {
        this.tableData = res.accountCodeSettingList;
        let root = 0,
          froot = 0;
        for (let val of res.accountCodeSettingList) {
          root += val.rootSize;
          froot += val.frootSize;
        }
        this.rootTotal = root;
        this.frootTotal = froot;
      });
    },
    search() {
      this.getDetail();
    },
    expansionNewType() {
      this.proxyDialog = true;
      this.proxyTitle = "扩容新种类";
    },
    handleSelectionChange() {
      this.multipleSelection = val;
    },
    handleExpansion(index, row) {
      this.proxyDialog = true;
      this.proxyTitle = "扩容数量";
      this.row = row;
    },
    handleDelete(index, row) {
      http("/manager/deleteAccountCodeSettingById", "get", { id: row.id }).then(
        res => {
          this.$message.success("删除成功");
          this.getDetail();
        }
      );
    },
    createJson(json, arr) {
      // 两种类码都存在时 需要过滤size=0的情况
      for (let index in arr) {
        if (this.proxyTitle == "扩容数量") {
          json["accountCodeSettingList[" + index + "].id"] = arr[index].id;
        }
        json["accountCodeSettingList[" + index + "].frootGnkg"] =
          arr[index].frootGnkg;
        json["accountCodeSettingList[" + index + "].frootSize"] =
          arr[index].frootSize;
        json["accountCodeSettingList[" + index + "].rootGnkg"] =
          arr[index].rootGnkg;
        json["accountCodeSettingList[" + index + "].rootSize"] =
          arr[index].rootSize;
      }
      return json;
    },
    proxySure() {
      if (this.proxyTitle == "扩容新种类") {
        let cloneData = JSON.parse(JSON.stringify(this.proxyformType));
        cloneData.frootGnkg = globalFunc.binary(cloneData.frootGnkg);
        cloneData.rootGnkg = globalFunc.binary(cloneData.rootGnkg);
        cloneData.id = this.proxyId;
        let arr = [cloneData];
        this.createJson(cloneData, arr);
        //删除多余参数
        delete cloneData.frootGnkg;
        delete cloneData.rootGnkg;
        delete cloneData.rootSize;
        delete cloneData.frootSize;
        http("/manager/agentAdminUpdate", "post", cloneData).then(res => {
          this.$message.success("扩容成功");
          this.getDetail();
        });
      } else if ((this.proxyTitle = "扩容数量")) {
        let json = {
          id: this.row.accountId
        };
        let cloneData = JSON.parse(JSON.stringify(this.row));
        let arr = [Object.assign(cloneData, this.proxyformSize)];
        let obj = this.createJson(json, [cloneData]);
        http("/manager/agentAdminUpdate", "post", obj).then(res => {
          this.$message.success("扩容成功");
          this.getDetail();
        });
      }
      this.proxyDialog = false;
    }
  }
};
</script>

<style lang="less" scoped>
.operate {
  margin-top: 10px;
}
.page {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.total {
  font-size: 20px;
  color: red;
}
</style>

