const RootComponent = {
    name: 'app',
    setup() {
        const { ref, computed } = Vue

        /* 前置配置 */
        const rowHeight = ref(55) // 设置行高
        const limit = ref(5) // 设置可视区域展示条数
        const data = ref(Array.from({ length: 100 }, (_, index) => ({
            index,
            title: `第${index + 1}条数据`
        }))) // 模拟数据(100条)
        const total = computed(() => data.value.length)
        const contentHeight = computed(() => total.value * rowHeight.value)
        
        /* 可视区域 起始下标初始值 */
        const originStartIndex = ref(0)
        const startIndex = ref(0)
        const endIndex = ref(limit.value)

        // 可视区域数据（根据startIndex, endIndex动态截取）
        const contentData = computed(() => data.value.slice(startIndex.value, endIndex.value))

        const onScroll = e => {
            const currentIndex = Math.floor(e.target.scrollTop / rowHeight.value)
            if (originStartIndex.value !== currentIndex) {
                console.log(222);
                originStartIndex.value = currentIndex
                startIndex.value = currentIndex
                endIndex.value = Math.min(currentIndex + limit.value, total.value - 1)
                console.log(startIndex.value, endIndex.value, contentData.value);
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
