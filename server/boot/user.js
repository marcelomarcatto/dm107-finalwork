module.exports = function(app) {
    var User = app.models.user;

    User.find({where: {or: [{username: 'default'},{email: 'default@inatel.br'}]}},
    function(error, results) {
        if (error) throw error;

        if (!results.length) {
            User.create([{username: 'default', email: 'default@inatel.br', password: 'Inatel2015'}],
            function(err, users) {
                if (err) throw err;
                console.log('Default user created');
            });
        }
    });
}
