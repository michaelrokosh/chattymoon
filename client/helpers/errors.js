// Локальная коллекция, доступна только на клиенте
Errors = new Meteor.Collection(null);
// добавляє документ в базу даних клієнта minimongo
throwError = function(message) {
  Errors.insert({message: message})
}
clearErrors = function() {
  Errors.remove({seen: true});
}
