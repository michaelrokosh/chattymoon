Template.layout.helpers({
  pageTitle: function() { return Session.get('pageTitle'); }
});

// autorun
//Session.set('pageTitle', 'A brand new title 3');
/*
Deps.autorun(function() {
  alert(Session.get('pageTitle'));
});
*/