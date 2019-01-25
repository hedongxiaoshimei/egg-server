'use strict';

const Controller = require('egg').Controller;

const Parameter = require('parameter');
const jwt = require('jsonwebtoken');
const Check = new Parameter();

class UserController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.UserService = ctx.service.user;
    this.session = ctx.session;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  // 登录
  async login() {
    // const token = jwt.sign({
    //   foo: 'bar'
    // }, 'shhhhh');

    const params = this.ctx.request.body;
    const response = await this.UserService.login(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
    if (response.isSuccess()) {
      this.session.currentUser = response.getData();
      console.log('this.session.currentUser', this.session);
    }
    this.ctx.body = response;
  }

  // 登出
  async logout() {
    this.ctx.session = null;
    this.ctx.body = this.ServerResponse.createBySuccess();
  }

  async add() {
    const params = this.ctx.request.body;
    const response = await this.UserService.add(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
  }

  async delete() {
    const params = this.ctx.request.body;
    const response = await this.UserService.delete(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
  }

  async edit() {
    const params = this.ctx.request.body;
    const response = await this.UserService.edit(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
  }

  async detail() {
    // const { id } = this.ctx.query;
    const { id } = this.ctx.params;
    const response = await this.UserService.detail(id);
    this.ctx.body = response;
  }

  async list() {
    const params = this.ctx.query;
    const users = await this.UserService.list(params);
    this.ctx.body = users;
  }

}

module.exports = UserController;
