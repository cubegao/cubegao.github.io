/** 单个项目的配置项 */
export interface Project {
  /** 项目唯一标识（用于 key） */
  id: string
  /** 项目名称 */
  name: string
  /** 项目简要描述 */
  description: string
  /** 项目图标（推荐 emoji） */
  icon: string
  /** 技术栈标签 */
  tags: string[]
  /** 跳转路径（相对于站点根目录，如 "/audiofield/"） */
  path: string
  /** 是否置顶（可选，默认 false） */
  featured?: boolean
  /** 是否新增（可选，用于标记最新项目） */
  isNew?: boolean
}

/** 站点全局配置 */
export interface SiteConfig {
  /** 站点标题 */
  title: string
  /** 站点描述 */
  description: string
  /** GitHub 用户名 */
  github: string
  /** 是否显示 Hero 个人简介区（默认 true） */
  showHero?: boolean
  /** 项目列表 */
  projects: Project[]
}
