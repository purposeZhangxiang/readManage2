<template>
  <div>
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- operatebar -->
    <!-- <div class="operate">
      <el-form :inline="true">
        <el-form-item label="listName">
          <el-select v-model="optionsId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.listName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="check">选择</el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <!-- table -->
    <!-- <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item,index) in thead"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <div>
      <div class="content" v-for="(item,index) in tableData" :key="index">
        <div class="root">
          <!-- <el-tag closable="root-item">参数{{index+1}}</el-tag> -->
          <div class="root-index">参数{{index+1}}</div>
          <div class="root-item">{{item.listName}}</div>
          <div class="root-item">{{item.code}}</div>
          <el-button type="primary" size="mini" @click="add(item.id)">新增一行</el-button>
        </div>
        <el-table v-if="item.msgList.length>0" :data="item.msgList" style="width: 100%" border>
          <el-table-column label="包名" prop="packageName"></el-table-column>
          <el-table-column label="信息" prop="message"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row,item.id)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- dialog -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="40%">
      <!-- add -->
      <el-form :model="addform" style="width:50%;" v-if="dialogTitle=='新增信息' ">
        <el-form-item label="packageName" label-width="120px">
          <el-input v-model="addform.packageName" readonly></el-input>
        </el-form-item>
        <el-form-item label="message" label-width="120px">
          <el-input v-model="addform.message"></el-input>
        </el-form-item>
        <el-form-item label="remark" label-width="120px">
          <el-input v-model="addform.remark"></el-input>
        </el-form-item>
        <el-form-item label="status" label-width="120px">
          <el-select v-model="addform.status" placeholder="请选择" style="width:100%">
            <el-option label="不可用" value="0"></el-option>
            <el-option label="可用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- update -->
      <el-form :model="form" style="width:50%;" v-if="dialogTitle=='更新信息' ">
        <el-form-item label="message" label-width="120px">
          <el-input v-model="form.message" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="remark" label-width="120px">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="status" label-width="120px">
          <el-select v-model="form.status" placeholder="请选择" style="width:100%">
            <el-option label="不可用" value="0"></el-option>
            <el-option label="可用" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../../api/http";
import { drawer } from "element-ui";
export default {
  components: {
    breadNav: () => import("../common/bread")
  },
  data() {
    return {
      nowLocation: ["包管理"],
      tableData: [],
      dialogTitle: "",
      dialogFormVisible: false,
      addform: {
        packageName: this.$route.query.packageName,
        message: "",
        remark: "",
        status: ""
      },
      form: {
        message: "",
        remark: "",
        status: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      http(
        "/appParameters/queryAllParamsInfoList",
        "get",
        this.$route.query
      ).then(res => {
        this.tableData = res.list;
      });
    },
    add(parentId) {
      this.dialogTitle = "新增信息";
      this.dialogFormVisible = !this.dialogFormVisible;
      //PID塞进form
      this.addform.parentId = parentId;
    },
    handleEdit(index, row, parentId) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.dialogTitle = "更新信息";
      let cloneRow = JSON.parse(JSON.stringify(row));
      cloneRow.parentId = parentId;
      Object.assign(this.form, cloneRow);
    },
    handleDelete(index, row) {
      this.$confirm("确认删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          http("/appParameters/deleteParamsMsg", "get", { id: row.id }).then(
            res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getList();
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    dialogOk() {
      if ((this.dialogTitle = "新增信息")) {
        if (!this.valite(this.addform)) {
          return;
        }
        http("/appParameters/addParamsMsg", "get", this.addform).then(res => {
          this.$message.success("新增子节点成功！");
          this.getList();
          this.dialogFormVisible = !this.dialogFormVisible;
        });
      } else if (this.dialogTitle == "更新信息") {
        http("/appParameters/updateParamsMsg", "post", this.form).then(res => {
          debugger;
        });
      }
    },
    valite(options) {
      for (let index in options) {
        if (options[index] == "") {
          this.$message.warning("表单内容不能为空");
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style lang="less" scoped>
.operate {
  margin-top: 10px;
}
.root {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .title {
    font-weight: bold;
  }
  div {
    margin-right: 20px;
    height: 40px;
    line-height: 40px;
  }
  .root-index {
    background: #66bff1;
    width: 60px;
    border-radius: 5px;
    text-align: center;
    color: white;
  }
  .root-item {
    width: 160px;
  }
}
</style>