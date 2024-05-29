export function getFormattedCurrentTime(): string {
  // 获取当前日期和时间
  const now = new Date();

  // 格式化月份，确保两位数
  const month = now.getMonth() + 1; // JavaScript中月份是从0开始的，所以需要+1
  const formattedMonth = month < 10 ? `0${month}` : month;

  // 格式化日期，确保两位数
  const day = now.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;

  // 格式化小时，确保两位数
  const hours = now.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;

  // 格式化分钟，确保两位数
  const minutes = now.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // 组合成最终的格式
  return `${formattedMonth}-${formattedDay}[${formattedHours}:${formattedMinutes}]`;
}
