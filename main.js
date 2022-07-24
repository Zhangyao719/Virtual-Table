const RootComponent = {
    name: 'app',
    setup() {
        const { ref, computed } = Vue

        /* 前置配置 */
        const rowHeight = ref(55) // 设置行高
        const limit = ref(5) // 设置可视区域展示条数
        const data = ref(Array.from({ length: 1000 }, (_, index) => ({
            index,
            title: `第${index + 1}条数据`
        }))) // 模拟数据(100条)
        const total = computed(() => data.value.length)
        const contentHeight = computed(() => total.value * rowHeight.value)
        
        /* 可视区域 起始下标初始值 */
        const originStartIndex = ref(0)
        // const startIndex = ref(0)
        // const endIndex = ref(limit.value)
        const bufferSize = 20 // 用于缓冲（防止滚动过快，出现白屏）
        const startIndex = computed(() => Math.max(originStartIndex.value - bufferSize, 0))
        const endIndex = computed(() => Math.min(startIndex.value + limit.value + bufferSize, total.value))

        // 可视区域数据（根据startIndex, endIndex动态截取）
        const contentData = computed(() => data.value.slice(startIndex.value, endIndex.value))

        const onScroll = e => {
            const currentIndex = Math.floor(e.target.scrollTop / rowHeight.value)
            // 只有当滑到下一条数据时， 才去更新
            if (originStartIndex.value !== currentIndex) {
                originStartIndex.value = currentIndex
                startIndex.value = currentIndex
                endIndex.value = Math.min(currentIndex + limit.value, total.value - 1)
            }
        }

        return {
            rowHeight,
            limit,
            data,
            total,
            contentHeight,
            contentData,
            onScroll
        }
    }
}

const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
