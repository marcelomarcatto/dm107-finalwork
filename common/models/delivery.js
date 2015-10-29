module.exports = function(Delivery) {
// Disables auto defined ChangeStreans methods.
    Delivery.disableRemoteMethod('createChangeStream', true);
    Delivery.listDeliveriesByDate = function(callback) {

        Delivery.find({
                where: {deliveryDate: {lt: Date.now()}}
            },
            function(error, results) {
            var response = {};
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
        //accepts: {arg: 'startDate', type: 'date'},
        returns: {arg: 'deliveries', type: 'object'},
        http: {path: '/listByDate', verb: 'get'}
    });

};
