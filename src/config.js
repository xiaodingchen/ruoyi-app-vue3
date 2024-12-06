// 应用全局配置

export default {
  baseUrl: import.meta.env.VITE_APP_BASE_API,
  appInfo: {
    // 应用名称
    name: import.meta.env.VITE_APP_TITLE,
    // 应用版本
    version: "1.1.0",
    // 应用logo
    logo: "/static/logo.png",
    // 官方网站
    site_url: "http://ruoyi.vip",
    // 政策协议
    agreements: [{
      title: "隐私政策",
      url: "https://ruoyi.vip/protocol.html"
    },
      {
        title: "用户服务协议",
        url: "https://ruoyi.vip/protocol.html"
      }
    ]
  }
}

