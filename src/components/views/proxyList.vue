<template>
  <div>
    <breadNav :nowLocation="nowLocation" />
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate">
      <el-form-item>
        <el-button type="primary" @click="addProxy">新增</el-button>
        <el-button type="danger" @click="deleteSome">批量删除</el-button>
      </el-form-item>
    </el-form>
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
      <el-table-column prop="name" label="代理用户姓名" min-width="100" width="150"></el-table-column>
      <el-table-column prop="phone" label="联系方式" min-width="100" width="150"></el-table-column>
      <el-table-column prop="user" label="登陆账号" min-width="100" width="150"></el-table-column>
      <el-table-column prop="password" label="登陆密码" min-width="100" width="150"></el-table-column>
      <!-- <el-table-column prop="buyfRoot" label="已购非ROOT码总数" min-width="100" width="180"></el-table-column>
      <el-table-column prop="fRootStatus" label="非ROOT码功能开关状态" min-width="100" width="200"></el-table-column>
      <el-table-column prop="buyRoot" label="已购ROOT码总数" min-width="100" width="150"></el-table-column>
      <el-table-column prop="rootStatus" label="ROOT码功能开关状态" min-width="100" width="200"></el-table-column>-->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleObserveble(scope.$index, scope.row)">开码状况</el-button>
          <el-button size="mini" @click="handleExpansion(scope.$index, scope.row)">扩容</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 弹出框 -->
    <el-dialog :title="proxyTitle" :visible.sync="proxyDialog">
      <!-- form 新增代理 -->
      <el-form :model="proxyform" v-if="proxyTitle=='新增代理' ">
        <el-row>
          <el-col :span="12">
            <el-form-item label="代理姓名" label-width="120px">
              <el-input v-model="proxyform.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登陆账号" label-width="120px">
              <el-input v-model="proxyform.user" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" label-width="120px">
              <el-input maxlength="11" v-model="proxyform.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登陆密码" label-width="120px">
              <el-input v-model="proxyform.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 非root -->
          <el-form-item label="已购非root码" label-width="120px">
            <el-input-number v-model="proxyform.root_froot.frootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="非root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyform.root_froot.frootGnkg" size="middle">
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <!-- root -->
          <el-form-item label="已购root码" label-width="120px">
            <el-input-number v-model="proxyform.root_froot.rootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyform.root_froot.rootGnkg" size="middle">
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- form 扩容 -->
      <el-form :model="proxyform" v-if="proxyTitle=='扩容' ">
        <el-row>
          <!-- 非root -->
          <el-form-item label="已购非root码" label-width="120px">
            <el-input-number v-model="proxyform.root_froot.frootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="非root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyform.root_froot.frootGnkg" size="middle">
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <!-- root -->
          <el-form-item label="已购root码" label-width="120px">
            <el-input-number v-model="proxyform.root_froot.rootSize" :min="0" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="root码功能" label-width="120px">
            <el-checkbox-group v-model="proxyform.root_froot.rootGnkg" size="middle">
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
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
export default {
  components: {
    breadNav: () => import("../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["代理用户列表"],
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      proxyTitle: "",
      proxyDialog: false,
      proxyform: {
        name: "",
        phone: "",
        user: "",
        password: "123456",
        root_froot: {
          frootGnkg: [],
          frootSize: 0,
          rootGnkg: [],
          rootSize: 0
        }
      },
      gnOptions: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  created() {
    this.getProxyList();
  },
  methods: {
    getProxyList(page = 1, pageSize = 10) {
      http("/manager/fetchAgentAdminList", "get").then(res => {
        this.tableData = res.list;
        console.log(res.list);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addProxy() {
      this.proxyTitle = "新增代理";
      this.proxyDialog = true;
    },
    deleteSome() {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let delProxy = [];
        for (let val of this.multipleSelection) {
          delProxy.push(val.id);
        }
        http("/manager/agentAdminDel", "post", {
          ids: delProxy.join(",")
        }).then(res => {
          this.$message.success("删除成功");
          this.getProxyList();
        });
      });
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleExpansion(index, row) {
      this.proxyDialog=true;
      this.proxyTitle="扩容"
    },
    handleDelete(index, row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http("/manager/agentAdminDel", "post", { ids: row.id }).then(res => {
          this.$message.success("删除成功");
          this.getProxyList();
        });
      });
    },
    proxySure() {
      if (this.proxyTitle === "新增代理") {
        let cloneData = JSON.parse(JSON.stringify(this.proxyform));
        let root_froot = cloneData.root_froot;
        root_froot.frootGnkg = this.binary(root_froot.frootGnkg);
        root_froot.rootGnkg = this.binary(root_froot.rootGnkg);
        let arr = [root_froot];
        this.createJson(cloneData, arr);
        http("/manager/createAgentAdmin", "post", cloneData).then(res => {
          this.$message.success("新增代理用户成功！");
          this.getProxyList();
        });
      } else if (this.proxyTitle === "编辑") {
      }
      this.proxyDialog = false;
    },
    // binary处理成二进制开关
    binary(arr) {
      arr.sort((x, y) => x - y);
      for (let i = 0; i < 8; i++) {
        arr[i] !== i + 1 ? arr.splice(i, 0, 0) : arr.splice(i, 1, 1);
      }
      return arr.reverse().join("");
    },
    // 构建json
    createJson(json, arr) {
      for (let index in arr) {
        json["accountCodeSettingList[" + index + "].frootGnkg"] =
          arr[index].frootGnkg;
        json["accountCodeSettingList[" + index + "].frootSize"] =
          arr[index].frootSize;
        json["accountCodeSettingList[" + index + "].rootGnkg"] =
          arr[index].rootGnkg;
        json["accountCodeSettingList[" + index + "].rootSize"] =
          arr[index].rootSize;
      }
      delete json.root_froot;
      return json;
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
</style>
