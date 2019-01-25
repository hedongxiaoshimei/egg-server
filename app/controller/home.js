'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg服务启动啦';
  }
}

module.exports = HomeController;
