<template>
  <div class="listWrapper">
    <div class="mainContent">
      <div class="swipers" v-if="bannerList.length > 0">
         <swiper :options="swiperOption">
            <swiper-slide class="swiper-slide" v-for="(item,index) in bannerList" :key="index">
                <img :src="'http://apit.5544xj.com'+ item.image" v-interceptImg />
            </swiper-slide>
            <!-- <div class="swiper-pagination"  slot="pagination"></div>    -->
            <!-- <div class="swiper-button-prev" slot="button-prev"></div>  -->
            <!-- <div class="swiper-button-next" slot="button-next"></div>  -->
        </swiper>
      </div>
      <div class="search">
        <div class="search_content">
          <li class="search_item">
            <div class="city">
              <div class="choose">
                <span @click="chooseProvinces">
                  <img src="../../../images/location.svg" alt="">
                  <i>{{chooseProvince}}</i>
                  <img src="../../../images/city.svg" alt="" class="city_arrow">
                </span>
                <img src="../../../images/close.png" alt="" class="close" v-if="chooseProvince != '选择城市'" @click="clearProvince">
              </div>
            </div>
            <div class="selected" v-if="showCity">
              <el-select v-model="province" placeholder="请选择地区" @change="provinceChanged">
                <el-option
                  :key="''"
                  :label="'选择省份'"
                  :value="''">
                </el-option>
                <el-option
                  v-for="item in provinces"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
            <el-select v-model="city"
              placeholder="请选择" @change="cityChanged">
                <el-option
                  :key="''"
                  :label="'选择城市'"
                  :value="''">
                </el-option>
                <el-option
                  v-for="item in cities"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
            </el-select>
            </div>
          </li>
        </div>
      </div>
      <div class="listContent">
        <div v-for="item in infoList" :key="item.index" class="item" @click="showDetail(item)">
          <div class="item_top">
            <img :src="item.outpic" alt="" v-interceptImg>
          </div>
          <div class="item_bottom">
            <div class="bottom_left">
              <div class="title">{{item.title}}</div>
              <div div class="price">
                <span>
                  <img src="../../../images/age.svg" alt="">
                  {{item.age}}
                </span>
                <span>
                  <!-- <img src="../../../images/price.svg" alt=""> -->
                  {{item.price}} 米
                </span>
              </div>
            </div>
            <div class="bottom_right">
              <div class="bottom_content">
                <img src="../../../images/score.svg" alt="">
                <i>{{item.faceValue}}分</i>
              </div>
            </div>
          </div>
        </div>
        <div class="load-more mr-bottom" v-if="length < allcount" @click="loadMore">点击加载更多</div>
        <div class="load-more mr-bottom" v-else>～～End～～</div>
      </div>
    </div>
    <div class="dialogs" v-if="dialogShow"  @touchmove.prevent>
      <div class="dialog" @touchmove.prevent>
        <span class="dialog_close" @click="close">
          <img src="../../../images/close.png" alt="">
        </span>
        <div class="dialog_header">请先登录/注册</div>
        <div class="dialog_content">
          <span @click.stop="toSignUp">注册</span>
          <span @click.stop="toLogin">登录</span>
        </div>
      </div>
    </div>
    <div class="dialog2" v-if="dialogShow2">
      <div class="dialog">
        <span class="dialog_close" @click="close2">
          <img src="../../../images/close.png" alt="">
        </span>
        <div class="dialog_content">
          <div class="infoHeader">
            <div class="header_left">
              <span class="title">{{infos.title}}</span>
              <div div class="price">
                <span>
                  <img src="../../../images/age.svg" alt="">
                  {{infos.age}}
                </span>
                <span>
                  <!-- <img src="../../../images/price.svg" alt="">  -->
                  {{infos.price}} 米
                </span>
              </div>
            </div>
            <div class="header_right">
              <div class="bottom_content">
                <img src="../../../images/score.svg" alt="">
                <i>{{infos.faceValue}}分</i>
              </div>
            </div>
          </div>
          <div class="info_content">
            <li>所在地区:
              <i>{{infos.location}}</i>
            </li>
            <li>美女名称:
              <i>{{infos.name}}</i>
            </li>
            <li>颜值评估:
              <i>{{infos.faceValue}}分</i>
            </li>
            <li>服务项目:
              <i>{{infos.service}}</i>
            </li>
            <li>联系方式:
              <i class="noVip" v-if="!hasConcat" @click="showConcat(infos.id)">会员可查看</i>
              <i class="noVip" v-if="hasConcat">{{concat}}</i>
            </li>
            <li>详细描述:
              <i>{{infos.summary}}</i>
            </li>
            <div class="allpicture">
              <li v-for="item in new_pictures" :key="item.index" class="lis">
                <img :src="item" alt="" >
              </li>
            </div>
          </div>
        </div>
        <div class="member" @click="toMember" v-if="userType != 1 || userType != 2">
          成为会员
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPic, checkConcat, searchPic,getBanner } from "@/api/api";
import SYSTEM from "@/api/util/system.js";
import PROVICE from "@/api/util/provice.json";
let vm = null
export default {
  data() {
    return {
      infoList: [],
      dialogShow: false,
      dialogShow2: false,
      postData: {
        page: 1,
        pageSize: 12,
        price: '',
        city: ''
      },
      infos: {},
      hasConcat: false,
      length: 12,
      allcount: 0,
      showMember: false,
      concat: '',
      provinces: [],
      cities: [],
      province: "",
      city: '',
      chooseProvince: '选择城市',
      showCity: false,
      postProvince: '',
      bannerList: [],
      swiperOption:{
          //显示分页
          pagination: {
            el: '.swiper-pagination'
          },
          //设置点击箭头
          navigation: {
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev'
          },
          //自动轮播
          autoplay: {
            delay: 3000,
            //当用户滑动图片后继续自动轮播
            disableOnInteraction: false,
          },
          //开启循环模式
          loop: false,
          on: {
              click: function () {
                // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
                // console.log(this); // -> Swiper
                // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
                const realIndex = this.realIndex;
                vm.handleClickSlide(realIndex);
              }
            }
      },
      new_pictures: []
    };
  },
  mounted() {
    this.getAllPic(this.postData);
  },
  created() {
    this.provinces = PROVICE.provinces;
    this.getAllBanner()
    let userType = (this.$common.getSessionStorage('userType'))
    if (userType == 0) {
      setTimeout(() => {
        this.showMember = true
      }, 300);
      return false
    }
    vm = this
    var mo=function(e){e.preventDefault();};
    document.body.style.overflow='';//出现滚动条
    document.removeEventListener("touchmove",mo,false);
  },
  methods: {
    getAllBanner () {
      getBanner().then(res => {
        let banners = (res.data.data.banners)
        for (let i = 0; i < banners.length; i++) {
          this.bannerList = banners
        }
      })
    },
    handleClickSlide (index) {
      if(this.bannerList[index].link != '') {
        window.open(this.bannerList[index].link)
      }
    },
    getAllPic(data) {
      getPic(data).then((res) => {
        if (res.data.code === 200) {
          this.infoList = res.data.data.records;
          this.allcount = res.data.data.total;
          this.length = this.infoList.length;
          for (let i = 0; i < this.infoList.length; i++) {
            this.infoList[i].allPicture = this.infoList[i].pictures.split(",");
            if(this.infoList[i].allPicture.length >= 2) {
              this.infoList[i].outpic = this.infoList[i].allPicture[1]
            } else if (this.infoList[i].allPicture.length == 1 && (this.infoList[i].allPicture[0] !==',')) {
              this.infoList[i].outpic = this.infoList[i].allPicture[0]
            }
          }
        }
      });
    },
    showDetail(item) {
      if (!sessionStorage.getItem("loginStatus")) {
        this.dialogShow = true;
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
      } else {
        this.dialogShow2 = true
        this.dialog_content = false
        this.infos = JSON.parse(JSON.stringify(item))
        this.new_pictures = []
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
        if (this.infos.allPicture[0] == '') {
          for (let i = 1; i < this.infos.allPicture.length; i++) {
            this.new_pictures.push(this.infos.allPicture[i])
          }
        } else {
          for (let i = 0; i < this.infos.allPicture.length; i++) {
            this.new_pictures.push(this.infos.allPicture[i])
          }
        }
        console.log(this.new_pictures)
      }
    },
    close() {
      this.dialogShow = false;
      var mo=function(e){e.preventDefault();};
      document.body.style.overflow='';//出现滚动条
      document.removeEventListener("touchmove",mo,false);
    },
    toSignUp() {
      this.$router.push("/signup");
    },
    toLogin() {
      this.$router.push("/login");
    },
    //  非会员查看
    close2() {
      this.dialogShow2 = false;
      this.hasConcat = false
      var mo=function(e){e.preventDefault();};
      document.body.style.overflow='';//出现滚动条
      document.removeEventListener("touchmove",mo,false);
    },
    showConcat(id) {
      var data = {
        hookerId: id,
      };
      let userType = (this.$common.getSessionStorage('userType'))
      if (userType == 0) {
        setTimeout(() => {
          this.showMember = true
        }, 300);
        this.$message({
          type: 'error',
          message: '成为会员，才可查看',
          customClass:'zZindex'
        })
        return false
      }
      checkConcat(data).then((res) => {
        this.hasConcat = true
        this.concat = res.data.data.contact
      });
    },
    loadMore() {
      this.postData.page = this.postData.page + 1
      var data = {
        page: this.postData.page,
        pageSize: 12,
      };
      if (this.postProvince != '') {
        data.city = this.postProvince
      }
      getPic(data).then((res) => {
        if (res.data.code === 200) {
          this.infoList = this.infoList.concat(res.data.data.records);
          this.allcount = res.data.data.total;
          this.length = this.infoList.length
          for (let i = 0; i < this.infoList.length; i++) {
            this.infoList[i].allPicture = this.infoList[i].pictures.split(",");
            if (this.infoList[i].allPicture.length >= 2) {
              this.infoList[i].outpic = this.infoList[i].allPicture[1]
            } else if (this.infoList[i].allPicture.length == 1 && (this.infoList[i].allPicture[0] !==',')) {
              this.infoList[i].outpic = this.infoList[i].allPicture[0]
            }
          }
        }
      });
    },
    toMember () {
      this.$router.push('/member')
    },
     // 选择地区
    provinceChanged(value) {
      if (value !== '') {
        for (var item of this.provinces) {
          if (item.code === value) {
            this.cities = item.cities
            this.city = ''
            this.province = item.name
            break
          } else {
            continue
          }
        }
      } else {
        this.cities = []
        this.city = ''
      }
    },
    cityChanged (value) {
      for (let item of this.cities) {
        if (item.code === value) {
          this.city = item.name
        }
      }
      this.chooseProvince = (this.province + '-' + this.city)
      this.postProvince = (this.province + '-' + this.city)
      this.postData.city = this.postProvince
      this.showCity = false
      getPic(this.postData).then((res) => {
        if (res.data.code === 200) {
          this.infoList = res.data.data.records;
          this.allcount = res.data.data.total;
          for (let i = 0; i < this.infoList.length; i++) {
            this.infoList[i].allPicture = this.infoList[i].pictures.split(",");
            // this.infoList[i].outpic = this.infoList[i].allPicture[0];
            if(this.infoList[i].allPicture.length >= 2) {
              this.infoList[i].outpic = this.infoList[i].allPicture[1]
            } else if (this.infoList[i].allPicture.length == 1 && (this.infoList[i].allPicture[0] !==',')) {
              this.infoList[i].outpic = this.infoList[i].allPicture[0]
            }
          }
        }
      });
    },
    chooseProvinces () {
      this.showCity = !this.showCity
    },
    clearProvince () {
      this.chooseProvince = '选择城市'
      this.postProvince = ''
      this.province = ''
      this.city = ''
      let data = {
        city: '',
        page: this.postData.page,
        pageSize: this.postData.pageSize
      }
      this.getAllPic(data);
    },
  },
  directives: {
    interceptImg: {
      inserted: function (el, binding) {
        el.addEventListener('load', () => {
          let width = el.naturalWidth;
          let height = el.naturalHeight;
          // 获取父元素的设定宽度
          let parentWidth = Number(window.getComputedStyle(el.parentNode).width.replace('px', ''));
          let parentHeight = Number(window.getComputedStyle(el.parentNode).height.replace('px', ''));
          // 获取父元素宽高比例
          let scale = binding.value ? binding.value.scale : parentHeight / parentWidth;
          console.log(scale, 'scale')
          console.log(height / width)
          // 清除元素style值
          el.style = '';
          if (height / width < scale) {
            el.style.height = '100%';
            // 获取图片放入后实际的宽度
            let imgWidth = (width * parentHeight) / height;
            el.style.marginLeft = `${(parentWidth - imgWidth) / 2}px`;
          } else if (height / width > scale) {
            el.style.width = '100%';
          } else {
            el.style.width = '100%';
            el.style.height = '100%';
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.zZindex {
    z-index: 100000 !important;
  }
.listWrapper {
  position: relative;
  .mainContent {
    width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
    padding-top: 85px;
    padding-bottom: 20px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .swipers{
      height: 100px;
      .swiper-container{
        height: 100px;
        .swiper-slide{
          cursor: pointer;
        }
        img{
          height: 100px;
          width: 100%;
        }
      }
    }
    .search{
      width: 100%;
      margin-top: 25px;
      margin-bottom: 25px;
      .search_content{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        position: relative;
        .search_item{
          .city{
            border: 1px solid #ff82aa;
            border-radius: 50px;
            cursor: pointer;
            padding: 2px 10px;
            .choose{
              span{
                color: #FF82AA;
                font-size: 12px;
                height: 24px;
                line-height: 24px;
                i{
                  font-style: normal;
                  vertical-align: middle;
                }
                img{
                  vertical-align: middle;
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                }
                .city_arrow {
                  width: 12px;
                  height: 8px;
                }              
              }
              .close{
                width: 16px;
                height: 16px;
                display: inline-block;
                vertical-align: middle;
              }
            }
          }
        }
        .selected{
          position: absolute;
          right: 0;
          top: 55px;
          z-index: 999;
        }
      }
    }
    .listContent {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      min-height: 80vh;
      position: relative;
      .item {
        width: calc((100% - 75px) / 4);
        margin-right: 25px;
        margin-bottom: 40px;
        cursor: pointer;
        .item_top {
          width: 280px;
          height: 280px;
          float: left;
          display: flex;
          overflow: hidden;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .item_bottom {
          display: flex;
          justify-content: space-between;
          padding-right: 10px;
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          margin-top: 15px;
          .bottom_left {
            font-family: PingFangSC-Semibold, sans-serif;
            .title {
              color: #32008a;
              font-family: PingFangSC-Semibold, sans-serif;
              font-size: 16px;
            }
            .price {
              margin-top: 4px;
              span {
                display: inline-block;
                border-radius: 20px;
                text-align: center;
                color: #ffffff;
                font-size: 12px;
                padding: 2px 8px;
                img {
                  vertical-align: middle;
                  margin-right: 2px;
                  margin-top: -2px;
                }
              }
              span:first-child {
                background-color: #ff82aa;
              }
              span:last-child {
                background-color: #ffb660;
              }
            }
          }
          .bottom_right {
             width: 45px;
            height: 45px;
            border-radius: 50%;
            background: url('../../../images/circle.svg');
            background-repeat:no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
            .bottom_content {
              padding-top: 2px;
              padding-bottom: 2px;
              img {
                display: block;
                margin: 0 auto;
                margin-top: 3px;
              }
              i {
                font-style: normal;
                color: #fff;
                font-size: 12px;
                margin-bottom: 3px;
              }
            }
          }
        }
      }
      .item:nth-child(4n) {
        margin-right: 0;
      }
      .load-more {
        margin: 0 auto;
        width: 100%;
        text-align: center;
        padding: 10px 0;
        cursor: pointer;
        color: #999;
        font-size: 12px;
        position: absolute;
        bottom: 0;
      }
    }
  }
  .dialogs {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 10000000;
    background-color: rgba(0, 0, 0, 0.3);
    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 328px;
      height: 220px;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      padding-top: 15px;
      padding-right: 15px;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .dialog_close {
        align-self: flex-end;
        cursor: pointer;
      }
      .dialog_header {
        align-self: center;
        font-size: 18px;
        font-weight: 600;
        color: #32008a;
      }
      .dialog_content {
        align-self: center;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        span {
          padding: 10px 100px;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
        }
        span:first-child {
          background: #ff82aa;
          color: #ffffff;
        }
        span:last-child {
          border: 1px solid #ff82aa;
          margin-top: 10px;
          color: #ff82aa;
        }
      }
    }
  }
  .dialog2 {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.3);
    .dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 705px;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .dialog_close {
        // align-self: flex-end;
        cursor: pointer;
        padding-right: 10px;
        padding-top: 10px;
        width: 100%;
        text-align: right;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
      }
      .dialog_content {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        overflow: scroll;
        padding: 0 30px 45px 30px;
        .infoHeader {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          .header_left {
            .title {
              color: #32008a;
              font-weight: 500;
              font-family: PingFangSC-Semibold, sans-serif;
              font-size: 18px;
            }
            .price {
              margin-top: 10px;
              span {
                display: inline-block;
                border-radius: 20px;
                text-align: center;
                color: #ffffff;
                font-size: 12px;
                padding: 2px 8px;
                img {
                  vertical-align: middle;
                  margin-right: 2px;
                  margin-top: -1px;
                }
              }
              span:first-child {
                background-color: #ff82aa;
                margin-right: 5px;
              }
              span:last-child {
                background-color: #ffb660;
              }
            }
          }
          .header_right {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: url('../../../images/circle.svg');
            background-repeat:no-repeat;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 13px;
            .bottom_content {
              padding-top: 5px;
              padding-bottom: 5px;
              img {
                display: block;
                margin: 0 auto;
                margin-top: 3px;
              }
              i {
                font-style: normal;
                color: #fff;
                font-size: 12px;
                margin-bottom: 3px;
              }
            }
          }
        }
        .info_content {
          li {
            color: #666666;
            margin-bottom: 15px;
            font-family: PingFangSC-Semibold, sans-serif;
            i {
              font-style: normal;
              color: #000;
              font-size: 14px;
            }
            i.noVip {
              color: #32008a;
              cursor: pointer;
            }
          }
          .allpicture {
            margin-top: 30px;
            overflow: hidden;
            .lis{
              width: 100%;
              // height: 300px;
              float: left;
              display: flex;
              overflow: hidden;
              align-items: center;
              justify-content: center;
              img {
                width: 100%;
                height: auto;
                display: block;
                max-width: 100%;  
                max-height: 100%;
                margin: 0 auto;
             }
            }
          }
        }
      }
      .member{
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        background-color: #FF82AA;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;
        position: fixed;
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>