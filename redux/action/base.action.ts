export class BaseAction {
  protected static readonly className: string = 'BaseAction';
  /**
   * getActType - unites action name with action class name.
   *
   * @static
   * @param  {string} name - action name
   * @return {string}
   */
  public static getActType (name: string): string {
      return `${this.className}:${name}`;
  }
}
