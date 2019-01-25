'use strict';

module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  const { router, controller } = app;
  router.post('/api/user/login', controller.api.user.login);
  router.post('/api/user/add',  controller.api.user.add);
  router.post('/api/user/edit', checkLogin, controller.api.user.edit);
  router.post('/api/user/delete', checkLogin, controller.api.user.delete);
  router.get('/api/user/logout', controller.api.user.logout);
  router.get('/api/user/list',  controller.api.user.list);
  router.get('/api/user/detail/:id', checkLogin, controller.api.user.detail);
};
