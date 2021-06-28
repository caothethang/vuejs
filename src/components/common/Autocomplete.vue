/* eslint-disable */
<template>
  <div
    class="autocomplete"
    ref="autocomplete"
    :class="{ errored: isExist == false }"
    @keyup="changeIndex"
  >
    <div class="input_field">
      <input
        ref="focusInput"
        type="text"
        name=""
        id=""
        value=""
        v-model="valueSelected"
        @keyup="searchOption"
        @blur="closeAutocomplete"
        @click="focusToThis"
        @focus="focusToThis"
        :placeholder="hint"
        :tabindex="indexTab"
      />
      <div class="dropdown_icon" @click="toggleOption"></div>
    </div>
    <div
      class="list_item"
      ref="list_item"
      v-if="isShow"
      @mouseenter="disableBlur"
      @mouseleave="enableBlur"
    >
      <div
        class="item"
        v-for="(item, index) in list_item"
        ref="options"
        :key="index"
        @click="select(item, index)"
        :class="{ selected: currentIndex === index }"
      >
        {{ Object.values(item)[1] }}
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "Autocomplete",
  props: {
    data: Array,
    hint: String,
    type: String,
    tabValue: Number,
    id: String,
    countryEdited : Object,
    provinceEdited : Object,
    districtEdited : Object,
    wardEdited : Object
  },
  data() {
    return {
      itemSelected : {},
      // Giá trị chọn từ ô
      valueSelected: "",
      // index vị trí
      indexSelected: "",
      // Ẩn/hiện autocomplete
      isShow: false,
      // Dữ liệu option
      list_item: [...this.data],
      // Check xem có dữ liệu không
      isExist: true,
      // Có đang blur hay không
      isDisableBlur: false,
      indexTab: parseInt(this.tabValue),
      idSelected: this.id,
      currentIndex: 0,
    };
  },
  created() {},
  /**
   * Kiểm soát khi dữ liệu thay đổi
   */
  watch:{
    countryEdited(){
      this.valueSelected = this.countryEdited.countryName
      this.itemSelected = this.countryEdited
    },
    provinceEdited(){
      this.valueSelected = this.provinceEdited.provinceName
      this.itemSelected = this.provinceEdited
      this.currentIndex = this.list_item.findIndex(ele => ele.provinceName == this.valueSelected)
       console.log(this.currentIndex)
       for(ele in this.list_item){
        if(this.list_item[ele].provinceId == this.itemSelected.provinceId){
          this.currentIndex = ele
        }
      }
    },
    districtEdited(){
      this.valueSelected = this.districtEdited.districtName
      this.itemSelected = this.districtEdited
    },
    wardEdited(){
      this.valueSelected = this.wardEdited.wardName
      this.itemSelected = this.wardEdited
    }
  },
  methods: {
    /**
     * Chọn dữ liệu từ autocomplete box
     * CreatedBy : CTTHANG(14/06/2021)
     */
    select(item, index) {
      this.itemSelected = item
      this.valueSelected = Object.values(item)[1];
      this.indexSelected = Object.values(item)[0];
      this.isShow = false;
      this.isExist = true;
      this.isDisableBlur = false;
      this.$emit(this.type, this.itemSelected);
      this.currentIndex = index;
    },
    /**
     * Ẩn hiện menu
     * CreatedBy : CTTHANG(14/06/2021)
     */
    toggleOption() {
      this.isShow = !this.isShow;
      this.list_item = [...this.data];
      for (let ele of this.list_item) {
        if (Object.values(ele)[0] == this.idSelected) {
          this.indexSelected = this.idSelected;
          this.valueSelected = Object.values(ele)[1];
          this.$emit(this.type, ele);
        }
      }
      console.log(this.list_item);
      if (this.isShow) {
        this.$refs.focusInput.focus();
        this.isDisableBlur = false;
      }
    },
    /**
     * Tìm kiếm dữ liệu trong combobox
     * CreatedBy : CTTHANG(14/06/2021)
     */
    searchOption(e) {
      if (e.keyCode != 13 && e.keyCode != 40 && e.keyCode != 38 || e.keyCode == 8) {
        this.list_item = [...this.data];
        this.currentIndex = 0;
        if (this.valueSelected) {
          let list_text = this.list_item.map((item) => Object.values(item)[1]);
          this.isShow = true;
          var reg = new RegExp(this.valueSelected.trim(),"ig");
          this.list_item = this.list_item.filter((ele) =>
            Object.values(ele)[1].match(reg)
          );
          console.log(this.list_item)
          if (list_text.includes(this.valueSelected.trim())) this.isExist = true;
          else{
            this.isExist = false;
          } 
        } else {
          this.isExist = true;
          this.list_item = [...this.data];
          this.isDisableBlur = false;
        }
      }
    },
    /**
     * Đóng autocomplete khi blur
     * CreatedBy : CTTHANG(14/06/2021)
     */
    closeAutocomplete() {
      if (this.isDisableBlur) {
        this.select;
      } else {
        this.isShow = false;
        this.$refs["autocomplete"].classList.remove("focusable");
      }
    },
    /**
     * Tắt blur khi focus vào item
     * CreatedBy : CTTHANG(14/06/2021)
     */
    disableBlur() {
      this.isDisableBlur = true;
    },
    /**
     * Bật blur khi không hover vào list
     * CreatedBy : CTTHANG(14/06/2021)
     */
    enableBlur() {
      this.isDisableBlur = false;
    },
    /**
     * Focus vào autocomplete
     * CreatedBy : CTTHANG(15/06/2021)
     */
    focusToThis() {
      this.$refs["autocomplete"].classList.add("focusable");
      this.isShow = true;
      if (!this.currentIndex) {
        this.currentIndex = 0;
      }
    },
    /**
     * Sử dụng mũi tên lên xuống trong combobox
     * CreatedBy : CTTHANG(18/06/2021)
     */
    changeIndex(e) {
      if (e.keyCode == 40) {
        this.currentIndex += 1;
        if (this.currentIndex > this.list_item.length - 1) {
          this.currentIndex = 0;
        }
        this.fixScrolling();
      }
      if (e.keyCode == 38) {
        this.currentIndex -= 1;
        if (this.currentIndex < 0) {
          this.currentIndex = this.list_item.length - 1;
        }
        this.fixScrolling();
      }
      if (e.keyCode == 13) {
        this.valueSelected = Object.values(
          this.list_item[this.currentIndex]
        )[1];
        console.log(this.valueSelected);
        this.isShow = false;
        this.isExist = true;
        this.$emit(this.type, this.list_item[this.currentIndex]);
      }
    },
    fixScrolling() {
      console.log("scroll đi");
      const liH = this.$refs.options[this.currentIndex].clientHeight;
      console.log(liH);
      this.$refs.list_item.scrollTop = liH * this.currentIndex;
      console.log(liH * this.currentIndex + liH);
    },
  },
  mounted() {
    console.log(this.data);
  },
};
</script>
<style scoped>
* {
  font-size: 16px;
}
.combobox {
  height: 32px;
  position: relative;
}
.autocomplete {
  position: relative;
  width: 200px;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
}
.focusable {
  border: 1px solid #026b97 !important;
}
.autocomplete .input_field {
  display: flex;
  justify-content: space-between;
}
.autocomplete .input_field input {
  width: 90%;
  outline: none;
  padding: 5px 1px 4px 8px;
  border-radius: 3px;
  border: none;
  font-size: 13px;
}
.autocomplete .dropdown_icon {
  width: 10%;
  color: black;
  background-image: url("../../assets/icon/arrow-down-line.png");
  background-position: center;
  cursor: pointer;
  background-repeat: no-repeat;
}
.autocomplete .list_item {
  position: absolute;
  width: 100%;
  top: 30px;
  box-shadow: 1px 2px 8px -2px rgba(0, 0, 0, 0.66);
  border-top: none;
  border-radius: 4px;
  background-color: #ffffff !important;
  max-height: 100px;
  overflow-y: scroll;
  z-index: 1;
}
.list_item::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.list_item::-webkit-scrollbar-thumb {
  background-color: #9e9e9e;
}
.autocomplete .list_item .item {
  padding: 5px 1px 4px 8px;
  font-size: 13px;
}
.autocomplete .list_item .item:hover {
  color: #ffffff;
  background-color: #9e9e9e;
  cursor: pointer;
}
.selected {
  background-color: #026b97;
  color: #ffffff;
}
.errored {
  border: 1px solid red !important;
}
</style>