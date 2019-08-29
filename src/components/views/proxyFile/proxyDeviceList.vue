<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
    <!-- 操作栏 -->
    <el-form :inline="true" :model="formInline" class="operate">
      <el-form-item>
        <el-input-number v-model="formInline.size" :min="0" :max="500" label="新增设备数量"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMore">扩容设备</el-button>
        <el-button type="primary" @click="exportExcel">导出</el-button>
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
    </el-table>
    <!-- 分页 -->
    <!-- <div class="page">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>-->
  </div>
</template>

<script>
import { http } from "../../../api/http";
import global from "../../../util/globalFunction.js";
export default {
  components: {
    breadNav: () => import("../../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["代理设备列表"],
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
    handleCurrentChange(val) {
      this.getDeviceList(val);
    },
    getDeviceList() {
      http("/manager/deviceList", "post", this.$route.query).then(res => {
        this.tableData = res;
        this.total = res.length;
      });
    },
    addMore() {
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

