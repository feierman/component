<template>
  <a-modal
    :open="open"
    :centered="true"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="850"
    :footer="null"
    :closable="false"
  >
    <template #title>
      <div class="title-box">
        <a-button type="primary" @click="handleOk">确定</a-button>
        <span>选择{{ modalTitle }}地址</span>
        <a-button type="default" @click="handleCancel">取消</a-button>
      </div>
    </template>
    <div class="modal-content-box">
      <div class="modal-content-header">
        <a-input
          size="large"
          placeholder="请输入市，区/县"
          allow-clear
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
       <Tab tabs="">
       
       </Tab>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref} from 'vue';

import { SearchOutlined } from '@ant-design/icons-vue';
import Tab from "@/components/tabs/Tab.vue";

// 定义 props 类型
const props = defineProps<{
  open: boolean;
  modalTitle: string;
}>();

// 定义 emits 类型
const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'confirm', value: string): void;
}>();




// 模态框输入值
const modalInput = ref<string>('');

//取消
const handleCancel = () => {
  emit('update:open', false);
};

//确定
const handleOk = () => {
  emit('confirm', modalInput.value);
  emit('update:open', false);
};

</script>

<style scoped lang="scss">
@use '@/theme/src/index' as *;

.modal-content-box {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: $modal-height;
  width: 90%;
  
  .modal-content-header {
    height: $modal-header-height;
    padding: $spacing-xs;
    
    .ant-input-affix-wrapper {
      border-radius: 20px;
      border: 1px solid #d9d9d9;
      
      .ant-input {
        font-size: 14px;
        color: #333;
      }
      
      .ant-input-prefix {
        margin-right: 8px;
        color: #999;
      }
      
      .ant-input-clear-icon {
        color: #999;
      }
    }
  }
  
}

.title-box {
  margin: 4px auto;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  span {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  
  .ant-btn-primary {
    background: #1890ff;
    border-color: #1890ff;
    border-radius: 4px;
  }
}
@media screen and (max-width: 768px) {
  .title-box {
    width: 90%;
  }
}
</style>
