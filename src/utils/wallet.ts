class Wallet {
  /**
   * 格式化钱包地址，只显示前后各四个字符，中间用省略号表示。
   * @param address 钱包地址字符串
   * @returns 格式化后的地址字符串
   */
  static formatAddress(address: string): string {
    if (address.length < 9) {
      // 如果地址长度小于9，直接返回原地址
      return address;
    }
    // 否则，返回格式化的地址
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  }
}
export default Wallet;
