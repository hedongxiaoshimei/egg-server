'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const _ = require('lodash');
const moment = require('moment');

class UserService extends Service {
	constructor(ctx) {
    super(ctx);
    this.UserModel = ctx.model.User
		this.session = ctx.session;
		this.ResponseCode = ctx.response.ResponseCode;
		this.ServerResponse = ctx.response.ServerResponse;
  }
  /**
   *
   * @param field {String}
   * @param value {String}
   * @return {Promise.<boolean>}
   */
  async _checkExistColByField(field, value) {
    const data = await this.UserModel.findOne({
      attributes: [field],
      where: {
        [field]: value
      },
    });
    return !!data;
  }


    /**
   * @feature 校验 username email
   * @param value {String}
   * @param type {String}
   * @return ServerResponse.msg
   */
  /**
   * @feature 校验 username email
   * @param value {String}
   * @param type {String}
   * @return ServerResponse.msg
   */
  async checkValid(type, value) {
    if (type.trim()) {
      if (type === 'username') {
        return await this._checkExistColByField(type, value) ?
          this.ServerResponse.createByErrorMsg('用户名已存在') :
          this.ServerResponse.createBySuccessMsg('用户名不存在');
      }
      if (type === 'email') {
        return await this._checkExistColByField(type, value) ?
          this.ServerResponse.createByErrorMsg('邮箱已存在') :
          this.ServerResponse.createBySuccessMsg('邮箱不存在');
      }
    }
    return this.ServerResponse.createByErrorMsg('参数错误');
  }


	async login(params) {
    const { username, password } = params;
		// 检查用户名
    const validResponse = await this.checkValid('username', username);
    if (validResponse.isSuccess()) return validResponse;

		// 检查密码是否正确
		const user = await this.UserModel.findOne({
      attributes: {
        exclude: ['password', 'user_extend']
      },
			where: {
				username,
				// password,
				password: md5(password),
			},
		});
    if (!user) return this.ServerResponse.createByErrorMsg('密码错误');
    const userInfo = user.toJSON()

    // 更新登录信息
    if (userInfo.login_time_now) {
      console.log('userInfo.login_time_now', userInfo.login_time_now)
      userInfo.login_time_last = moment(userInfo.login_time_now).format('YYYY-MM-DD HH:mm:ss');
    }
    userInfo.login_time_now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    this.UserModel.update(userInfo, {
      where: {
        user_id: userInfo.user_id
      },
    });
		let redirectTo = '';
		return this.ServerResponse.createBySuccessMsgAndData('登录成功', { ...userInfo, redirectTo });
	}

    /**
     * 新增用户
     */
	async add(params) {
    params.password = md5(params.password);
		try {
      const res = await this.UserModel.create(params, {
        attributes: {
          exclude: ['password']
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('try注册失败');
      _.unset(params, 'password');
      return this.ServerResponse.createBySuccessMsgAndData('注册成功', res.toJSON());
		} catch (e) {
      return this.ServerResponse.createByErrorMsg('catch注册失败');
		}
  }

  async delete(params) {
    try {
      const res = await this.UserModel.destroy({
        where: {
          user_id: params.id
        }
      });
      if (!res) return this.ServerResponse.createByErrorMsg('删除失败');
      return this.ServerResponse.createBySuccessMsgAndData('删除成功', res);
    } catch (e) {
      return this.ServerResponse.createByErrorMsg('catch删除失败');
    }
  }
  //编辑
	async edit(params) {
    // 更新时间
    params.password = md5(params.password);
    params.update_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
		try {
      const res = await this.UserModel.update(params, {
        where: {
          user_id: params.user_id
        },
        attributes: {
          exclude: ['password']
        },
        // individualHooks: true,
      });
      if (!res) return this.ServerResponse.createByErrorMsg('try编辑失败');
      return this.ServerResponse.createBySuccessMsgAndData('编辑成功', res);
		} catch (e) {

      return this.ServerResponse.createByErrorMsg('catch编辑失败');
		}
	}

  async detail(id) {
    try {
      const res = await this.UserModel.findOne({
        attributes: {
          exclude: ['password']
        },
        where: {
          user_id: id
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('detail查询失败');
      return this.ServerResponse.createBySuccessMsgAndData('detail查询成功', res.toJSON());
    } catch (e) {
      return this.ServerResponse.createByErrorMsg('catch获取详情失败');
    }
  }

  //分页查询/全部查询
  async list(params) {
    if (params.pageNum > 0) {
      const {
        count,
        rows
      } = await this.UserModel.findAndCount({
        where:{
          role: params.type ? Number(params.type) : [0, 1, 2, 3, 4],
          dept: params.dept ? Number(params.dept) : [0, 1, 2, 3, 4],
        },
        offset: Number(params.pageNum) - 1,
        limit: Number(params.pageSize)
      });
      return this.ServerResponse.createBySuccessMsgAndData('用户列表查询成功', {
        list: rows || list,
        count: rows.length || 0,
        total: count,
      });
    } else {
      const list = await this.UserModel.findAll({
        where: {
          role: params.type ? Number(params.type) : [0, 1, 2, 3, 4],
          dept: params.dept ? Number(params.dept) : [0, 1, 2, 3, 4],
        },
      });
      return this.ServerResponse.createBySuccessMsgAndData('用户列表查询成功', {
        list: list,
        total: list.length
      });
    }
	}
}

module.exports = UserService;
