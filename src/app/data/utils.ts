export function formatString(input: string): string {
  // 确保字符串长度至少为6，因为我们需要前两位和后四位
  if (input.length <= 6) {
    return input; // 如果输入的字符串长度不足6位，直接返回原字符串
  }

  // 提取前两位
  const start = input.substring(0, 2);
  // 提取后四位
  const end = input.substring(input.length - 4);

  // 组合新字符串
  return `*${start}...${end}`;
}

const ignoredPatterns = [
  ".DS_Store", // macOS系统文件
  // ".vscode", // VS Code配置文件夹
  // ".git", // Git版本控制文件夹
  // "node_modules", // Node.js依赖文件夹
  // "Thumbs.db", // Windows系统文件
  // ".idea", // IntelliJ IDEA配置文件夹
  // "*.log", // 日志文件
  // "*.tmp", // 临时文件
  // ".env", // 环境变量文件
  // ".cache", // 缓存文件夹
  // "dist", // 构建输出文件夹
  // "build", // 构建输出文件夹
  // ".next", // Next.js输出文件夹
  // ".nuxt", // Nuxt.js输出文件夹
  // "coverage", // 代码覆盖率报告文件夹
  // ".parcel-cache", // Parcel缓存文件夹
  // ".turbo", // TurboRepo缓存文件夹
  // "out", // 通常用于输出的文件夹
  // "tmp", // 临时文件夹
  // "*.swp", // Vim交换文件
  // "*.swo", // Vim交换文件
  // ".history", // 代码历史文件夹
  // ".eslintcache", // ESLint缓存文件
  // ".yarn", // Yarn缓存文件夹
  // ".pnp.*", // Yarn PnP文件
  // ".npm", // npm缓存文件夹
  // "yarn.lock", // Yarn锁定文件
  // "package-lock.json", // npm锁定文件
  // ".pnpm-debug.log", // pnpm调试日志
  // "npm-debug.log", // npm调试日志
  // "yarn-error.log", // Yarn错误日志
  // "*.iml", // IntelliJ IDEA模块文件
  // ".expo", // Expo项目文件夹
  // "Pods", // CocoaPods文件夹
  // "*.xcworkspace", // Xcode工作区文件
  // "*.xcuserstate", // Xcode用户状态文件
  // ".metadata", // Android Studio元数据文件夹
];

export const isIgnored = (path: string) => {
  return ignoredPatterns.some((pattern) => path.includes(pattern));
};
