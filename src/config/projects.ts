import type { SiteConfig } from '../types/project'

const siteConfig: SiteConfig = {
  title: 'cubegao',
  description: 'Full-Stack Developer',
  github: 'cubegao',
  showHero: true,

  projects: [
    {
      id: 'unlock-door',
      name: '开门啦',
      description: '一键快速开门，无需再打开微信小程序。通过解析门禁请求，把开门能力做成一个轻量 Web 页面，支持分享链接和 Bark 推送通知。',
      icon: '🚪',
      tags: ['JavaScript', 'PWA', 'Fetch API'],
      path: '/unlock-door/',
      featured: true,
    },
  ],
}

export default siteConfig
