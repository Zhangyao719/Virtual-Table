const RootComponent = {
    name: 'app',
    setup() {
        const { ref, computed} = Vue
        const rowHeight = ref(55) // 行高
        const n = ref(10) // 可视区域展示条数
        const data = ref(Array.from({ length: 100 }, (_, index) => index + 1)) // 模拟数据(100条)

        const contentHeight = computed(() => {
            return data.value.length * rowHeight.value
        })

        const onScroll = e => {
            console.log(' ~ e', e.target.scrollTop)
        }

        return {
            rowHeight,
            n,
            data,
            contentHeight,
            onScroll
        }
    }
}

const app = Vue.createApp(RootComponent)
const vm = app.mount('#app')
