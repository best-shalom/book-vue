// npm install eslint @babel/eslint-parser eslint-plugin-vue@next --save-dev
module.exports = {
    // 环境定义
    root: true,
    env: {
        node: true,
    },
    extends: [
        // 继承规则扩展
        'eslint:recommended',
        'plugin:vue/vue3-essential',
    ],
    // 解析器选项
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    // 自定义规则
    rules: {
        // 关闭命名规则校验
        "vue/multi-word-component-names":"off",
    },
};
