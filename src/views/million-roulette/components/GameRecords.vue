<template>
  <CommonDialog v-model:visible="calcVisible" title="">
    <i class="dialog-title"></i>
    <div class="history-main">
    </div>
  </CommonDialog>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import CommonDialog from '@/components/CommonDialog/index.vue'

export default defineComponent({
  components: {
    CommonDialog,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    activeTab: {
      type: String,
      default: 'bet',
    },
  },
  computed: {
    calcVisible: {
      get() {
        return this.visible
      },
      set(newVal: boolean) {
        this.$emit('update:visible', newVal)
      },
    },
  },
})
</script>

<style lang="less" scoped>
.common-dialog {
  :deep(.common-dialog-content) { // NOSONAR
    margin-bottom: 0;
    padding-bottom: 9px;
    width: 319px;
  }
}

.common-dialog {
  :deep(.icon-close) { // NOSONAR
    right: 3px;
    top: -39px;
    width: 24px;
    height: 24px;
    background: url(../images/icon-close.png) center center / 100% 100% no-repeat;
  }
}

.dialog-title {
  margin: -96px auto 3px auto;
  display: block;
  width: 218px;
  height: 117px;
}

.history-main {
  width: 100%;
  height: 396px;
  overflow: hidden;
}
</style>
