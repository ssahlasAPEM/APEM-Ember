export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = 'api/v1';
  // this.timing = 400;

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */


}


// You can optionally export a config that is only loaded during tests
export function testConfig() {

  /*this.namespace = 'api/v1';
  this.timing = 400;
  this.passthrough('/write-blanket-coverage');

  // user profile
  // added here because fixtures are acting weird in testing
  this.get('/profile', () => {
    const response = {
      'data': {
        'type': 'profile',
        'id': 6,
        'attributes': {
          'user-id': 6,
          'client-id': 1,
          'user-name': 'Andrew Engstrom',
          'user-email': 'apengstrom@gmail.com',
          'user-image': 'http://www2.curiousm.com/wp-content/themes/curiousHome/images/curiousmLogoWhite.png',
          'user-integration': 'SALESFORCE'
        }
      }
    };
    return response;
  });

  this.get('/users', (db) => {
    const response = {
      data: db.users.map((attrs) => (
        { type: 'users', id: attrs.id, attributes: attrs }
      ))
    };
    return response;
  });*/
}
