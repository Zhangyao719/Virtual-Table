# 浅析虚拟列表实现

| 属性       | 说明                 | 计算                  |
| ---------- | -------------------- | --------------------- |
| rowHeight  | 行高                 | 设置                  |
| n          | 可视区域展示多少行   | 设置                  |
| scrollTop  | 滑动距离             | 滚动事件              |
| startIndex | 可视区域第一行的下标 | scrollTop / rowHeight |
| endIndex   | 可视区域最后一行下标 | startTop + n - 1      |
| total      | 数据总条数           | /                     |

## 参考资料

https://juejin.cn/post/6877507011769008135

https://blog.csdn.net/YMX2020/article/details/120562140