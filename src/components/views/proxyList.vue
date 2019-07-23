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
      <el-table-column prop="canOperatedCompany" label="可生成企页用户总数" min-width="100" width="150"></el-table-column>
      <el-table-column prop="canOperatedCode" label="可生成激活码总数" min-width="100" width="150"></el-table-column>
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
      <el-form :model="webform">
        <el-col :span="12">
          <el-form-item label="代理姓名" label-width="120px">
            <el-input v-model="proxyform.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="登陆账号" label-width="120px">
            <el-input v-model="proxyform.account" autocomplete="off"></el-input>
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

        <!-- <el-form-item label="已购激活码数" label-width="120px">
          <el-input v-model="proxyform.password" autocomplete="off"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="是否有效" label-width="120px">
          <el-select v-model="proxyform.status" placeholder="请选择">
            <el-option label="无效" value="0"></el-option>
            <el-option label="有效" value="1"></el-option>
            <el-option label="默认有效" value="2"></el-option>
          </el-select>
        </el-form-item>-->
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
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      proxyTitle: "",
      proxyDialog: false,
      proxyform: {
        name: "",
        phone: "",
        account: "",
        password: "123456"
      }
    };
  },
  methods: {
    addProxy() {
      this.proxyTitle = "新增代理";
      this.proxyDialog = true;
    },
    deleteSome() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    proxySure() {}
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
