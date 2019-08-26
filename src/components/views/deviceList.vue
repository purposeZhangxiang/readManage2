<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- 操作栏 -->
    <el-form :inline="true" :model="formInline" class="operate">
      <el-form-item label>
        <el-input-number v-model="formInline.size" :min="0" :max="500" label="新增设备数量"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMore">扩容设备</el-button>
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </el-form-item>
      <el-form-item label="续费方式">
        <el-select v-model="renewType" placeholder="续费方式">
          <el-option label="月卡" value="1"></el-option>
          <el-option label="季卡" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="renew">续费</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="deviceId" label="设备id" min-width="100" width="200"></el-table-column>
      <el-table-column prop="deviceNo" label="设备编号" min-width="100" width="200"></el-table-column>
      <el-table-column prop="rootType" label="root类型" min-width="100" width="200"></el-table-column>
      <el-table-column prop="gnkg" label="功能开关" min-width="100" width="200"></el-table-column>
      <el-table-column prop="activeDate" label="激活时间" min-width="100" width="200"></el-table-column>
      <el-table-column prop="expireTime" label="过期时间" min-width="100" width="200"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleChange(scope.$index, scope.row)">修改设备码功能</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <!-- <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>-->
    </div>
    <!-- 模态框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="dialogForm" v-if="dialogTitle==='扩容设备码' ">
        <!-- 扩容 -->
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
      <!-- 单纯更改码功能 -->
      <el-form :model="dialogForm2" v-if="dialogTitle==='更改设备码功能'">
        <el-row>
          <el-form-item label="功能开关" label-width="120px">
            <el-checkbox-group v-model="dialogForm2.gnkg" size="middle">
              <el-checkbox-button v-for="index in gnOptions" :label="index" :key="index">{{index}}</el-checkbox-button>
            </el-checkbox-group>
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
import { http } from "../../api/http";
import global from "../../util/globalFunction.js";
import { all } from "q";
export default {
  components: {
    breadNav: () => import("../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["设备列表"],
      formInline: { size: "" },
      tableData: [],
      multipleSelection: [],
      renewType: "1",
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      dialogTitle: "",
      dialogForm: {
        rootStatus: "",
        gnkg: [],
        deviceSize: ""
      },
      dialogForm2: {
        gnkg: []
      },
      gnOptions: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  mounted() {
    this.getDeviceList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    getDeviceList() {
      http("/manager/deviceList", "post", this.$route.query).then(res => {
        debugger;
        this.tableData = res;
        this.total = res.length;
      });
    },
    search() {},
    renew() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请勾选要续费的设备");
      } else {
        let deviceIds = [];
        for (let val of this.multipleSelection) {
          deviceIds.push(val.deviceId);
        }
        let json = {
          deviceIds: deviceIds.join(","),
          renewalType: this.renewType
        };
        http("/manager/renewalDevice", "post", json).then(res => {
          this.$message.success("续费成功");
          this.getDeviceList();
        });
      }
    },
    addMore() {
      // this.dialogFormVisible = !this.dialogFormVisible;
      // this.dialogTitle = "扩容设备码";
      if (this.formInline.size == 0) {
        this.$message.warning("数量必须大于0");
      } else {
        let obj = {
          comId: this.$route.query.comId,
          size: this.formInline.size
        };
        http("/manager/addDeviceSize", "post", obj).then(res => {
          this.$message.success("新增设备" + obj.size + "台成功");
          this.getDeviceList();
        });
      }
    },
    exportExcel() {
      http("/file/exportDevice", "get", this.$route.query, "blob");
    },
    ok() {
      if (this.dialogTitle == "扩容设备码") {
        let arr = [
          {
            gnkg: global.binary(this.dialogForm.gnkg),
            type: this.dialogForm.rootStatus,
            size: this.dialogForm.deviceSize
          }
        ];
        let json = {};
        this.createJson(json, arr);
        console.log(json);
        http("/manager/createCom", "post", json).then(res => {
          debugger;
        });
      } else if (this.dialogTitle == "更改设备码功能") {
        alert("更改");
      }
      // close modal
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    createJson(json, arr) {
      for (let index in arr) {
        json["root[" + index + "].size"] = arr[index].size;
        json["root[" + index + "].type"] = arr[index].type;
        json["root[" + index + "].gnkg"] = arr[index].gnkg;
      }
      return json;
    },
    handleChange(index, row) {
      this.dialogTitle = "更改设备码功能";
      this.dialogFormVisible = !this.dialogFormVisible;
      this.dialogForm2.gnkg = global.original(row.gnkg);
    },
    handleDelete(index, row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        alert("删除");
        // http("/manager/delCom", "get", { comId: row.comId }).then(res => {
        //   this.$message.success("删除成功");
        //   this.getUserList();
        // });
      });
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
</style>

