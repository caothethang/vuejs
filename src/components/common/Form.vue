<template>
  <div class="form">
    <div class="wrapper">
      <div class="form__data">
        <div class="form__title">
          <span class="form__title_text">{{ labelForm }}</span>
          <span class="form__title_close" @click="closeFormDetail"></span>
        </div>
        <div class="form__data_input">
          <div
            class="
              input__id_shop
              input__field_text
              input__field_info
              input__field_error
            "
          >
            <label for="id_shop"
              >Mã cửa hàng <span class="required">*</span></label
            >
            <input
              id="id_shop"
              class="input"
              type="text"
              name="id_shop"
              ref="id_shop"
              v-model="store.storeCode"
              v-focus
              @blur="checkValidIdShop"
              @focus="focusToIdInput"
              :class="{ error: !isIdShopValid }"
              tabindex="1"
            />
            <span class="tooltiptext" v-if="isIdShopValid"
              >Mã cửa hàng là mã của cửa hàng bạn muốn quản lý trên hệ thống của
              bạn,phân biệt với các cửa hàng khác</span
            >
            <span class="error_detail" v-else>Dữ liệu không hợp lệ</span>
          </div>
          <div
            class="
              input__name_shop
              input__field_text
              input__field_info
              input__field_error
            "
          >
            <label for="name_shop"
              >Tên cửa hàng <span class="required">*</span></label
            >
            <input
              class="input"
              type="text"
              name="name_shop"
              ref="name_shop"
              v-model="store.storeName"
              @blur="checkValidNameShop"
              @focus="focusToNameInput"
              :class="{ error: !isNameShopValid }"
              tabindex="2"
            />
            <span class="tooltiptext" v-if="isNameShopValid"
              >Tên cửa hàng là Tên của cửa hàng bạn muốn quản lý trên hệ thống
              của bạn,phân biệt với các cửa hàng khác</span
            >
            <span class="error_detail" v-else>Dữ liệu không hợp lệ</span>
          </div>
          <div
            class="
              input__address_shop
              input__field_text
              input__field_info
              input__field_error
            "
          >
            <label for="address_shop"
              >Địa chỉ <span class="required">*</span></label
            >
            <textarea
              name="address_shop"
              id=""
              class="input text_area input__field_error"
              :class="{ error: !isAddressShopValid }"
              ref="address_shop"
              v-model="store.address"
              @blur="checkValidAddressShop"
              @focus="focusToAddressInput"
              tabindex="3"
            ></textarea>
            <span class="tooltiptext" v-if="isAddressShopValid"
              >Địa chỉ cửa hàng là địa chỉ của cửa hàng bạn muốn quản lý trên hệ
              thống của bạn</span
            >
            <span class="error_detail" v-else>Dữ liệu không hợp lệ</span>
          </div>
          <div class="input__field_text">
            <div class="input__phone_shop input__field_text">
              <label for="phone_shop">Số điện thoại</label>
              <input
                class="input phone_shop"
                type="text"
                name="phone_shop"
                ref="phone_shop"
                v-model="store.phoneNumber"
                tabindex="4"
              />
            </div>
            <div class="input__tax_code_shop input__field_text">
              <label for="tax_code_shop ">Mã số thuế</label>
              <input
                class="input tax_code_shop"
                type="text"
                name="tax_code_shop"
                ref="tax_code_shop"
                v-model="store.storeTaxCode"
                tabindex="5"
              />
            </div>
          </div>
          <div class="input__field_text">
            <div
              class="input__country_shop style__autocomplete input__field_text"
            >
              <label for="">Quốc gia</label>
              <div class="autocomplete">
                <Autocomplete
                  :data="country"
                  :type="type_country"
                  :onUpdate="updateStatus"
                  :id="store.countryId"
                  @selectedCountry="getSelectedCountry($event)"
                  :tabValue="6"
                  :countryEdited="countryEdited"
                ></Autocomplete>
              </div>
            </div>
          </div>
          <div class="input__field_text">
            <div class="style__autocomplete input__field_text">
              <label for="">Tỉnh/Thành phố</label>
              <div class="autocomplete">
                <Autocomplete
                  :data="province"
                  :type="type_province"
                  :onUpdate="updateStatus"
                  :id="store.provinceId"
                  @selectedProvince="getSelectedProvince($event)"
                  :tabValue="7"
                  :provinceEdited="provinceEdited"
                ></Autocomplete>
              </div>
            </div>
            <div class="input__tax_code_shop input__field_text">
              <label for="style__autocomplete">Quận/Huyện</label>
              <div class="autocomplete">
                <Autocomplete
                  :hint="placeValue"
                  :data="district"
                  :type="type_district"
                  :onUpdate="updateStatus"
                  :id="store.districtId"
                  @selectedDistrict="getSelectedDistrict($event)"
                  :tabValue="8"
                  :districtEdited="districtEdited"
                ></Autocomplete>
              </div>
            </div>
          </div>
          <div class="input__field_text">
            <div class="style__autocomplete input__field_text">
              <label for="">Phường/Xã</label>
              <div class="autocomplete">
                <Autocomplete
                  :hint="placeValue"
                  :type="type_ward"
                  :data="ward"
                  :onUpdate="updateStatus"
                  :id="store.wardId"
                  @selectedWard="getSelectedWard($event)"
                  :tabValue="9"
                  :wardEdited="wardEdited"
                ></Autocomplete>
              </div>
            </div>
            <div
              class="style__autocomplete input__street_shop input__field_text"
            >
              <label for="">Đường phố</label>
              <input
                class="input street_shop"
                type="text"
                name="street_shop"
                ref="street_shop"
                v-model="store.street"
                tabindex="10"
              />
            </div>
          </div>
          <div class="input__field_text" v-if="isFormUpdate">
            <div class="status__checkbox">
              <input type="checkbox" name="" id="" v-model="store.status">  Ngừng hoạt động
            </div>
          </div>
        </div>
        <div class="form__footer">
          <div class="form__action">
            <div
              class="form__action_help"
              tabindex="14"
              @keydown.tab.prevent="focusIdForm"
            >
              <div class="icon_help"></div>
              <span>Trợ giúp</span>
            </div>
            <div class="form__btn">
              <div
                class="form__action_button"
                @click="updateStore"
                @keydown.enter.prevent="updateStore"
              >
                <a class="btn_save btn__style" tabindex="11">
                  <div class="icon_save icon__style"></div>
                  <span class="btn_save_title">Lưu</span>
                </a>
              </div>
              <div
                class="form__action_button"
                @click="createStore"
                @keydown.enter.prevent="createStore"
              >
                <a class="btn_create btn__style" tabindex="12">
                  <div class="icon_create icon__style"></div>
                  <span>Lưu và thêm mới</span>
                </a>
              </div>
              <div
                class="form__action_button btn_cancel"
                @click="closeFormDetail"
              >
                <a class="btn_cancel btn__style" tabindex="13">
                  <div class="icon_cancel icon__style"></div>
                  <span>Hủy bỏ</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Autocomplete from "./Autocomplete.vue";
import Swal from "sweetalert2";
import bus from "../../main.js";
const axios = require("axios");
export default {
  name: "Form",
  props: {
    data: Object,
    isFormUpdate: Boolean,
  },
  components: {
    Autocomplete,
  },
  created() {
    if (this.isFormUpdate) {
      this.store = { ...this.data };
      console.log(this.store);
      this.labelForm = "Cập nhật cửa hàng";
      this.getListCountry();
      this.getCountryByID();
      this.getProvinceByID();
      this.getDistrictByID();
      this.getWardByID();
      this.getListProvince();
      this.getListDistrict();
      this.getListWard();
    } else {
      this.store = {};
      this.getListCountry();
    }
  },
  directives: {
    focus: {
      /* directive definition
       *  CreateBy : CTTHANG(17/06/2021)
       */
      inserted: function (el) {
        el.focus();
      },
    },
  },
  data() {
    return {
      store: {},
      isIdShopValid: true,
      isNameShopValid: true,
      isAddressShopValid: true,
      placeValue: "Nhập để tìm kiếm",
      country: [],
      province: [],
      district: [],
      ward: [],
      // phân biệt autocomplete
      type_country: "selectedCountry",
      type_province: "selectedProvince",
      type_district: "selectedDistrict",
      type_ward: "selectedWard",
      updateStatus: false,
      labelForm: "Thêm mới cửa hàng",
      isAlertOnServices: false,
      // dữ liệu edit
      countryEdited: null,
      provinceEdited: null,
      districtEdited: null,
      wardEdited: null,
    };
  },
  /**
   * methods
   * CreatedBy : CTTHANG(15/06/2021)
   */
  methods: {
    /**
     * Đóng form
     * CreatedBy : CTTHANG(15/06/2021)
     */
    closeFormDetail() {
      this.$emit("closeFormDetail");
    },
    /**
     * Kiểm tra hợp lệ cho mã cửa hàng
     * CreateBy : CTTHANG(16/06/2021)
     */
    checkValidIdShop() {
      if (!this.store.storeCode) {
        this.$refs.id_shop.classList.add("error");
        this.isIdShopValid = false;
      } else {
        this.isIdShopValid = true;
        this.$refs.id_shop.classList.remove("error");
      }
    },
    /**
     * Kiểm tra hợp lệ , rỗng cho tên cửa hàng , nếu không hợp lệ trả về false
     * CreatedBy : CTTHANG(18/06/2020)
     */
    checkValidNameShop() {
      if (!this.store.storeName) {
        this.$refs.name_shop.classList.add("error");
        this.isNameShopValid = false;
      } else {
        this.isNameShopValid = true;
        this.$refs.name_shop.classList.remove("error");
      }
    },
    /**
     * Kiểm tra hợp lệ cho địa chỉ
     * CreateBy : CTTHANG(17/06/2021)
     */
    checkValidAddressShop() {
      if (!this.store.address) {
        this.$refs.address_shop.classList.add("error");
        this.isAddressShopValid = false;
      } else {
        this.isAddressShopValid = true;
        this.$refs.address_shop.classList.remove("error");
      }
    },
    /**
     * Focus vào input id
     * CreateBy : CTTHANG(16/06/2021)
     */
    focusToIdInput() {
      this.isIdShopValid = true;
    },
    /**
     * Focus vào input name
     * CreatedBy : CTTHANG(16/06/2021)
     */
    focusToNameInput() {
      this.isNameShopValid = true;
    },
    /**
     * Focus vào input address
     * CreateBy : CTTHANG(17/06/2021)
     */
    focusToAddressInput() {
      this.isAddressShopValid = true;
    },
    /**
     * lấy danh sách quốc gia
     * CreateBy : CTTHANG(17/06/2021)
     */
    async getListCountry() {
      var me = this;
      var countries = await axios
        .get("https://localhost:44306/api/country")
        .then(function (response) {
          me.country = response.data;
        })
        .catch(function (error) {});
    },
    /**
     * Lấy danh sách tỉnh/thành
     * CreateBy : CTTHANG(17/06/2021)
     */
    async getListProvince() {
      var me = this;
      let province = await axios
        .get(
          "https://localhost:44306/api/province/country/" + this.store.countryId
        )
        .then(function (response) {
          me.province = response.data;
        });
    },
    /**
     * lấy danh sách quận / huyện
     * CreateBy : CTTHANG(17/06/2021)
     */
    async getListDistrict() {
      var me = this;
      let res = await axios
        .get(
          "https://localhost:44306/api/district/province/" +
            this.store.provinceId
        )
        .then(function (response) {
          me.district = response.data;
        });
    },
    /**
     * Lấy danh sách xã / phường
     * CreateBy : CTTHANG(17/06/2021)
     */
    async getListWard() {
      var me = this;
      let res = await axios
        .get(
          "https://localhost:44306/api/ward/district/" + this.store.districtId
        )
        .then(function (response) {
          me.ward = response.data;
        });
    },
    /**
     * lấy quốc gia đã chọn
     * CreateBy : CTTHANG(17/06/2021)
     */
    getSelectedCountry(country) {
      this.store.countryId = country.countryId;
      this.getListProvince();
    },
    /**
     * lấy tỉnh/thành đã chọn
     * CreateBy : CTTHANG(17/06/2021)
     */
    getSelectedProvince(province) {
      this.store.provinceId = province.provinceId;
      this.getListDistrict();
    },
    /**
     * lấy quận huyện đã chọn
     * CreateBy : CTTHANG(17/06/2021)
     */
    getSelectedDistrict(district) {
      this.store.districtId = district.districtId;
      this.getListWard();
    },
    /**
     * lấy xã phường đã chọn
     * CreateBy : CTTHANG(17/06/2021)
     */
    getSelectedWard(ward) {
      this.store.wardId = ward.wardId;
    },
    async getCountryByID() {
      var me = this;
      let res = await axios
        .get("https://localhost:44306/api/country/" + this.store.countryId)
        .then(function (response) {
          me.countryEdited = response.data;
        });
    },
    /**
     * Lấy tỉnh/thành theo Id
     * CreatedBy : CTTHANG(18/06/2021)
     */
    async getProvinceByID() {
      var me = this;
      let res = await axios
        .get("https://localhost:44306/api/province/" + this.store.provinceId)
        .then(function (response) {
          me.provinceEdited = response.data;
        });
    },
    /**
     * Lấy huyện theo id
     * CreateBy : CTTHANG(18/06/2021)
     */
    async getDistrictByID() {
      var me = this;
      let res = await axios
        .get("https://localhost:44306/api/district/" + this.store.districtId)
        .then(function (response) {
          me.districtEdited = response.data;
        });
    },
    /**
     * Lấy xã/phường theo ID
     * CreatedBy : CTTHANG(18/06/2021)
     */
    async getWardByID() {
      var me = this;
      let res = await axios
        .get("https://localhost:44306/api/ward/" + this.store.wardId)
        .then(function (response) {
          me.wardEdited = response.data;
        });
    },
    /**
     * quay lại input id
     * CreateBy : CTTHANG(17/06/2020)
     */
    focusIdForm(e) {
      this.$refs.id_shop.focus();
    },
    /**
     * Thêm mới cửa hàng
     * CreateBy : CTTHANG(17/06/2020)
     */
    async createStore() {
      var me = this;
      me.checkValidIdShop();
      me.checkValidNameShop();
      me.checkValidAddressShop();
      let result = await axios
        .post("https://localhost:44306/api/store", me.store)
        .then(async function (res) {
          let listError = await Object(res.data)._Messages;
          if (listError.length) {
            bus.$emit("showDialogError", listError);
          } else {
            Swal.fire({
              icon: "success",
              title: "Tạo mới cửa hàng thành công",
              showConfirmButton: false,
              timer: 1000,
            });
            me.closeFormDetail();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /**
     * Cập nhật cửa hàng
     * CreatedBy : CTTHANG(18/06/2021)
     */
    async updateStore() {
      var me = this;
      me.checkValidIdShop();
      me.checkValidNameShop();
      me.checkValidAddressShop();
      if(me.store.status){
        me.store.status = 1
      }
      else{
        me.store.status = 0
      }
      var res = await axios
        .put(`https://localhost:44306/api/store/${me.store.storeId}`, me.store)
        .then(function (res) {
          let listError = Object(res.data)._Messages;
          if (listError.length) {
            bus.$emit("showDialogError", listError);
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Cập nhật cửa hàng thành công",
              showConfirmButton: false,
              timer: 1000,
            });
            me.closeFormDetail();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.form {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
}
.required {
  color: #cf4c35;
}
.error {
  position: relative;
  border-color: #cf4c35 !important;
  background-image: url("../../assets/icon/error.png");
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 50%;
}
.form .wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
}
.form .form__data {
  position: relative;
  width: 600px;
  height: 520px;
  background-color: #fff;
  margin: auto;
}
.form .form__data .form__title {
  width: 100%;
  height: 42px;
  background-color: #f0f0f0;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
}
.form .form__data .form__title .form__title_text {
  font-size: 16px;
  font-weight: 700;
}
.form__title_close {
  width: 22px;
  background-image: url("../../assets/icon/close_form.png");
  background-position: center;
  cursor: pointer;
}
.form__data_input {
  padding: 16px 16px 0px;
}
.input__field_text {
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.form__data_input .input {
  height: 32px;
  width: 457px;
  padding: 5px 10px 4px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #d0d0d0;
}
.form__data_input .input:focus {
  border: 1px solid #026b97 !important;
  background-image: none;
}
.form__data_input label {
  font-size: 13px;
}
.input__address_shop {
  height: 80px;
  align-items: flex-start;
  position: relative;
}
.input__field_info {
  position: relative;
}
.input__name_shop {
  position: relative;
}
/* tooltip */

.input__field_info .tooltiptext {
  visibility: hidden;
  width: 360px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 102%;
  font-size: 13px;
}

.input__field_info .tooltiptext::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}
.input__field_info:hover .tooltiptext {
  visibility: visible;
}
.input__field_error {
  position: relative;
}
.input__field_error .error_detail {
  visibility: hidden;
  width: 360px;
  background-color: #cf4c35;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 102%;
  font-size: 13px;
}
.input__field_error .error_detail::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #cf4c35 transparent transparent;
}
.input__field_error:hover .error_detail {
  visibility: visible;
}
/* tooltip */
.input__address_shop .input {
  height: 80px;
}
.text_area {
  resize: none;
}
.input__phone_shop {
  width: 274px;
}
.input__tax_code_shop {
  width: 274px;
}
.phone_shop,
.tax_code_shop {
  width: 162px !important;
}
.autocomplete {
  width: 162px;
}
.style__autocomplete {
  width: 274px;
}
.input__street_shop .street_shop {
  width: 162px !important;
}
/* form_action */
.form__footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 64px;
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
}
.form__footer .form__action {
  width: 100%;
  display: flex;
  height: 35px;
  justify-content: space-between;
  padding: 0 10px;
}
.form__action_help {
  width: auto;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #026b97;
  cursor: pointer;
  font-weight: 600;
}
.form__action_help .icon_help {
  height: 16px;
  width: 16px;
  margin-left: 5px;
  background-image: url("../../assets/icon/icon_help.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
  margin-right: 8px;
}
.form__btn {
  display: flex;
  height: 35px;
}
.form__btn .form__action_button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-right: 10px;
}
.btn__style {
  width: auto;
  display: flex;
  align-items: center;
  height: 35px;
  padding: 7px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.btn_save {
  background: #026b97;
  color: #fff;
}
.btn_save:hover {
  background-color: #0088c1;
  color: #fff;
}
.btn_create {
  border-radius: 4px;
  border: 1px solid #026b97;
  color: #026b97;
}
.btn_create:hover {
  border: 1px solid #0088c1;
  color: #0088c1;
}
.btn_cancel {
  color: #026b97;
}
.btn_cancel:hover {
  color: #0088c1;
}
.icon__style {
  height: 16px;
  width: 16px;
  margin-right: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
}
.icon_save {
  background-image: url("../../assets/icon/save-white.png");
}
.icon_create {
  background-image: url("../../assets/icon/add-blue.png");
}
.icon_cancel {
  background-image: url("../../assets/icon/cancel-blue.png");
}
.btn_save_title {
  padding: 0px 5px;
}
.btn_save:focus {
  outline: none;
  background: #00577b !important;
}
.btn_create:focus {
  outline: none;
  color: #757575;
}
.btn_cancel:focus {
  outline: none;
}
.form__action_help:focus {
  outline: none;
  background-color: #d0d0d0;
  padding-right: 10px;
}
.status__checkbox{
  display: flex;
  align-items: center;
  font-size: 13px;
  padding-left: 110px;
}
</style>