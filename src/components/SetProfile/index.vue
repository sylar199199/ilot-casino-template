<template>
  <CommonDialog v-model:visible="calcVisible" class="set-profile" @close="handleClose">
    <div class="set-main">
      <p class="set-main-tit">Choose Your Avatar</p>
      <!--头像列表-->
      <div class="avatar-list">
        <div class="single-avatar"
          v-for="(item, index) in headerList"
          :class="{'active': selectHeaderUrl === index}"
          @click="selectAvatar(index)">
          <img :src="item" alt=""/>
        </div>
      </div>
      <!--提交按钮-->
      <button class="submit-btn" :disabled="!nickName" :class="{'disabled':!nickName}" @click="updateLoginInfo">OK</button>
    </div>
  </CommonDialog>
</template>

<script lang='ts' >
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { headerUrlList, randomFullName, randomHeadUrl } from './utils/randomData'
import CommonDialog from '@/components/CommonDialog/index.vue'

export default defineComponent({
  components: {
    CommonDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      nickName: '',
      selectHeaderUrl: 0,
      headerList: <any>[],
    }
  },
  computed: {
    ...mapState(useUserStore, ['loginInfo']),
    calcVisible: {
      get() {
        return this.visible
      },
      set(newVal: boolean) {
        this.$emit('update:visible', newVal)
      },
    },
  },
  mounted() {
    const { playerNick, headerUrl } = this.loginInfo
    if (playerNick) {
      this.nickName = playerNick
    } else {
      this.getFullName()
    }
    if (headerUrl) {
      this.selectHeaderUrl = headerUrlList.findIndex((item: any) => item === headerUrl)
    } else {
      this.getHeadUrl()
    }
    this.headerList = headerUrlList
  },
  methods: {
    handleClose() {
      if (!this.loginInfo.headerUrl) {
        this.updateLoginInfo()
      }
    },
    /* 随机头像 */
    getHeadUrl() {
      this.selectHeaderUrl = randomHeadUrl()
    },
    // 随机名字
    getFullName() {
      this.nickName = randomFullName()
    },
    // 选择头像
    selectAvatar(index: number) {
      this.selectHeaderUrl  = index
    },
    /* 更新用户信息（头像设置） */
    async updateLoginInfo() {
      const headerUrl = this.selectHeaderUrl > -1 ? headerUrlList[this.selectHeaderUrl] : this.loginInfo.headerUrl
      this.userStore.loginInfo = {
        ...this.loginInfo,
        // 头像
        headerUrl,
        playerNick: this.nickName
      }
      await this.$api.updateUserInfo({
        // 昵称
        playerNick: this.nickName,
        // 头像
        headerUrl
      })
      console.log('打印设置头像数据', res)
      this.calcVisible = false
    }
  }
})
</script>
<style scoped lang='less'>
.set-profile {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  overflow: auto;
  padding: 20px;
  .set-main {
    margin: auto;
    width: 303px;
    background: #2A5CFF;
    box-shadow: 0px 5px 4px 0px rgba(0,0,0,0.5);
    border-radius: 8px;
    padding: 32px 22px 24px 22px;
    .set-main-tit{
      font-size: 16px;
      font-weight: bold;
      color: #FFFFFF;
      text-align: center;
      line-height: 24px;
      margin-bottom: 20px;
    }
    .avatar-list{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 264px;
      overflow: auto;
      .single-avatar {
        position: relative;
        margin: 0 4px 12px 4px;
        padding: 3px;
        width: 54px;
        height: 54px;
        flex-shrink: 0;
        background: #939aff;
        border-radius: 50%;
        cursor: pointer;
        img {
          display: block;
          width: 48px;
          height: 48px;
        }
      }
      .active{
        &:after{
          content: "";
          position: absolute;
          width: 17px;
          height: 17px;
          right: 0;
          bottom: 0px;
          background: url("./images/icon-selected.png") no-repeat center;
          background-size: 100% 100%;
        }
        &::before{
          content: "";
          position: absolute;
          top: -1.5px;
          left: -1.5px;
          right: -1.5px;
          bottom: -1.5px;
          border: 3px solid #19B864;
          border-radius: 50%;
        }
      }
    }
    .submit-btn {
      display: block;
      width: 160px;
      height: 40px;
      background: #19B864;
      border-radius: 8px;
      margin: 20px auto 16px auto;
      border: none;
      outline: none;
      font-size: 14px;
      font-weight: 500;
      color: #FFFFFF;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
    .disabled{
      cursor: no-drop;
      opacity: 0.7;
      &:hover{
        opacity: 0.7;
      }
    }
  }
}
</style>
