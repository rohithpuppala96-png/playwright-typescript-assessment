export class PriceUtil {
  static toCents(text: string): number {
    const amount = text.replace(/[^0-9.]/g, "");
    if (!amount) {
      throw new Error(`Could not read a price from "${text}"`);
    }
    return Math.round(parseFloat(amount) * 100);
  }
}