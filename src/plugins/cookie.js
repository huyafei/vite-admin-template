/**
 * @name: cookie
 * @author: yfhu
 * @date: 2021/10/18 15:04
 * @description：cookie
 * @update: 2021/10/18 15:04
 */
import Cookies from "js-cookie";
import {version} from "../../package.json";

const prefix = `__${version}__`;

export default {
  get(name) {
    return Cookies.get(prefix + name);
  },
  set(name, value, options) {
    if (typeof value === "object") {
      value = JSON.stringify(value)
    }
    Cookies.set(prefix + name, value, options);
  },
  remove(name, options) {
    Cookies.remove(prefix + name, options);
  },
  getJSON(name) {
    const value = Cookies.get(prefix + name)
    return value ? JSON.parse(value) : value;
  }
};
