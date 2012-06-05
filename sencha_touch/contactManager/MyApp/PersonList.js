Ext.define('MyApp.PersonList', {
  extend : 'Ext.List',
  xtype : 'personlist',
  requires : ['MyApp.PersonStore'],
  config : {
    allowDeselect : false,
    itemTpl : '{lastname}, {firstname}',
    store : {
      type : 'personstore'
    },
    items : [
      {
        xtype : 'toolbar',
        title : 'People',
        docked : 'top'
      }
    ]
  }
});