module.exports = function(app) {
    var User = app.models.user;
    // var Role = app.models.Role;
    // var RoleMapping = app.models.RoleMapping;

    User.create([{username: 'Admin', email: 'admin@inatel.br', password: 'Inatel2015'}],
        function(err, users) {
            if (err) {
                return err;
            }
        }
    );
}

    // // Create the admin role
    // Role.create({
    //   name: 'admin'
    // }, function(err, role) {
    //   if (err) return debug(err);
    //   debug(role);
    //
    //   // Make Admin an admin
    //   role.principals.create({
    //     principalType: RoleMapping.USER,
    //     principalId: users[0].id
    //   }, function(err, principal) {
    //     if (err) return debug(err);
    //     debug(principal);
    //   });
    // });
  // });
// };
