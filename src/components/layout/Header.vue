/* eslint-disable */
<template>
  <div class="header">
    <div class="header__name">
      <span>Cửa hàng</span>
    </div>
    <div class="header__user_panel">
      <div class="user_panel__combobox">
        <Autocomplete :data="shop" :tabValue="-1"></Autocomplete>
      </div>
      <div class="user_panel__user_setting">
        <div class="user_avatar"></div>
        <span class="user_name">Cao Thế Thắng</span>
        <div class="dropdown_icon"></div>
      </div>
      <div class="user_panel__contact"></div>
      <div class="user_panel__notify"></div>
      <div class="user_panel__help"></div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Autocomplete from "../common/Autocomplete.vue";
export default {
  name: "Header",
  components: {
    Autocomplete,
  },
  data() {
    return {
      shop: [
        { id: 1, text: "Circle K" },
        { id: 2, text: "VinSmart1" },
        { id: 3, text: "VinSmart2" },
      ],
    };
  },
};
</script>
<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 52px;
}
.header .header__name {
  font-size: 18px;
  font-weight: 700;
  padding-left: 21px;
}
.header .header__user_panel {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 52px;
}
.header .header__user_panel .user_panel__combobox {
  width: 200px;
  margin-right: 10px;
}
.user_panel__user_setting{
  display: flex;
  align-items: center
}
.user_panel__user_setting .user_name{
  font-size: 13px;
  font-weight: 700;
  padding: 4px 11px 0px 5px;
}
.user_panel__user_setting .user_avatar {
  width: 28px;
  height: 28px;
  background-image: url("../../assets/icon/avatar.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.user_panel__user_setting .dropdown_icon {
  width: 20px;
  height: 10px;
  background-image: url("../../assets/icon/arrow-down-line.png");
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 4px;
}
.user_panel__contact{
  width: 46px;
  height: 100%;
  background: #00577b url("../../assets/icon/dienThoai.png") no-repeat;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.user_panel__notify{
  width: 46px;
  height: 52px;
  background: url("../../assets/icon/notify.png") no-repeat;
  background-position: center;
  background-repeat: no-repeat;
}
.user_panel__help{
  width: 46px;
  height: 52px;
  background: url("../../assets/icon/icon_help.png") no-repeat;
  background-position: center;
  border-left: 1px solid #9e9e9e;
}
</style>