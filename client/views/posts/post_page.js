Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  },
});

Template.comment.events({
  'click .delete-comment': function(e) {
    e.preventDefault();
    if(confirm("Delete this comment?")) {
      var currentCommentId = this._id;
      Comments.remove(currentCommentId);
    }
  }
})