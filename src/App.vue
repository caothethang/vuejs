/* eslint-disable */
<template>
    <div id="app">
      <div class="left_sidebar">
        <SideBar></SideBar>
      </div>
      <div class="right">
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
        <DialogServices />
      </div>
    </div>
</template>
<script>
/* eslint-disable */
import SideBar from "./components/layout/SideBar.vue";
import Content from "./components/layout/Content.vue";
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue"
import DialogServices from "./components/common/DialogServices.vue"
export default {
  name: "App",
  components: {
    SideBar,
    Content,
    Header,
    Footer,
    DialogServices
  },
  methods:{
    
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: MISA-Regular, MISA-Bold, MISA-Italic;
}
#app {
  display: flex;
  width: 100%;
  height: 100vh;
}
.right {
  width: calc(100% - 150px);
  height: 100vh;
}
.left_sidebar{
  width: 150px;
  height: 100vh;
}
.swal2-popup{
  font-size: 8px !important;
}

@font-face {
  font-family: "MISA-Regular";
  src: url("./assets/font/GoogleSans-Regular.otf") format("opentype");
}

@font-face {
  font-family: "MISA-Bold";
  src: url("./assets/font/GoogleSans-Bold.otf") format("opentype");
}

@font-face {
  font-family: "MISA-Italic";
  src: url("./assets/font/GoogleSans-Italic.otf") format("opentype");
}
</style>
