# 傅豪康个人网站发布版

这个文件夹里的内容可以直接上传到 GitHub Pages 仓库根目录。

## 适用于你的仓库

如果你要做的是 GitHub 用户主页仓库，仓库名必须是：

`haokang1999.github.io`

发布地址会是：

`https://haokang1999.github.io/`

我已经把站内链接全部处理成相对路径，这是目前最稳妥的 Pages 发布方式之一：

- 适合 `haokang1999.github.io` 这种用户主页仓库
- 也兼容普通项目仓库
- 不依赖额外构建工具

## 需要上传到仓库根目录的内容

- `index.html`
- `portfolio.html`
- `artwork.html`
- `404.html`
- `site-data.js`
- `script.js`
- `portfolio.js`
- `artwork.js`
- `styles.css`
- `.nojekyll`
- `assets/`
- `作品/`

## GitHub Pages 设置

1. 打开仓库 `haokang1999.github.io`
2. 把这个 `发布` 文件夹里的所有内容上传到仓库根目录
3. 进入 `Settings`
4. 打开 `Pages`
5. 在 `Build and deployment` 中选择 `Deploy from a branch`
6. Branch 选择 `main`
7. Folder 选择 `/ (root)`
8. 保存并等待发布

## 说明

- 当前版本不需要再改单独页面路径
- `index.html`、`portfolio.html`、`artwork.html` 都可以直接访问
- `404.html` 已加入，能在部分访问异常时回到首页

如果你的仓库实际名字不是 `haokang1999.github.io`，而是普通仓库名，那么访问地址会变成：

`https://haokang1999.github.io/仓库名/`

但因为我现在用的是相对路径，页面仍然可以正常工作。
