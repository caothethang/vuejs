/* eslint-disable */
<template>
  <!-- Sidebar menu -->
  <div class="sidebar">
    <!-- logo -->
    <div class="logo"></div>
    <!-- menu -->
    <div class="menu">
      <!-- menu-item -->
      <div class="menu__item">
        <img src="../../assets/icon/TongQuan.png" class="menu__item_icon" />
        <span class="menu__item_title">Tổng quan</span>
      </div>
      <div class="menu__item">
        <img src="../../assets/icon/BaoCao.png" class="menu__item_icon" />
        <span class="menu__item_title">Báo cáo</span>
      </div>
      <div class="menu__item">
        <img src="../../assets/icon/DonHang.png" class="menu__item_icon" />
        <span class="menu__item_title">Đơn hàng</span>
      </div>
      <div class="menu__item">
        <img src="../../assets/icon/MuaHang.png" class="menu__item_icon" />
        <span class="menu__item_title">Mua hàng</span>
      </div>
      <div class="menu__item">
        <img src="../../assets/icon/KhuyenMai.png" class="menu__item_icon" />
        <span class="menu__item_title">Khuyến mại</span>
      </div>
      <div class="menu__item active">
        <img src="../../assets/icon/QuanLyCuaHang.png" class="menu__item_icon" />
        <span class="menu__item_title">Quản lý cửa hàng</span>
      </div>
      <div class="menu__item">
        <img src="../../assets/icon/HangHoa.png" class="menu__item_icon" />
        <span class="menu__item_title">Hàng hóa</span>
      </div>
      <!-- menu-item -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "SideBar",
  data() {
    return {};
  },
};
</script>
<style scoped>
.active {
  background-color: #1e235a !important;
}
.active span {
  color: #ffffff !important;
}
.sidebar {
  width: 150px;
  background-color: #2b3173;
  height: 100vh;
}
.sidebar .logo {
  height: 50px;
  cursor: pointer;
  background: #1e235a url("../../assets/logo.png");
  background-position: center;
  background-size: cover;
}
.sidebar .menu {
  flex: 1;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
}
.sidebar .menu .menu__item {
  display: flex;
  font-size: 13px;
  align-items: center;
  height: 40px;
  padding-left: 8px;
  cursor: pointer;
  margin-bottom: 4px;
  background-color: #2b3173;
}
.sidebar .menu .menu__item:last-child {
  border-top: 1px solid #190472;
}
/* xử lý hover vào menu-item */
.sidebar .menu .menu__item:hover .menu__item_title {
  color: #fff;
}
.sidebar .menu .menu__item:hover {
  background-color: #1e235a;
}
.sidebar .menu .menu__item .menu__item_icon {
  width: 22px;
}
.sidebar .menu .menu__item .menu__item_title {
  color: #aaacc7;
  padding-left: 10px;
}
</style>
