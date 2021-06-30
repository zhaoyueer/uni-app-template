import { addParams, getCurrentUrl } from '@/utils/url';
import store from '@/store';
import { UPDATED_JUMPED } from '@/store/modules/global';
interface Setting {
  useHeaderAuth?: boolean;
  /** 验权失败 401 403 跳转至登录页 */
  authFailNotJump?: boolean;
  /** 服务器接口错误 跳至fail页面 */
  serviceErrorNotJump?: boolean;
  showLoading?: boolean;
  loadingTitle?: string;
}

export enum ErrorCode {
  authExpired,
  apiError,
}

type RequestOptionsWithoutCallback = Omit<
  UniApp.RequestOptions,
  'success' | 'fail' | 'complete'
>;

/**
 * 防止同一时间多个接口出错, 导致连续多次跳转
 */
const canJump = () => {
  if (store.state.global.requestJumped) {
    return false;
  } else {
    store.commit(`global/${UPDATED_JUMPED}`, true);
    return true;
  }
};

const serviceErrorJump = () => {
  if (canJump()) {
    uni.redirectTo({
      url: addParams('/pages/fail/index', {
        redirectUrl: getCurrentUrl(),
      }),
    });
  }
};

const authFailLogin = () => {
  // jump login
};

export default async function request<T = unknown>(
  options: RequestOptionsWithoutCallback,
  setting?: Setting,
): Promise<T> {
  const {
    useHeaderAuth,
    authFailNotJump,
    serviceErrorNotJump,
    showLoading,
    loadingTitle,
  } = setting || {};
  const { header, ...extra } = options || { header: {} };

  let reqHeader = {
    ...header,
  };
  if (useHeaderAuth) {
    reqHeader = {
      ...reqHeader,
      // auth
    };
  }

  if (showLoading) {
    uni.showLoading({ mask: true, title: loadingTitle });
  }

  return new Promise((resolve, reject) => {
    return uni.request({
      ...extra,
      header: reqHeader,
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve(res.data as T);
        } else if (res.statusCode === 401 || res.statusCode === 403) {
          if (!authFailNotJump) {
            authFailLogin();
          } else {
            reject({
              errorCode:
                (res.data as Record<string, unknown>)?.errorCode ||
                ErrorCode.authExpired,
              errorMessage: res.data,
            });
          }
        } else if (res.statusCode >= 500) {
          if (!serviceErrorNotJump) {
            // 服务器错误统一跳fail页面, 方便重新加载
            serviceErrorJump();
          } else {
            reject({
              errorCode:
                (res.data as Record<string, unknown>)?.errorCode ||
                ErrorCode.apiError,
            });
          }
        } else {
          reject({
            errorCode:
              (res.data as Record<string, unknown>)?.errorCode ||
              ErrorCode.apiError,
          });
        }
      },
      fail: (res: UniApp.GeneralCallbackResult) => {
        if (!serviceErrorNotJump) {
          // 网络出错统一跳fail页面, 方便重新加载
          serviceErrorJump();
        } else {
          reject({ errorCode: ErrorCode.apiError, errorMessage: res });
        }
      },
      complete: () => {
        if (showLoading) {
          uni.hideLoading();
        }
      },
    });
  });
}
