<template>
  <div>
    <breadNav :nowLocation="nowLocation" />
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
        <el-select v-model="rootState" placeholder="root状态">
          <el-option
            v-for="item in rootOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查看</el-button>
        <el-button type="primary" @click="exportExcel">导出</el-button>
        <el-button type="primary" @click="createCode">生成季卡</el-button>
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
    <!-- 导出功能弹出层 -->
    <el-dialog title="导出" :visible.sync="exportdiaVisible" width="30%">
      <el-form :model="exportform">
        <el-form-item label="激活状态" label-width="200">
          <el-select v-model="exportform.jhzt" placeholder="全部 /已激活/ 未激活">
            <el-option label="全部" value="all"></el-option>
            <el-option label="已激活" value="jh"></el-option>
            <el-option label="未激活" value="wjh"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="root状态" label-width="200">
          <el-select v-model="exportform.root" placeholder="非ROOT /ROOT">
            <el-option label="非root" value="froot"></el-option>
            <el-option label="root" value="root"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导出状态" label-width="200">
          <el-select v-model="exportform.quan" placeholder="当前页 /所有">
            <el-option label="当前页" value="current"></el-option>
            <el-option label="所有" value="all"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportdiaVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportSuc">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生成季卡弹出层 -->
    <el-dialog title="生成季卡激活码" :visible.sync="seasonVisible" width="40%">
      <el-form :model="seasonform">
        <el-form-item label="root状态" label-width="200">
          <el-select v-model="seasonform.root" placeholder="非ROOT /ROOT">
            <el-option label="非root" value="froot"></el-option>
            <el-option label="root" value="root"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能开关">
          <!-- <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
          </el-checkbox-group>-->
          <el-checkbox-group v-model="gnkg" size="mini">
            <el-checkbox-button v-for="city in cityOptions" :label="city" :key="city">{{city}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="生成数量" label-width="200">
          <el-input-number v-model="seasonform.seasonNum" :min="1" :max="500"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="seasonVisible = false">取 消</el-button>
        <el-button type="primary" @click="seasonSuc">确 定</el-button>
      </span>
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
      nowLocation: ["季卡列表"],
      state: 0, //
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
      rootState: "非root",
      rootOptions: [
        {
          label: "非root",
          value: "非root"
        },
        {
          label: "root",
          value: "root"
        }
      ],
      exportState: "当页",
      exportOption: [
        {
          label: "当页",
          value: "当页"
        }
      ],
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10, //当前页展示条数
      total: 10,
      /**导出模态框数据 */
      exportdiaVisible: false,
      exportform: {
        jhzt: "all",
        root: "非root",
        quan: "current"
      },
      /**生成月卡模态框数据 */
      seasonVisible: false,
      seasonform: {
        root: "非root",
        seasonNum: 0
      },
      checkList: {},
      gnkg: [],
      cityOptions:['功能一', '功能二', '功能三', '功能四','功能五', '功能六', '功能七', '功能八']
    };
  },
  created() {
    this.getSeasonList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit() {},
    handleDelete() {},
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSeasonList(1, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSeasonList(val, this.pageSize);
    },
    //============================
    getSeasonList(currentPage = 1, pageSize = 10) {
      http("/manager/codeList", "post", {
        page: currentPage,
        pageSize: pageSize,
        type: 1, //月卡
        state: this.state //激活状态
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
      this.getSeasonList();
    },
    createCode() {
      this.seasonVisible = !this.seasonVisible;
      // http("/manager/createCode", "post", { type: 1 }).then(res => {
      //   this.$message.success("已随机生成50个激活码");
      //   this.getSeasonList();
      // });
    },
    exportExcel() {
      this.exportdiaVisible = !this.exportdiaVisible;
      // let obj = {
      //   page: this.currentPage,
      //   pageSize: this.pageSize,
      //   type: 1,
      //   state: this.state
      // };
      // http("/file/exportCode", "get", obj, "blob");
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
            this.getSeasonList();
          });
        });
      }
    },
    exportSuc() {},
    seasonSuc() {
      console.log(this.gnkg)
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

