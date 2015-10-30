module.exports = function(Delivery) {
    // Disables auto defined ChangeStreans methods.
    Delivery.disableRemoteMethod('createChangeStream', true);

    // GET listDeliveriesByDate
    Delivery.listDeliveriesByDate = function(initialDate, finalDate, callback) {
        var filters = [];

        if (initialDate) {
            initialDate.setDate(initialDate.getDate() + 1);
            filters.push({deliveryDate: {gte: initialDate}});
        }
        if (finalDate) {
            finalDate.setDate(finalDate.getDate() + 1);
            // Validate final greater than initial date
            if (initialDate && initialDate > finalDate) {
                var error = new Error('Final date ' + finalDate
                    + ' must be greater than initial date ' + initialDate);
                error.statusCode = 400;
                callback(error, null);
            }
            filters.push({deliveryDate: {lte: finalDate}});
        }

        if (!filters.length) {
            var error = new Error('At least one input parameter must be set.');
            error.statusCode = 400;
            callback(error, null);
        }

        Delivery.find({where: {and: filters}}, function(error, results) {
            var response = {};

            if (error) {
                callback(error, response);
            }

            results.forEach(function(delivery){

                var date = delivery.deliveryDate;
                if (!response[date]){
                    response[date] = {
                        'deliveriesCount': 0,
                        'isOwnerCount': 0
                    };
                }
                response[date].deliveriesCount = response[date].deliveriesCount + 1;
                if (delivery.receiverIsOwner) {
                    response[date].isOwnerCount = response[date].isOwnerCount + 1;
                }
            });
            callback(null, response);
        });
    }

    Delivery.remoteMethod('listDeliveriesByDate', {
        description: "Returns a deliveries report during a period between at least one of two dates.",
        accepts: [
            {arg: 'initialDate', type: 'date', description: "Initial date for the report (yyyy-mm-dd)."},
            {arg: 'finalDate', type: 'date', description: "Final date for the report (yyyy-mm-dd)."}
        ],
        returns: {arg: 'deliveries', type: 'object'},
        http: {path: '/listByDate', verb: 'get'}
    });

};
