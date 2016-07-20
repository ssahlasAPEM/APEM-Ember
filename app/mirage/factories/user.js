import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  username() {return faker.name.findName(); },
  type() {return faker.list.random('Admin','User')();},
  active(){return faker.random.boolean();},
  numOpportunities(){ '0' },
  selected(){return faker.random.boolean();}
});
