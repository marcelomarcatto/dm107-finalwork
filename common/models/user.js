module.exports = function(user) {
  // Disables auto defined ChangeStreans methods.
  user.disableRemoteMethod('createChangeStream', true);
  //send verification email after registration
  // user.afterRemote('create', function(context, user) {
  //   console.log('> user.afterRemote triggered');
  //   var options = {
  //     type: 'email',
  //     to: user.email,
  //     from: 'deliveries@inatel.br',
  //     subject: 'Deliveries registration confirmation.',
  //     template: path.resolve(__dirname, '../../server/views/verify.ejs'),
  //     redirect: '/verified',
  //     user: user
  //   };
  //   user.verify(options, function(err, response) {
  //     if (err) {
  //       next(err);
  //       return;
  //     }
  //     console.log('> verification email sent:', response);
  //     context.res.render('response', {
  //       title: 'The user has signed up successfully on delivery system',
  //       content: 'Please check your email and click on the verification link '
  //         + 'to confirm your email.',
  //       redirectTo: '/',
  //       redirectToLinkText: 'Log in'
  //     });
  //   });
  // });

};
