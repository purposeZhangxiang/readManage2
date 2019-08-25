<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- 操作栏 -->
    <el-form :inline="true" :model="formInline" class="operate">
      <el-form-item label>
        <el-input v-model="formInline.content" placeholder="企业名称搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" @click="add">新增企业</el-button>
      </el-form-item>
    </el-form>
    <p>
      代理用户您好,你当前剩余的root码剩余
      <span class="color">{{rootTotalNum}}</span>个,非root码剩余
      <span class="color">{{frootTotalNum}}</span>个,感谢您对微星科技的支持！
    </p>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="账号" min-width="100" width="200"></el-table-column>
      <el-table-column prop="realName" label="联系人名称" min-width="100" width="200"></el-table-column>
      <el-table-column prop="phone" label="联系方式" min-width="100" width="200"></el-table-column>
      <el-table-column prop="comName" label="企业名称" min-width="100" width="200"></el-table-column>
      <el-table-column prop="deviceSize" label="设备数量" min-width="100" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleObserveble(scope.$index, scope.row)">查看设备</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 模态框 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible" @close="dialogClose">
      <el-form :model="dialogForm">
        <el-row>
          <!-- left -->
          <el-col :span="12">
            <el-form-item label="账号" label-width="120px">
              <el-input v-model="dialogForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业名称" label-width="120px">
              <el-input v-model="dialogForm.comName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <!-- right -->
          <el-col :span="12">
            <el-form-item label="联系人名称" label-width="120px">
              <el-input v-model="dialogForm.realName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" label-width="120px">
              <el-input maxlength="11" v-model="dialogForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="root状态" label-width="120px">
            <el-select v-model="dialogForm.rootStatus" placeholder="非ROOT /ROOT">
              <el-option label="root" value="1"></el-option>
              <el-option label="非root" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="功能开关" label-width="120px">
            <el-checkbox-group v-model="dialogForm.gnkg" size="middle">
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="设备数量" label-width="120px">
            <el-input-number v-model="dialogForm.deviceSize" :min="1" :max="500"></el-input-number>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
      </div>
    </el-dialog>
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
      nowLocation: ["公司管理"],
      //代理剩余码查询
      rootRemain: "",
      rootTotalNum: 0,
      frootRemain: "",
      frootTotalNum: 0,
      formInline: {
        content: ""
      },
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      dialogForm: {
        account: "",
        realName: "",
        phone: "",
        comName: "",
        deviceSize: "",
        rootStatus: "1",
        gnkg: []
      },
      gnOptions: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  mounted() {
    this.getUserList();
    this.queryEx();
  },
  methods: {
    /**
     * @method {handleSelectionChange}
     * @method {handleObserveble}
     * @method {handleDelete}
     * @method {handleSizeChange}
     * @method {handleCurrentChange}
     *
     */
    queryEx() {
      http("/manager/fetchAgentLaveFunCode", "get", {
        rootType: "1"
      }).then(res => {
        this.rootRemain = res;
        let sum = 0;
        for (let val of res) {
          sum += val.codeData.total;
        }
        this.rootTotalNum = sum;
      });
      http("/manager/fetchAgentLaveFunCode", "get", {
        rootType: "2"
      }).then(res => {
        this.frootRemain = res;
        let sum = 0;
        for (let val of res) {
          sum += val.codeData.total;
        }
        this.frootTotalNum = sum;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleObserveble(index, row) {
      this.$router.push({
        path: "/home/proxyDeviceList",
        query: { comId: row.comId }
      });
    },
    handleDelete(index, row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http("/manager/delCom", "get", { comId: row.comId }).then(res => {
          this.$message.success("删除成功");
          this.getUserList();
        });
      });
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.getUserList(val);
    },
    dialogClose() {
      this.claerForm();
    },
    claerForm() {
      for (let index in this.dialogForm) {
        this.dialogForm[index] = "";
      }
    },
    getUserList(currentPage = 1, comName = "") {
      http("/manager/userList", "get", {
        page: currentPage,
        pageSize: 10,
        comName
      }).then(res => {
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    search() {
      this.getUserList(1, this.formInline.content);
    },
    add() {
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    ok() {
      let cloneData = JSON.parse(JSON.stringify(this.dialogForm));
      //验证表单数据必填项目
      let arr = [
        {
          gnkg: globalFunc.binary(cloneData.gnkg),
          size: cloneData.deviceSize,
          type: cloneData.rootStatus
        }
      ];
      this.verfiy(cloneData, arr); //验证类型和数量
      // this.createJson(cloneData, arr);
      //删除多余字段
      // delete cloneData.gnkg;
      // delete cloneData.deviceSize;
      // delete cloneData.rootStatus;
      // http("/manager/createCom", "post", cloneData).then(res => {
      //   this.$message.success("添加成功");
      //   this.dialogFormVisible = !this.dialogFormVisible;
      //   this.getUserList();
      // });
    },
    //构建json数据
    createJson(json, arr) {
      //代理必要的参数settingId
      for (let index in arr) {
        json["root[" + index + "].size"] = arr[index].size;
        json["root[" + index + "].type"] = arr[index].type;
        json["root[" + index + "].gnkg"] = arr[index].gnkg;
        json["root[" + index + "].settingId"] = arr[index].settingId;
      }
      // console.log(json);
      // return json;
      this.createdCompany(json);
    },
    createdCompany(options) {
      http("/manager/createCom", "post", options).then(res => {
        this.$message.success("添加成功");
        this.dialogFormVisible = !this.dialogFormVisible;
        this.getUserList();
      });
    },
    //前端验证
    verfiy(cloneData, options) {
      for (let index in options) {
        //root
        if (options[index].type == "1") {
          for (let val of this.rootRemain) {
            if (
              options[index].gnkg == val.codeData.gnkg &&
              options[index].size <= val.codeData.remain
            ) {
              console.log("if");
              options[index].settingId = val.settingId;
              this.createJson(cloneData, options);
              return;
            } else {
              this.$message.warning("功能开关选项错误或者数量错误");
            }
          }
        } else if (options[index].type == "2") {
          //froot
          for (let val of this.frootRemain) {
            if (
              options[index].gnkg == val.codeData.gnkg &&
              options[index].size <= val.codeData.remain
            ) {
              options[index].settingId = val.settingId;
              this.createJson(cloneData, options);
              return;
            } else {
              this.$message.warning("功能开关选项错误或者数量错误");
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="less">
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
.color {
  color: red;
  font-size: 20px;
}
</style>











