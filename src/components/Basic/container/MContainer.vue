<!-- /src/components/Basic/container/MContainer.vue -->
<template>
    <div class="m-container" :class="direction">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

// Define component name for detection
defineOptions({
    name: 'MContainer',
});

const slots = useSlots();

// Compute flex direction based on child components
const direction = computed(() => {
    if (slots.default) {
        const vnodes = slots.default();
        const hasHeaderOrFooter = vnodes.some((node) => {
            // Type-safe check for component name
            return (
                node.type &&
                typeof node.type === 'object' &&
                'name' in node.type &&
                (node.type.name === 'MHeader' || node.type.name === 'MFooter')
            );
        });
        return hasHeaderOrFooter ? 'vertical' : 'horizontal';
    }
    return 'vertical'; // Default to vertical if no slots
});
</script>

<style lang="scss" scoped>
.m-container {
    display: flex;
    height: 100vh;
    gap: $space-1;

    &.vertical {
        flex-direction: column;
    }

    &.horizontal {
        flex-direction: row;
    }

    // Child component styles
    .m-header,
    .m-footer {
        flex-shrink: 0; // Prevent shrinking
        background-color: $primary;
    }

    .m-aside {
        width: $default-width;
        background-color: $primary;
    }

    .m-main {
        flex: 1;
        background-color: $primary;
    }

    .m-footer {
        background-color: $gray-300;
    }
}
</style>