module.exports = function(Delivery) {
    // Disables auto defined ChangeStreans methods.
    Delivery.disableRemoteMethod('createChangeStream', true);

    // GET listDeliveriesByDate
    Delivery.listDeliveriesByDate = function(initialDate, finalDate, callback) {
        var filters = [];
        if (initialDate) {
            initialDate.setDate(initialDate.getDate() + 1);
            // initialDate.setHours(0);
            filters.push({deliveryDate: {gte: initialDate}});
        }
        if (finalDate) {
            finalDate.setDate(finalDate.getDate() + 1);
            // finalDate.setHours(0);
            // finalDate.setMinutes(59);
            // finalDate.setSeconds(59);
            filters.push({deliveryDate: {lte: finalDate}});
        }
        console.log(filters);

        Delivery.find({where: {and: filters}}, function(error, results) {

                        var response = {};
                        if (!error) {
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
                        } else {
                            console.log(error);
                        }
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
