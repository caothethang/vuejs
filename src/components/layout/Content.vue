/* eslint-disable */
<template>
  <div class="content">
    <div class="toolbar">
      <div class="toolbar__item btn_add" @click="showFormAdd">
        <div class="toolbar__add_icon toolbar_icon"></div>
        <div class="toolbar__item_text">Thêm mới</div>
      </div>
      <div class="toolbar__item btn_copy" @click="showFormCopy">
        <div class="toolbar__copy_icon toolbar_icon"></div>
        <div class="toolbar__item_text">Nhân bản</div>
      </div>
      <div class="toolbar__item btn_update" @click="showFormUpdate">
        <div class="toolbar__update_icon toolbar_icon"></div>
        <div class="toolbar__item_text">Sửa</div>
      </div>
      <div class="toolbar__item" @click="deleteShopAlert">
        <div class="toolbar__delete_icon toolbar_icon"></div>
        <div class="toolbar__item_text">Xóa</div>
      </div>
      <div class="toolbar__item" @click="loadDataFromDB">
        <div class="toolbar__load_icon toolbar_icon"></div>
        <div class="toolbar__item_text">Nạp</div>
      </div>
    </div>
    <div class="data__table">
      <table>
        <thead>
          <tr>
            <th class="th__id_shop">
              <div class="th__id_shop_title th___title">Mã cửa hàng</div>
              <div class="th__id_shop_filter filter__column">
                <span class="filter__icon">=</span>
                <input
                  class="filter__input"
                  type="text"
                  name=""
                  id=""
                  tabindex="-1"
                  v-model="storeCodeFilter"
                />
              </div>
            </th>
            <th class="th__name_shop">
              <div class="th__name_shop_title th___title">Tên cửa hàng</div>
              <div class="th__name_shop_filter filter__column">
                <span class="filter__icon">=</span>
                <input
                  class="filter__input"
                  type="text"
                  name=""
                  id=""
                  tabindex="-1"
                  v-model="storeNameFilter"
                />
              </div>
            </th>
            <th class="th__address_shop">
              <div class="th__address_shop_title th___title">Địa chỉ</div>
              <div class="th__address_shop_filter filter__column">
                <span class="filter__icon">=</span>
                <input
                  class="filter__input"
                  type="text"
                  name=""
                  id=""
                  tabindex="-1"
                  v-model="addressFilter"
                />
              </div>
            </th>
            <th class="th__phone_shop">
              <div class="th__phone_shop_title th___title">Số điện thoại</div>
              <div class="th__phone_shop_filter filter__column">
                <span class="filter__icon">=</span>
                <input
                  class="filter__input"
                  type="text"
                  name=""
                  id=""
                  tabindex="-1"
                  v-model="phoneFilter"
                />
              </div>
            </th>
            <th class="th__status_shop">
              <div class="th__status_shop_title th___title">Trạng thái</div>
              <div class="th__status_shop_filter filter__column">
                <span class="filter__icon">=</span>
                <input
                  class="filter__input"
                  type="text"
                  name=""
                  id=""
                  tabindex="-1"
                  v-model="statusFilter"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in listShop" :key="index">
          <tr
            @click="setSelectedIndex(item, index)"
            :class="{ selected: storeCodeSelected == item.storeCode }"
          >
            <td>{{ item.storeCode }}</td>
            <td>{{ item.storeName }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>
              {{ item.status == 0 ? "Đang hoạt động" : "Ngừng hoạt động" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <DeleteDialog
        v-if="isAlertOnDelete"
        @closeAlert="closeAlertForm"
        :store="storeSelected"
      />
      <Form
        v-if="isShowFormDetail"
        @closeFormDetail="closeFormDetail"
        :data="storeSelected"
        :isFormUpdate="update"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
/* eslint-disable */
import DeleteDialog from "../common/DeleteDialog.vue";
import Form from "../common/Form.vue";
import bus from "../../main";
export default {
  name: "Content",
  components: {
    DeleteDialog,
    Form,
  },
  data() {
    return {
      isShowFormDetail: false,
      isAlertOnDelete: false,
      listShop: [],
      storeSelected: {},
      storeCodeSelected: null,
      update: false,
      //filter value
      storeCodeFilter: null,
      storeNameFilter: null,
      addressFilter: null,
      phoneFilter: null,
      statusFilter: null,
    };
  },
  created: function () {
    this.loadDataFromDB();
    bus.$on("getListStoreByPaging", this.getStoreByPaging);
  },
  watch: {
    storeCodeFilter() {},
    storeNameFilter() {},
    addressFilter() {},
    phoneFilter() {},
    statusFilter() {},
  },
  methods: {
    /**
     * Hiển thị form thêm mới , thông tin
     * CreatedBy : CTTHANG(15/06/2021)
     */
    showFormAdd() {
      this.isShowFormDetail = true;
      this.storeSelected = {};
      this.update = false;
    },
    showFormCopy() {
      this.isShowFormDetail = true;
    },
    showFormUpdate() {
      this.isShowFormDetail = true;
      this.update = true;
    },
    /**
     * Đóng form thêm mới , thông tin
     * CreatedBy : CTTHANG(15/06/2021)
     */
    closeFormDetail() {
      this.isShowFormDetail = false;
      this.loadDataFromDB();
    },
    /**
     * Đóng alert xóa
     * CreatedBy : CTTHANG(15/06/2021)
     */
    closeAlertForm() {
      this.isAlertOnDelete = false;
      this.loadDataFromDB();
    },
    /**
     * Hiển thị alert xóa
     * CreatedBy : CTTHANG(15/06/2021)
     */
    deleteShopAlert() {
      this.isAlertOnDelete = true;
    },
    /**
     * sự kiện khi chọn dòng
     * CreateBy : CTTHANG(17/06/2020)
     */
    setSelectedIndex(item, index) {
      this.storeSelected = item;
      this.storeCodeSelected = item.storeCode;
    },
    /**
     * Load data
     * CreateBy : CTTHANG(17/06/2020)
     */
    async loadDataFromDB() {
      var me = this;
      var res = await axios
        .get("https://localhost:44306/api/store")
        .then(function (response) {
          console.log(response.data);
          me.listShop = response.data;
        });
    },
    /**
     * Lấy danh sách cửa hàng theo phân trang
     * CreatedBy : CTTHANG(18/06/2021)
     */
    async getStoreByPaging(pageSize, pageIndex) {
      var me = this;
      console.log(pageSize, pageIndex);
      var res = await axios
        .get(`https://localhost:44306/api/store/${pageIndex}/${pageSize}`)
        .then(function (response) {
          me.listShop = response.data.listStores;
        });
    },
    /**
     * Lọc dữ liệu theo các trường
     */
    async getDataByFilter() {
      var me = this;
      var res = await axios
        .get(
          `https://localhost:44306/api/store/filter/${this.storeCodeFilter}/${this.storeNameFilter}/${this.addressFilter}/${this.phoneFilter}/${this.statusFilter}`
        )
        .then((result) => {
          console.log(result.data)
        })
        .catch((err) => {
          
        });
    },
  },
};
</script>
<style scoped>
.content {
  flex: 1;
  background-color: #e5e6eb;
  padding: 10px 10px 0px 10px;
  height: calc(100vh - 114px);
}
/* toolbar */
.toolbar {
  background-color: #2b3173;
  display: flex;
  align-items: center;
  height: 36px;
  font-size: 13px;
}
.toolbar .toolbar__item {
  display: flex;
  align-items: center;
  padding: 0px 7px;
  height: 36px;
  border-right: 1px solid #1e235a;
}
.toolbar .toolbar__item:hover {
  cursor: pointer;
  background-color: #6b6f9d;
}
.toolbar .toolbar__item:last-child {
  border-right: none;
}
.toolbar__item .toolbar__item_text {
  color: #fff;
}
.toolbar_icon {
  width: 16px;
  height: 16px;
  margin-right: 7px;
}
.toolbar__add_icon {
  background-image: url("../../assets/icon/ThemMoi.png");
  background-position: center;
  background-repeat: no-repeat;
}
.toolbar__update_icon {
  background-image: url("../../assets/icon/Sua.png");
  background-position: center;
  background-repeat: no-repeat;
}
.toolbar__delete_icon {
  background-image: url("../../assets/icon/Xoa.png");
  background-position: center;
  background-repeat: no-repeat;
}
.toolbar__copy_icon {
  background-image: url("../../assets/icon/NhanBan.png");
  background-position: center;
  background-repeat: no-repeat;
}
.toolbar__load_icon {
  background-image: url("../../assets/icon/reload.png");
  background-position: center;
  background-repeat: no-repeat;
}
/* table */
.data__table {
  width: 100%;
  background: #fff;
  overflow: scroll;
  max-height: calc(100% - 36px);
}

.data__table table {
  text-align: left;
  border-collapse: collapse;
  width: 100%;
  border-spacing: 0 !important;
}
.data__table table tbody:nth-of-type(even) {
  background-color: #f6f6f6 !important;
}
.data__table table tr {
  font-size: 13px;
  border: 1px solid #d0d0d0;
  border-top: none;
}
.data__table table tbody tr:hover {
  background-color: #eaeff4;
}
/* .data__table table thead tr {
  height: 64px !important;
} */

.data__table table thead {
  position: sticky;
  top: 0;
}
.data__table table th {
  background-color: #eaeff4;
  text-align: center;
  border-right: 1px solid #d0d0d0 !important;
  box-sizing: border-box;
}
.data__table table th > div {
  width: 100%;
}
.data__table table th .filter__column {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.filter__column span {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  border: 1px solid #d0d0d0;
  margin-left: 1px;
}
.filter__column input {
  width: calc(100% - 32px);
  height: 32px;
  background-color: #fff;
  border: 1px solid #d0d0d0;
  margin-right: 2px;
}
.filter__column input:focus {
  outline: none;
  border: 1px solid #d0d0d0;
}
.data__table table td {
  height: 32px;
  border-right: 1px solid #d0d0d0;
  text-align: left;
  padding: 7px 10px 6px;
}
.data__table table .th__id_shop {
  width: 160px;
  min-width: 160px;
  font-weight: 700;
  border: #fff;
}
.th___title {
  height: 32px;
  line-height: 32px;
}
.data__table table .th__name_shop {
  width: 250px;
  font-weight: 700;
  min-width: 250px;
  border: #fff;
}
.data__table table .th__address_shop {
  min-width: 300px;
  font-weight: 700;
  border: #fff;
}
.data__table table .th__phone_shop {
  width: 130px;
  min-width: 130px;
  font-weight: 700;
  border: #fff;
}
.data__table table .th__status_shop {
  width: 150px;
  min-width: 150px;
  font-weight: 700;
  border: #fff;
}
.data__table::-webkit-scrollbar {
  display: none;
}
.selected {
  background-color: #e2e4f1 !important;
}
</style>