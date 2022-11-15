export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api/v1';    // make this `api`, for example, if your API is namespaced
  this.timing = 2000;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

  //get all users
  this.get('/users',(schema)=>{
    return schema.users.all();
  });

  //get a single user
  this.get('/users/:id',(schema,request)=>{
    var id = request.params.id;

    return schema.users.find(id);
  });

  //get all opportunities
  this.get('/opportunities',(schema)=>{
    return schema.opportunities.all();
  });

  //get a single opportunity
  this.get('/opportunities/:id',(schema,request)=>{
    var id = request.params.id;

    return schema.opportunities.find(id);
  });

}
