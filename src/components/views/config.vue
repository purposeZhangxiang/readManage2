<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate">
      <el-form-item>
        <el-button type="primary" @click="add">新增阅读配置</el-button>
        <el-button type="primary" @click="cloudUpdate">云更新配置管理</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark">
      <el-table-column
        v-for="(item,index) in thead"
        :key="index"
        :label="item.label"
        :prop="item.prop"
      ></el-table-column>
      <el-table-column label="操作" width="280px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handlePackage(scope.$index, scope.row)">动作配置</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改阅读配置</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" @close="dialogClose">
      <el-form :model="dialogForm">
        <el-col :span="12">
          <el-form-item label="软件名称" label-width="140px">
            <el-input v-model="dialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="包名" label-width="140px">
            <el-input v-model="dialogForm.packageName"></el-input>
          </el-form-item>
          <el-form-item label="分类" label-width="140px">
            <el-select v-model="dialogForm.categery" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in kindOptions"
                :key="item.val"
                :label="item.label"
                :value="item.val"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阅读方案一" label-width="140px">
            <el-switch v-model="dialogForm.schema1" active-color="#13ce66"></el-switch>
          </el-form-item>
          <el-form-item label="阅读方案二" label-width="140px">
            <el-switch v-model="dialogForm.schema2" active-color="#13ce66"></el-switch>
          </el-form-item>
          <el-form-item label="是否推荐" label-width="140px">
            <el-switch v-model="dialogForm.favor" active-color="#13ce66"></el-switch>
          </el-form-item>
          <el-form-item label="主页刷新频率" label-width="140px">
            <el-input type="number" v-model="dialogForm.handleHomePageRefreashRate"></el-input>
          </el-form-item>
          <el-form-item label="版本号" label-width="140px">
            <el-input v-model="dialogForm.versionName"></el-input>
          </el-form-item>
          <el-form-item label="同步链接" label-width="140px">
            <el-input v-model="dialogForm.syncUrl"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="每日最大阅读量" label-width="140px">
            <el-input type="number" v-model="dialogForm.ondDayReadAmount"></el-input>
          </el-form-item>
          <el-form-item label="每次循环阅读篇数" label-width="140px">
            <el-input type="number" v-model="dialogForm.oneCycleReadAmount"></el-input>
          </el-form-item>
          <el-form-item label="每篇新闻阅读时间" label-width="140px">
            <el-input type="number" v-model="dialogForm.oneNewsReadTime" placeholder="单位(秒)"></el-input>
          </el-form-item>
          <el-form-item label="阅读滑动最小时间" label-width="140px">
            <el-input type="number" v-model="dialogForm.minSwipeInterval" placeholder="单位(秒)"></el-input>
          </el-form-item>
          <el-form-item label="阅读滑动最大时间" label-width="140px">
            <el-input type="number" v-model="dialogForm.maxSwipeInterval" placeholder="单位(秒)"></el-input>
          </el-form-item>
          <el-form-item label="领取时段奖励频率" label-width="140px">
            <el-input v-model="dialogForm.handleTimeWardRate"></el-input>
          </el-form-item>
          <el-form-item label="领取阅读奖励频率" label-width="140px">
            <el-input v-model="dialogForm.handleReadWardRate"></el-input>
          </el-form-item>
          <el-form-item label="提现间隔" label-width="140px">
            <el-input type="number" v-model="dialogForm.takeCashInteval"></el-input>
          </el-form-item>
          <el-form-item label="邀请码" label-width="140px">
            <el-input v-model="dialogForm.inventCode"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../../api/http.js";
export default {
  components: {
    breadNav: () => import("../common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["配置管理"],
      thead: [
        {
          label: "阅读软件",
          prop: "name"
        },
        {
          label: "分类",
          prop: "categery"
        },
        {
          label: "阅读方案一",
          prop: "schema1"
        },
        {
          label: "阅读方案二",
          prop: "schema2"
        },
        {
          label: "是否推荐",
          prop: "favor"
        },
        {
          label: "每天最大阅读量",
          prop: "ondDayReadAmount"
        }
      ],
      tableData: [],
      dialogFormVisible: false,
      dialogTitle: "",
      dialogForm: {
        name: "",
        categery: "",
        schema1: "0",
        schema2: "0",
        favor: false,
        ondDayReadAmount: 50,
        oneCycleReadAmount: 10,
        oneNewsReadTime: 30,
        handleTimeWardRate: 10,
        handleHomePageRefreashRate: 5,
        minSwipeInterval: 2,
        maxSwipeInterval: 5,
        packageName: "",
        handleReadWardRate: 0,
        //add8-30
        versionName: "00000000",
        syncUrl: "",
        takeCashInteval: 1,
        inventCode: ""
      },
      //分类options
      kindOptions: [
        {
          label: "news",
          val: "news"
        },
        {
          label: "video",
          val: "video"
        },
        {
          label: "other",
          val: "other"
        }
      ]
    };
  },
  created() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      http("/user/infoList", "post").then(res => {
        this.tableData = res;
      });
    },
    add() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.dialogTitle = "新增配置";
    },
    cloudUpdate() {
      this.$router.push({
        path: "/home/packageManage"
      });
    },
    handlePackage(index, row) {
      this.$router.push({
        path: "/home/samePackage",
        query: { packageName: row.packageName }
      });
    },
    handleEdit(idnex, row) {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.dialogTitle = "修改配置";
      Object.assign(this.dialogForm, row);
      if (row.favor === "1" || row.favor == "true") {
        this.dialogForm.favor = true;
      } else {
        this.dialogForm.favor = false;
      }
      if (row.schema1 == "1") {
        this.dialogForm.schema1 = true;
      } else {
        this.dialogForm.schema1 = false;
      }
      if (row.schema2 == "1") {
        this.dialogForm.schema2 = true;
      } else {
        this.dialogForm.schema2 = false;
      }
    },
    handleDelete(index, row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        http("/manager/deleteInfo", "post", { infoId: row.infoId }).then(
          res => {
            this.$message.success("删除成功");
            this.getConfig();
          }
        );
      });
    },
    ok() {
      //处理true--2  false--1
      if (this.dialogForm.favor) {
        this.dialogForm.favor = 1;
      } else {
        this.dialogForm.favor = 0;
      }

      if (this.dialogForm.schema1) {
        this.dialogForm.schema1 = 1;
      } else {
        this.dialogForm.schema1 = 0;
      }

      if (this.dialogForm.schema2) {
        this.dialogForm.schema2 = 1;
      } else {
        this.dialogForm.schema2 = 0;
      }

      if (this.dialogTitle == "新增配置") {
        //add 删除多余参数
        delete this.dialogForm.infoId;
        http("/manager/addInfo", "post", this.dialogForm).then(res => {
          this.$message.success("添加成功");
          this.getConfig();
        });
      } else {
        //编辑更新
        http("/manager/updateInfo", "post", this.dialogForm).then(res => {
          this.$message.success("更新配置成功");
          this.getConfig();
        });
      }
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    //关闭清除表单值
    dialogClose() {
      this.claerForm();
    },
    claerForm() {
      for (let index in this.dialogForm) {
        this.dialogForm[index] = "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.operate {
  margin-top: 10px;
}
</style>

