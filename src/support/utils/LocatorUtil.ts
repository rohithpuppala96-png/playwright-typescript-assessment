export class LocatorUtil {
  static replaceHolders(template: string, ...values: string[]): string {
    return values.reduce(
      (locator, value) => locator.replace("replaceKey", value),
      template,
    );
  }
}
