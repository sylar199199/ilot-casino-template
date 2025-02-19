<template>
  <CommonDialog v-if="calcVisible" v-model:visible="calcVisible" title="Oops" @close="calcVisible = false">
    <p class="tips">Network error, please refresh the browser or restart the app.</p>
    <div class="btn-list">
      <div class="btn-item btn-exit" @click.stop="exit">Quit</div>
      <div class="btn-item btn-refresh" @click.stop="refresh">Refresh</div>
    </div>
  </CommonDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useCommonStore } from '@/stores/common'
import CommonDialog from '@/components/CommonDialog/index.vue'

export default defineComponent({
  components: {
    CommonDialog,
  },
  setup() {
    const commonStore = useCommonStore()
    return { commonStore }
  },
  computed: {
    ...mapState(useCommonStore, ['netWorkError']),
    calcVisible: {
      get() {
        return this.netWorkError
      },
      set(newVal: boolean) {
        this.commonStore.netWorkError = newVal
      },
    },
  },
  methods: {
    exit() {
      this.calcVisible = false
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        location.reload()
      }
    },
    refresh() {
      this.calcVisible = false
      location.reload()
    },
  },
})
</script>

<style lang="less" scoped>
.common-dialog {
  :deep(.common-dialog-content) { // NOSONAR
    width: 280px;
  }
}

.tips {
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
}

.btn-list {
  display: flex;
  justify-content: space-between;
  padding: 16px 20px 20px 20px;
  width: 100%;
}

.btn-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 40px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
  &.btn-exit {
    background: #656A97;
  }
  &.btn-refresh {
    background: #19b864;
  }
}
</style>
