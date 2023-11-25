
1.多入口情况下，使用CommonsChunkPlugin

2.通过externals配置提取常用库

3.利用DllPlugin和DllReferencePlugin预编译和加载

4.使用Happypack实现多线程加速

5.使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度
原理上采用了多核并行压缩来压缩速度

6.使用Tree-shaking和Scope Hoisting来剔除多余代码