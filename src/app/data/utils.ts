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
