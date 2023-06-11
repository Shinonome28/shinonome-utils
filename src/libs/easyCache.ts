import { AxiosRequestConfig } from "axios";
import axios from "axios";

interface CacheItem {
  url: string;
  isValid: () => boolean;
  data: unknown;
}

interface CacheMap {
  [propName: string]: CacheItem;
}

class CacheManager {
  private cacheMap: CacheMap = {};

  async makeRequest(
    url: string,
    config?: AxiosRequestConfig | undefined,
    isValid = () => true
  ): Promise<unknown> {
    const queryResult = this.query(url);
    if (queryResult !== undefined) {
      return Promise.resolve(queryResult);
    } else {
      const respoonse = await axios.get(url, config);
      this.cacheMap[url] = {
        url,
        isValid,
        data: respoonse.data,
      };
      return Promise.resolve(respoonse.data);
    }
  }

  query(url: string): unknown | undefined {
    if (url in Object.keys(this.cacheMap)) {
      if (this.cacheMap[url].isValid()) {
        return this.cacheMap[url].data;
      } else {
        delete this.cacheMap[url];
        return undefined;
      }
    }
    return undefined;
  }
}

const cacheManager = new CacheManager();
export default cacheManager;
