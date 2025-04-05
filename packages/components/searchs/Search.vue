<template>
  <div class="search-box">
    <a-row :gutter="10" class="groupInput">
      <a-col :xs="11" :sm="11" :md="9" :lg="9" :xl="9" class="start">
        <a-input v-model:value="startPoint" placeholder="起点" @click="showStartPointModal">
          <template #prefix>
            <i class="iconfont icon-qidian1"></i>
          </template>
        </a-input>
      </a-col>
      <a-col class="icon" :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
        <i class="iconfont icon-wangfan"></i>
      </a-col>
      <a-col :xs="11" :sm="11" :md="9" :lg="9" :xl="9" class="end">
        <a-input placeholder="终点" @click="showEndPointModal">
          <template #prefix>
            <i class="iconfont icon-zhongdian1"></i>
          </template>
        </a-input>
      </a-col>
      <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="submitBtn">
        <a-button type="primary" block size="large" style="height: 97%; width: 100%">
          <template #icon>
            <i class="iconfont icon-sousuo" style="padding-right: 5px"></i>
          </template>
          <span>搜索</span>
        </a-button>
      </a-col>
    </a-row>
    <Modal :open="showVisible" @update:open="showVisible = $event"
           @confirm="handleConfirm"
           :modalTitle="modalTitle" >
      
    </Modal>
  </div>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Modal from '@/components/modals/Modal.vue';
const props = defineProps<{
  startCity: string;
}>();

const startPoint = ref<string>(props.startCity || '临沂');

// Log only on first meaningful change per instance
let hasLogged = false;
watch(
  () => props.startCity,
  (newCity, oldCity) => {
    if (newCity && newCity !== oldCity) {
      startPoint.value = newCity;
      if (!hasLogged) {
        console.log(`Search.vue 更新 startPoint 为: ${startPoint.value}`);
        hasLogged = true;
      }
    }
  }
);
// 定义响应式变量及其类型
const showVisible = ref<boolean>(false);
const inputValue = ref<string>('');
const modalTitle = ref<string>(''); // 新增：记录模态框标题

// 点击起点输入框显示模态框
const showStartPointModal = () => {
  modalTitle.value = '起点';
  showVisible.value = true;
};

// 点击终点输入框显示模态框
const showEndPointModal = () => {
  modalTitle.value = '终点';
  showVisible.value = true;
};

// 处理模态框确认事件
const handleConfirm = (value: string) => {
  inputValue.value = value; // 更新输入框的值
  console.log('模态框返回的值:', value);
  if (modalTitle.value === '起点') {
    startPoint.value = value; // 如果是选择起点，更新 startPoint
  } else if (modalTitle.value === '终点') {
    // 在这里处理终点选择的逻辑，例如创建一个 ref 存储终点
    console.log('选择了终点:', value);
  }
};
</script>

<style scoped lang="scss">
@use '@/theme/src/common/var' as *;
.search-box {
  width: 95%;
  .groupInput {
    display: flex;
    align-items: center;
  }
  
  .start,
  .end {
    display: flex;
    i {
      font-size: $font-size-lg;
      color: $primary;
    }
  }
  .icon {
    @include flex-center;
    .icon-wangfan {
      font-size: $font-size-xl;
      color: $primary;
    }
  }
}

@media screen and (max-width: 768px) {
  .submitBtn {
    margin-top: $spacing-xs;
  }
}
</style>