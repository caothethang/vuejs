<template>
  <div class="footer">
    <div class="footer__paging">
      <div class="footer-left">
        <div class="first-page style-icon-footer">
          <img src="../../assets/icon/firstPage.png" alt="" @click="firstPage"/>
        </div>
        <div class="prev style-icon-footer">
          <img src="../../assets/icon/prevPage.png" alt="" @click="prevPage"/>
        </div>
        <span style="margin: 16px 4px">Trang</span>
        <input type="text" value="1" tabindex="-1" v-model="indexPage"/>
        <span style="margin: 16px 4px">trên {{ pageCount }}</span>
        <div class="last-page style-icon-footer" >
          <img src="../../assets/icon/nextPage.png" alt="" @click="nextPage"/>
        </div>
        <div class="prev style-icon-footer">
          <img src="../../assets/icon/EndPage.png" alt="" @click="lastPage"/>
        </div>
        <select name="pages" id="pages" tabindex="-1" v-model="pageSize">
          <option value="10">10</option>
          <option value="15" selected="true">15</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div class="footer-right">
        <span
          >Hiển thị {{ (indexPage - 1) * pageSize + 1 }} -
          {{
            pageSize * indexPage > storeCount
              ? pageSize * indexPage - (pageSize * indexPage - storeCount)
              : pageSize * indexPage
          }}
          trên {{ storeCount }} kết quả</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
/* eslint-disable */
import bus from "../../main"
export default {
  data() {
    return {
      storeCount: null,
      indexPage: 1,
      pageSize: 50,
      pageCount: null,
    };
  },
  /**
   * Khi component tạo xong
   * CreatedBy : CTTHANG(14/06/2021)
   */
  created() {
    this.getStoreCount();
    this.pageCount = Math.floor(this.storeCount/this.pageSize)+1;
  },
  watch: {
    /**
     * Theo dõi sự thay đổi của page size và page index
     */
    pageSize() {
      this.pageCount = Math.floor(this.storeCount / this.pageSize) + 1;
      bus.$emit("getListStoreByPaging",this.pageSize,this.indexPage)
    },
    indexPage(){
      bus.$emit("getListStoreByPaging",this.pageSize,this.indexPage)
    }
  },
  methods: {
    /**
     * Tăng index trang lên 1
     * CreatedBy : CTTHANG(18/06/2021)
     */
    nextPage(){
      if(this.indexPage < this.pageCount)
      this.indexPage += 1;
    },
    /**
     * Di chuyển đến trang cuối
     * CreatedBy : CTTHANG(18/06/2021)
     */
    lastPage(){
      this.indexPage = this.pageCount;
    },
    /**
     * Di chuyển về trang đầu tiên
     * CreatedBy : CTTHANG(18/06/2021)
     */
    firstPage(){
      this.indexPage =1;
    },
    /**
     * Di chuyển về trang phía trước
     * CreatedBy : CTTHANG(18/06/2021)
     */
    prevPage(){
      if(this.indexPage >= 2) this.indexPage -= 1;
    },
    /**
     * Lấy số lượng cửa hàng
     * CreatedBy : CTTHANG(19/06/2021)
     */
    async getStoreCount() {
      var me = this;
      var res = await axios
        .get("https://localhost:44306/api/Store/StoreCount")
        .then(function (response) {
          me.storeCount = response.data;
        });
      console.log(res);
    },
  },
};
</script>
<style scoped>
.footer {
  width: 100%;
  height: 62px;
  border: 1px solid #d0d0d0;
  border-top: none;
  padding: 0px 10px 10px 10px;
  background-color: #e5e6eb;
}
.footer__paging {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  padding: 10px;
}
.footer-left {
  display: flex;
  color: #757575;
}
.footer-left img {
  cursor: pointer;
}
.style-icon-footer {
  margin-top: 13px;
}
.style-icon-footer {
  width: 24px;
  height: 24px;
  border: 1px solid #d0d0d0;
  margin-left: 3px;
  border-radius: 4px;
}

.footer-left input {
  height: 24px;
  width: 48px;
  margin: 13px 3px;
  text-align: center;
  border-radius: 4px;
  outline: none;
  border: 1px solid #d0d0d0;
  cursor: pointer;
}

.footer-left select {
  width: 46px;
  height: 24px;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  margin-top: 14px;
  margin-left: 3px;
  cursor: pointer;
}
</style>