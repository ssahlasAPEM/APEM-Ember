import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  events: DS.hasMany('event'),
  draft: DS.attr('boolean', { defaultValue: false }),
  status: DS.attr('string', { defaultValue: null }),
  stage: DS.attr('string', { defaultValue: 'quote' }),
  state: DS.attr('string', { defaultValue: 'Open' }),
  company : DS.attr('string', { defaultValue: null }),
  address : DS.attr('string', { defaultValue: null }),
  city : DS.attr('string', { defaultValue: null }),
  stateCounty : DS.attr('string', { defaultValue: null }),
  mailCode : DS.attr('string', { defaultValue: null }),
  country : DS.attr('string', { defaultValue: null }),
  contactName : DS.attr('string', { defaultValue: null }),
  contactTitle : DS.attr('string', { defaultValue: null }),
  contactPhone : DS.attr('string', { defaultValue: null }),
  contactEmail : DS.attr('string', { defaultValue: null }),
  salesRepAgent : DS.attr('string', { defaultValue: null }),
  distributor : DS.attr('string', { defaultValue: null }),
  apemSalesPerson : DS.attr('string', { defaultValue: null }),
  sraSalesRep : DS.attr('string', { defaultValue: null }),
  distributorSalesperson : DS.attr('string', { defaultValue: null }),
  industry : DS.attr('string', { defaultValue: null }),
  application : DS.attr('string', { defaultValue: null }),
  reasonForOpp : DS.attr('string', { defaultValue: null }),
  function : DS.attr('string', { defaultValue: null }),
  catalogProduct : DS.attr('boolean', { defaultValue: true }),
  catalogPartNum : DS.attr('string', { defaultValue: null }),
  productType : DS.attr('string', { defaultValue: null }),
  productSeries : DS.attr('string', { defaultValue: null }),
  apemPartNum : DS.attr('string', { defaultValue: null }),
  briefDescription : DS.attr('string', { defaultValue: null }),
  extendedDescription : DS.attr('string', { defaultValue: null }),
  currentSupplier : DS.attr('string', { defaultValue: null }),
  competitors : DS.attr('string', { defaultValue: null }),
  year1SalesVol : DS.attr('string', { defaultValue: null }),
  year2SalesVol : DS.attr('string', { defaultValue: null }),
  year3SalesVol : DS.attr('string', { defaultValue: null }),
  currency : DS.attr('string', { defaultValue: null }),
  targetSalesPrice : DS.attr('string', { defaultValue: null }),
  potentialAnnualRev : DS.attr('string', { defaultValue: null }),
  probabilityOfWin : DS.attr('string', { defaultValue: null }),
  expectedValue : DS.attr('string', { defaultValue: null }),
  quoteDate : DS.attr('string', { defaultValue: null }),
  estimatedProdDate: DS.attr('string', { defaultValue: null }),
  sampleDate : DS.attr('string', { defaultValue: null }),
  approvalDate : DS.attr('string', { defaultValue: null }),
  dateRcvdProdOrder : DS.attr('string', { defaultValue: null }),
  prodSalesOrderNum : DS.attr('string', { defaultValue: null }),
  reasonForWin : DS.attr('string', { defaultValue: null }),
  dateLost : DS.attr('string', { defaultValue: null }),
  lostToWhom : DS.attr('string', { defaultValue: null }),
  reasonForLoss : DS.attr('string', { defaultValue: null }),
  commentField : DS.attr('string', { defaultValue: null }),
  createdAt : DS.attr('string', { defaultValue: null }),
  updatedAt : DS.attr('string', { defaultValue: null }),
  newRecord : DS.attr('boolean', { defaultValue: false }),
  userId : DS.attr('string', { defaultValue: null })
});
