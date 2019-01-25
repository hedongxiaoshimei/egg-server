'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const _ = require('lodash');

class SystemLogService extends Service {

  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @feature 校验 username email
   * @param value {String}
   * @param type {String}
   * @return ServerResponse.msg
   */
  async checkValid(type, value) {
    if (type.trim()) {

    }
    return this.ServerResponse.createByErrorMsg('参数错误');
  }

  async add(params, request, response) {
    try {
      // console.log('params', params);
      // console.log('request', request);
      // console.log('response', response);
      const arg = {
        user_id: params.employee_id || params.id || 1, // 有待考虑 客户端取
        user_name: params.employee_id || params.id || 1, // 有待考虑 客户端取
        url: request.url,
        method: request.method,
        params: JSON.stringify(params),
        ip: 1000000, // 客户端取
      };
      console.log('arg', arg);
      const res = await this.ctx.model.SystemLog.create(arg);
    } catch (e) {
      return this.ServerResponse.createByErrorMsg('catch添加失败');
    }
  }


}

module.exports = SystemLogService;

