module.exports = function(Delivery) {
  // Disables auto defined ChangeStreans methods.
  Delivery.disableRemoteMethod('createChangeStream', true);
  Delivery.listDeliveriesByDate = function(cb) {
      cb(null, 'Test');
    }

    Delivery.remoteMethod(
        'listDeliveriesByDate',
        {
          //accepts: {arg: 'msg', type: 'string'},
          returns: [
            {arg: 'deliveryDate', type: 'date'},
            {arg: 'deliveriesCount', type: 'int'},
            {arg: 'isOwnerCount', type: 'int'}
          ],
          http: {path: '/listByDate', verb: 'get'}
        }
    );

};
