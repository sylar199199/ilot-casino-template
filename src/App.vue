<template>
  <router-view></router-view>
  <!-- 登录注册弹窗 -->
  <loginRegisterIframe v-if="loginDialogShow.status" />
  <!-- 全局toast -->
  <AppToast />
  <!-- 网络异常提示 -->
  <NetWorkError />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useCommonStore } from '@/stores/common'
import AppToast from '@/components/AppToast/index.vue'
import '@/styles/common.less'
import '@/styles/animate.less'
import { saveQueryParamsToSessionStorage } from './utils/utils'
import iframeHandler from '@/utils/iframeHandler'
import { getHostUrl } from '@/utils/hostUrl'
import { playSoundClickMusic } from '@/views/million-roulette/utils/playGameMusic'

export default defineComponent({
  name: 'App',
  components: {
    AppToast,
    loginRegisterIframe: defineAsyncComponent(() => import('./components/loginRegisterIframe/index.vue')),
    NetWorkError: defineAsyncComponent(() => import('@/components/NetWorkError/index.vue')),
  },
  computed: {
    ...mapState(useUserStore, ['loginDialogShow'])
  },
  setup() {
    const userStore = useUserStore()
    const commonStore = useCommonStore()
    return { userStore, commonStore }
  },
  mounted() {
    this.initIframeHandler()
    // 监听键盘 k
    document.addEventListener('keydown', (event) => {
      if (event.key === 'k') {
        playSoundClickMusic('click.mp3', { loop: false })
      }
    })
  },
  methods: {
    initIframeHandler() {
      window.addEventListener('message', (event: any) => {
        if (event.origin !== getHostUrl()) return
        iframeHandler(event.data)
      })
    }
  },
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.userStore.isLogin = true
      this.userStore.getLoginInfo()
      this.userStore.getAccountInfo()
    } else {
      this.userStore.isLogin = false
    }
    this.userStore.loginDialogShow = { type: '', status: false }
    this.commonStore.commonLoading = false
    this.commonStore.netWorkError = false
    // 广告平台归因回传参数保存到sessionStorage，参数用作后续api回调
    saveQueryParamsToSessionStorage()
  },
})
</script>
<style lang="less" scoped>
#app {
  margin: 0 auto;    /* 居中显示 */
  width: 100%;
  overflow-x: hidden;
}
</style>
