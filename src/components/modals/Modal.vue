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
      <Tab :tabs="tabsData">
        <template #guonei>
          <a-row class="areas-header">
            <a-col :span="8">省份</a-col>
            <a-col :span="8">直辖市</a-col>
            <a-col :span="8">区县</a-col>
          </a-row>
          <a-row   class="areas-content">
            <a-col :span="8" class="provinces">
              <div v-for="province in areaData" :key="province.code" class="provinces-item">{{province.name}}</div>
            </a-col>
            <a-col :span="8">市</a-col>
            <a-col :span="8">区县</a-col>
          </a-row>
        </template>
        <template #guoji>
          国际
        </template>
      </Tab>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref,onMounted,computed} from 'vue';
import { message } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import Tab from "@/components/tabs/Tab.vue";
import { getProvinces } from "@api/apiMethods.ts";

interface Province {
  code: string;
  name: string;
}
interface ApiResponse {
  status: number;
  body: {
    code: string;
    message:string;
    data: Province[];
    meta:null
  };
}
const areaData = ref<Province[]>([])
const loading = ref<boolean>(false)

// 定义 props 类型
const { open, modalTitle } = defineProps<{
  open: boolean;
  modalTitle: string;
}>();
// 定义 emits 类型
const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'confirm', value: string): void;
}>();
const tabsData:Tab[] = [
  { id: '1', label: '国内城市', slotName: 'guonei' },
  { id: '2', label: '国际城市', slotName: 'guoji' },
]

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


// Fetch data
const fetchData = async () => {
  try {
    const response = await getProvinces() as ApiResponse;
    if (response.body.code === 200) {
      areaData.value = response.body.data;
    } else {
      message.error('获取省份数据失败');
    }
  } catch (error) {
    message.error('获取省份数据失败，请稍后重试');
  }
};
onMounted(() => {
  fetchData()
})

</script>

<style scoped lang="scss">
@use '@/theme/src/index' as *;

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
.modal-content-box {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: $modal-height;
  width: 90%;
  user-select: none;
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
  .areas-header{
    color: $text-regular;
  }
  .areas-content{
    height: 340px;
    .provinces{
      height: $height;
      overflow: auto;
      .provinces-item{
        padding: $spacing-xs 0;
        cursor: pointer;
      }
      
    }
  }
}




@media screen and (max-width: 768px) {
  .title-box {
    width: 90%;
  }
}
</style>
