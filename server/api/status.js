function *status() {
  this.body = {
    status: 'ok'
  };
}

module.exports = {
  getAll: status
};
