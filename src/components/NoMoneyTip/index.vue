<template>
    <CommonDialog v-model:visible="moneyTipShow" title="Tips" v-if="moneyTipShow">
     <p class="tip-txt">Insufficient Main Balance, please deposit</p>
     <div class="btn-list">
       <button class="btn-item btn-later" @click="moneyTipShow = false">Later</button>
       <button class="btn-item btn-deposit" @click="toDeposit">Deposit</button>
     </div>
    </CommonDialog>
 </template>

 <script lang='ts' >
 import { defineComponent } from 'vue'
 import { goDeposit } from '@/utils/toPlatformFn'
 import CommonDialog from '@/components/CommonDialog/index.vue'

 export default defineComponent({
   props: {
     visible: {
       type: Boolean,
       default: false,
     },
   },
   components: {
     CommonDialog
   },
   computed: {
     moneyTipShow: {
       get() {
         return this.visible
       },
       set(newVal: boolean) {
         this.$emit('update:visible', newVal)
       }
     }
   },
   methods: {
     toDeposit() {
       this.moneyTipShow = false
       goDeposit()
     }
   },
 })
 </script>

 <style scoped lang='less'>
 .tip-txt{
   margin: 0 10px;
   text-align: center;
   font-size: 14px;
 }
 .btn-list {
   display: flex;
   justify-content: space-between;
   padding: 24px 24px 30px 24px;
   width: 100%;
 }

 .btn-item {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 116px;
   height: 40px;
   border-radius: 8px;
   font-size: 14px;
   font-weight: 500;
   color: #FFFFFF;
   outline: none;
   border: none;
   cursor: pointer;
   &:hover{
     opacity: 0.8;
   }
   &.btn-later {
     background: #656A97;
   }
   &.btn-deposit {
     background: #19b864;
   }
 }
 </style>
