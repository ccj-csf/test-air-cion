import { BigNumber } from 'bignumber.js';

export const formatNumberWithCommas = (n: number = 0) => {
  // 将数字转为字符串
  const numString = n.toString();

  // 使用正则表达式在数字中插入逗号
  return numString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumberToK = (number: number = 0) => {
  if (number >= 1000) {
    const result = (number / 1000).toFixed(2);
    let withoutDecimal = result.replace(/0+$/, ''); // 去掉小数部分末尾的零
    if (withoutDecimal.endsWith('.')) {
      withoutDecimal = withoutDecimal.substring(0, withoutDecimal.length - 1);
    }
    return withoutDecimal + 'k';
  }
  return number.toString();
};

export const ellipsisAddress = (text: string) => {
  return `${text.substring(0, 6)}...${text.substring(text.length - 3, text.length)}`;
};

export const formatEth = (numStr: string | number) => {
  return BigNumber(numStr || 0)
    .div(10 ** 18)
    .toString();
};

/**
 * 格式化数字到指定的小数位数。
 * @param value 数字或数字字符串，将被格式化为字符串。
 * @param decimalPlaces 小数位数，默认为4。指定保留的小数位数。
 * @returns 格式化后的数字字符串。
 * @throws 如果value不能转换为有效的数字，抛出错误。
 */
export const formatNumberWithFixedDecimalPlaces = (
  value: number | string,
  decimalPlaces = 4,
): string => {
  // 将value转换为数字
  const numericValue = Number(value);

  // 检查转换后的值是否是有效的数字
  if (isNaN(numericValue)) {
    throw new Error('无效输入：值必须是一个数字或代表数字的字符串。');
  }

  // 使用Intl.NumberFormat来格式化数字，确保总是显示指定的小数位数
  const formatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimalPlaces, // 动态设置小数位数
    maximumFractionDigits: decimalPlaces, // 确保小数位数一致
  });

  return formatter.format(numericValue);
};
