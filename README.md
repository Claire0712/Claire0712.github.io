# 双语个人履历主页

这是一个无需构建步骤的静态个人主页，可直接部署到 GitHub Pages、Netlify、Vercel 或任意静态文件服务器。

## 本地运行

```bash
npm test
npm run preview
```

然后访问 `http://localhost:4173`。

## 填写真实资料

所有示例资料都集中在 [assets/data.js](assets/data.js)：

- `profile`：姓名、身份、简介、地点和联系邮箱；
- `research`：研究经历；
- `projects`：项目成果；
- `education`：教育背景；
- `awards`：奖项与荣誉。

每一条可见信息都必须同时保留 `zh` 和 `en` 字段。修改这里的示例资料后，网站会自动以中英双语显示；无需改动页面布局或交互代码。

## 发布到 GitHub Pages

网站已包含 `.nojekyll`，可直接作为静态 GitHub Pages 部署。创建一个公开 GitHub 仓库（例如 `my-website`）后，将本目录全部推送到仓库的默认分支；然后在 **Settings → Pages** 中选择 **Deploy from a branch**、分支 **main**、目录 **/(root)**。发布网址将是：

`https://Claire0712.github.io/my-website/`

如果仓库名称是 `Claire0712.github.io`，网址则是根域名：

`https://Claire0712.github.io/`

无需服务器、数据库或环境变量。
