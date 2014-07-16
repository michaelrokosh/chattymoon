Template.comment.helpers({
  submittedText: function() {
    return new Date(this.submitted).toString();
  },

  ownComment: function() {
  	return this.userId == Meteor.userId();
  }
});