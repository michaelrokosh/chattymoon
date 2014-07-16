Posts = new Meteor.Collection('posts');
Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // разрешаем редактировать только следующие два поля:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});

    // Удостоверимся что пользователь залогинен
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    // Проверим что у поста есть заголовок
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');

    // Проверим что нет других постов с таким же линком
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302,
        'This link has already been posted',
        postWithSameLink._id);
    }

    // Выберем поля разрешенные для публикации
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime(),
      commentsCount: 0,
      upvoters: [], 
      votes: 0
    });

    var postId = Posts.insert(post);

    return postId;
  },

  upvote: function(postId) {
    var user = Meteor.user();
    // удостоверимся, что пользователь залогинен
    if (!user)
      throw new Meteor.Error(401, "Надо залогиниться чтобы голосовать");
    
    Posts.update({
      _id: postId, 
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  }
});