<template>
  <CommonDialog v-model:visible="calcVisible" title="Sound">
    <div class="sound-control-form">
      <p class="label">Sound</p>
      <CommonSwitch v-model:value="calcSoundSwitch" />
    </div>
  </CommonDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommonDialog from '@/components/CommonDialog/index.vue'
import CommonSwitch from '@/components/CommonSwitch/index.vue'
import { useMusicStore } from '@/stores/music'

export default defineComponent({
  components: {
    CommonDialog,
    CommonSwitch,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const musicStore = useMusicStore()
    return { musicStore }
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
    calcSoundSwitch: {
      get() {
        return this.musicStore.clickSoundSwitch
      },
      set(newVal: string) {
        this.musicStore.clickSoundSwitch = newVal
      },
    },
  },
})
</script>

<style lang="less" scoped>
.sound-control-form {
  display: flex;
  margin: 9px 12px 50px 12px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 279px;
  height: 42px;
  border-radius: 6px;
  .label {
    font-size: 16px;
    font-weight: 500;
    color: #FFFFFF;
  }
}
</style>
