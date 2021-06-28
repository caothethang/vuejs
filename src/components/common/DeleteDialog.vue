/* eslint-disable */
<template>
  <div class="form">
    <div class="wrapper">
      <div class="form__data">
        <div class="form__title">
          <span class="form__title_text">Xóa dữ liệu</span>
          <span class="form__title_close" @click="closeForm"></span>
        </div>
        <div class="form__dialog">
          <div class="dialog__icon"></div>
          <div class="dialog__message">
            Bạn có chắc chắc muốn xóa
            <strong>{{ storeSelected.storeName }}</strong> khỏi danh sách trong
            cửa hàng
          </div>
        </div>
        <div class="form__footer">
          <div class="form__action">
            <div class="form__btn">
              <div class="form__action_button" @click="deleteStoreSelected">
                <a class="btn_delete btn__style">
                  <div class="icon_delete icon__style"></div>
                  <span>Xóa</span>
                </a>
              </div>
              <div class="form__action_button btn_cancel" @click="closeForm">
                <a class="btn_cancel btn__style" @click="closeForm">
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
const axios = require("axios");
import Swal from "sweetalert2";
/* eslint-disable */
export default {
  props: {
    store: Object,
  },
  data() {
    return {
      storeSelected: this.store,
    };
  },
  /**
   * Method
   * CreatedBy : CTTHANG(15/06/2021)
   */
  methods: {
    /**
     * Close alert form
     */
    closeForm() {
      this.$emit("closeAlert");
    },
    /**
     * Xóa cửa hàng
     * CreateBy : CTTHANG(18/06/2020)
     */
    async deleteStoreSelected() {
      var me = this;
      let nameStore = me.storeSelected.storeName
      var res = await axios
        .delete(
          `https://localhost:44306/api/store/${me.storeSelected.storeId}`,
          me.storeSelected
        )
        .then(function (res) {
          console.log(res);
          me.closeForm()
          Swal.fire({
              icon: "success",
              title: `Xóa cửa hàng ${nameStore} thành công`,
              showConfirmButton: false,
              timer: 1000
            });
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
  color: red;
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
  width: 400px;
  height: 160px;
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
.form__dialog {
  height: 64px;
  padding: 10px;
  display: flex;
  align-items: flex-start;
}
.form__dialog .dialog__icon {
  width: 44px;
  height: 44px;
  margin-right: 10px;
  background-image: url("../../assets/icon/confirm-blue.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 40px;
}
.form__dialog .dialog__message {
  height: 34px;
  width: calc(100% - 54px);
  font-size: 13px;
  padding-top: 3px;
}
.form__title_close {
  width: 22px;
  background-image: url("../../assets/icon/close_form.png");
  background-position: center;
  cursor: pointer;
}
/* form_action */
.form__footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 52px;
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
}
.form__footer .form__action {
  width: 100%;
  display: flex;
  height: 35px;
  justify-content: flex-end;
  padding: 0 10px;
}
.form__btn {
  display: flex;
  height: 35px;
}
.form__btn .form__action_button {
  display: flex;
  align-items: center;
  height: 35px;
}
.btn__style {
  width: auto;
  display: flex;
  align-items: center;
  height: 35px;
  border-radius: 4px;
  font-size: 13px;
  margin-right: 8px;
  font-weight: 600;
  cursor: pointer;
}
.btn_delete {
  padding-left: 8px;
  padding-right: 28px;
  border-radius: 4px;
  color: #fff;
  background-color: #eb7728;
}
.btn_delete:hover {
  background-color: #f0974b;
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
  margin-right: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
}
.icon_delete {
  background-image: url("../../assets/icon/delete-white.png");
}
.icon_cancel {
  background-image: url("../../assets/icon/cancel-blue.png");
}
</style>