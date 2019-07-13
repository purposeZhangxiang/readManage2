<template>
  <div>
    <breadNav :nowLocation="nowLocation"/>
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate">
      <el-form-item>
        <el-select v-model="state" placeholder="激活码状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查看</el-button>
        <el-button type="primary" @click="createCode">生成月卡</el-button>
        <el-button type="primary" @click="exportExcel">导出当页</el-button>
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
      <el-table-column prop="code" label="激活码" min-width="100" width="150"></el-table-column>
      <el-table-column
        prop="expireTime"
        label="到期时间"
        min-width="100"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
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
      nowLocation: ["激活码列表"],
      state: 0,
      typeOptions: [
        {
          label: "月卡激活码",
          value: 1
        },
        {
          label: "3日体验码",
          value: 2
        }
      ],
      options: [
        {
          label: "全部",
          value: 0
        },
        {
          label: "未激活",
          value: 1
        },
        {
          label: "已激活",
          value: 2
        }
      ],
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10, //当前页展示条数
      total: 10
    };
  },
  created() {
    this.getCodeList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit() {},
    handleDelete() {},
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCodeList(1, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCodeList(val,this.pageSize);
    },
    //============================
    getCodeList(currentPage, pageSize) {
      http("/manager/codeList", "post", {
        page: currentPage || 1,
        pageSize: pageSize || 10,
        type: 1, //月卡
        state: this.state
      }).then(res => {
        for (let item of res.list) {
          item.expireTime === null
            ? (item.expireTime = "未激活")
            : item.expireTime;
        }
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    search() {
      this.getCodeList();
    },
    createCode() {
      http("/manager/createCode", "post", { type: 1 }).then(res => {
        this.$message.success("已随机生成50个激活码");
        this.getCodeList();
      });
    },
    exportExcel() {
      let obj = {
        page: this.currentPage,
        pageSize: this.pageSize,
        type: 1,
        state: this.state
      };
      http("/file/exportCode", "get", obj, "blob");
    },
    deleteSome() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请勾选要删除的设备");
      } else {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          //整理出 要删除的设备
          let delcodes = [];
          for (let val of this.multipleSelection) {
            delcodes.push(val.code);
          }
          let codes = { codes: delcodes.join(",") };
          http("/manager/delCodes", "get", codes).then(res => {
            this.$message.success("删除成功");
            this.getCodeList();
          });
        });
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
</style>

