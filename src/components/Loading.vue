<script setup lang="ts">

</script>

<template>
  <div class="loading-container">
    <div class="truck"></div>
    <div class="road"></div>
    <p>物流信息加载中...</p>
  </div>

</template>


<style scoped lang="scss">
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:100vh;
}

.truck {
  width: 60px;
  height: 30px;
  background: #1890ff; /* 蓝色代表物流常见主题色 */
  border-radius: 5px;
  position: relative;
  animation: moveTruck 1.5s infinite ease-in-out;
}

.truck::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  background: #333;
  border-radius: 50%;
  bottom: -10px;
  left: 10px; /* 左轮胎 */
}

.truck::before {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  background: #333;
  border-radius: 50%;
  bottom: -10px;
  right: 10px; /* 右轮胎 */
}

.road {
  width: 120px;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    #999 0px,
    #999 10px,
    transparent 10px,
    transparent 20px
  );
  margin-top: 20px;
}

p {
  margin-top: 20px;
  font-size: 16px;
  color: #666;
  font-family: 'Arial', sans-serif;
}

@keyframes moveTruck {
  0% { transform: translateX(-30px); }
  50% { transform: translateX(30px); }
  100% { transform: translateX(-30px); }
}
</style>