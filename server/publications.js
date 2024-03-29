Meteor.publish('posts', function(options) {
  return Posts.find({}, options);
});

Meteor.publish('comments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(commentId){
  return Notifications.find({userId: this.userId});
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});