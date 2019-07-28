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
      <el-table-column prop="phone" label="代理用户手机" min-width="100" width="150"></el-table-column>
      <el-table-column prop="buyfRoot" label="已购非ROOT码总数" min-width="100" width="180"></el-table-column>
      <el-table-column prop="fRootStatus" label="非ROOT码功能开关状态" min-width="100" width="200"></el-table-column>
      <el-table-column prop="buyRoot" label="已购ROOT码总数" min-width="100" width="150"></el-table-column>
      <el-table-column prop="rootStatus" label="ROOT码功能开关状态" min-width="100" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleObserveble(scope.$index, scope.row)">开码状况</el-button>
          <el-button size="mini" @click="handleObserveble(scope.$index, scope.row)">扩容</el-button>
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
      <el-form :model="proxyform">
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
              <el-input v-model="proxyform.phone" autocomplete="off"></el-input>
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
      // gnOptions: [
      //   { name: "功能一", val: 1 },
      //   { name: "功能二", val: 2 },
      //   { name: "功能三", val: 3 },
      //   { name: "功能四", val: 4 },
      //   { name: "功能五", val: 5 },
      //   { name: "功能六", val: 6 },
      //   { name: "功能七", val: 7 },
      //   { name: "功能八", val: 8 }
      // ]
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
    handleDelete(index, row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //整理出 要删除的设备
        // let delcodes = [];
        // for (let val of this.multipleSelection) {
        //   delcodes.push(val.code);
        // }
        http("/manager/agentAdminDel", "post", { ids: row.id }).then(res => {
          this.$message.success("删除成功");
          this.getProxyList();
        });
      });
    },
    proxySure() {
      if (this.proxyTitle === "新增代理") {
        // let cloneData = this.proxyform;
        // cloneData.root_froot.frootGnkg = cloneData.root_froot.frootGnkg.join(
        //   ","
        // );
        // cloneData.root_froot.rootGnkg = cloneData.root_froot.rootGnkg.join(",");
        // cloneData.accountCodeSettingList = JSON.stringify([
        //   cloneData.root_froot
        // ]);
        // delete cloneData.root_froot;
        // let rootGnkg=[],frootGnkg=[];
        // for(let index in cloneData.root_froot.frootGnkg){
        //   frootGnkg.push(cloneData.root_froot.frootGnkg[index].val)
        // }
        // cloneData.root_froot.frootGnkg
        // for(let index in cloneData.root_froot.rootGnkg){
        //   rootGnkg.push(cloneData.root_froot.rootGnkg[index].val)
        // }
        // delete cloneData.
        // var json = {
        //   accountCodeSettingList: [
        //     {
        //       frootGnkg: "string",
        //       frootSize: 0,
        //       rootGnkg: "string",
        //       rootSize: 0
        //     }
        //   ],
        //   name: "string",
        //   password: "string",
        //   phone: "string",
        //   user: "string"
        // };
        let arr = [
          {
            frootGnkg: "2,3,4",
            frootSize: 10,
            rootGnkg: "1,2",
            rootSize: 20
          }
        ];
        let o = {
          name: "ZX",
          password: "123",
          phone: "1776128738",
          user: "ZX"
        };
        for (let index in arr) {
          o["accountCodeSettingList[" + index + "].frootGnkg"] =
            arr[index].frootGnkg;
          o["accountCodeSettingList[" + index + "].frootSize"] =
            arr[index].frootSize;
          o["accountCodeSettingList[" + index + "].rootGnkg"] =
            arr[index].rootGnkg;
          o["accountCodeSettingList[" + index + "].rootSize"] =
            arr[index].rootrootSizeGnkg;
        }
        debugger;
        // const formData = new FormData();
        // Object.keys(o).forEach(key => {
        //   formData.append(key, o[key]);
        // });
        // console.log(formData)
        // var jsonData = {};
        // o.forEach((value, key) => (jsonData[key] = value));
        http("/manager/createAgentAdmin", "post", o).then(res => {
          this.$message.success("新增代理用户成功！");
          this.getProxyList();
        });
      } else if (this.proxyTitle === "编辑") {
      }
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
