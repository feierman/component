<!-- 路径 src/views/buttons/Button.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue';

type ButtonType = '' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

interface ButtonData {
    type: ButtonType;
    label: string;
   
}
const buttonsData = ref<ButtonData[]>([
    { type: '', label: '默认按钮' },
    { type: 'primary', label: '主要按钮' },
    { type: 'success', label: '成功按钮',  },
    { type: 'warning', label: '警告按钮' },
    { type: 'danger', label: '危险按钮' },
    { type: 'info', label: '信息按钮' },
]);

const smallButtons = computed(() => buttonsData.value);
const defaultButtons = computed(() => buttonsData.value);
const largeButtons = computed(() => buttonsData.value);
const disabledButtons = computed(() => buttonsData.value)

const isLoading = ref<boolean>(false);

const toggleLoading = () => {
  isLoading.value = true;
setTimeout(() => {
    if(isLoading.value){
        isLoading.value = false
    }
}, 2000);

}


</script>

<template>
    <div class="buttons-box">
        <div class="buttons-default">
            <h2 class="title"  >常规按钮</h2>
            <div class="buttons">
                <h5>小号按钮</h5>
                <m-button v-for="button in smallButtons" :key="button.type" :type="button.type" size="small">
                    {{ button.label }}
                </m-button>
            </div>
            <div class="buttons">
                <h5>默认按钮</h5>
                <m-button v-for="button in defaultButtons" :key="button.type" :type="button.type">
                    {{ button.label }}
                </m-button>
            </div>
            <div class="buttons">
                <h5>大号按钮</h5>
                <m-button v-for="button in largeButtons" :key="button.type" :type="button.type" size="large">
                    {{ button.label }}
                </m-button>
            </div>
        </div>

        <div class="disabledButtons">
            <h2>禁用按钮</h2>
            <div class="buttons">
                <h5>禁用按钮</h5>
                <m-button v-for="button in disabledButtons" :key="button.type" :type="button.type" disabled>
                    {{ button.label }}
                </m-button>
            </div>
        </div>
        <div class="round">
            <h2>圆角按钮</h2>
            <div class="buttons">
                <m-button v-for="button in defaultButtons" :key="button.type" :type="button.type" round>{{ button.label
                    }}</m-button>
            </div>
        </div>
        <div class="link">
            <h2>链接按钮</h2>
            <div class="buttons">
                <m-button v-for="button in defaultButtons" :key="button.type" :type="button.type" link>{{ button.label
                    }}</m-button>
            </div>
        </div>
        <div class="text">
            <h2>文字按钮</h2>
            <div class="buttons">
                <m-button v-for="button in defaultButtons" :key="button.type" :type="button.type" text>{{ button.label
                    }}</m-button>
            </div>
        </div>
      <!-- Button.vue -->
      <div class="icon_button">
        <h2>图标按钮</h2>
        <div class="buttons">
          <m-button type="primary" circle>
            <m-icon name="shouye"></m-icon>
          </m-button>
          <m-button type="info" circle>
            <m-icon name="kefu"></m-icon>
          </m-button>
          <m-button  type="primary" link >
            <m-icon name="shouye" ></m-icon>
          </m-button>
          <m-button :loading="isLoading" @click="toggleLoading" type="primary">提交
          </m-button>
        </div>
      </div>
    </div>

</template>

<style scoped lang="scss">
@use "@/style/variable.scss" as m;

.buttons-box {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: m.$width-container;
}
  h2 {
    text-align: center;
    padding: m.$spacing-xxs;
  }
.buttons {
  display: flex;
  align-items: center;
  margin: m.$spacing-xxs;
  gap: m.$spacing-xs;
  
.disabledButtons{
  display: flex;
  flex-direction: column;
    margin: m.$spacing-xxs;}
  }


</style>