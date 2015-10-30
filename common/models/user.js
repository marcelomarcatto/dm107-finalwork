module.exports = function(user) {
  // Disables auto defined ChangeStreans methods.
  user.disableRemoteMethod('createChangeStream', true);

};
