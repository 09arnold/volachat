/**
 * @file Wrapper for the localStorage API with convenience methods
 * 
 * @author Arnold Quist <09arnold.aq@gmail.com>
 */

/**
 * Wrapper for the built in localStorage API
 * @type {Object}
 * @module AppStorage
 */
// var AppStorage = Object;
const AppStorage = {

  /**
   * Remove all items stored in localStorage by AppStorage
   * @return {Array} Array of items removed from AppStorage
   */
  clear: function() {
    var items = [];
    this.keys.forEach( function( item ) {
      if(item !== "AppStorage") {
        items.push( AppStorage.getItem(item) );
        AppStorage.removeItem( item );
      }
    });
    return items;
  },

  /**
   * Get all items from localStorage
   * @memberOf module:AppStorage
   * @return {Object} Everything in localStorage as an Object
   */
  getAll: function( ) {
    var all = {};
    Object.getOwnPropertyNames( localStorage ).forEach( function( item, index ) {
      all[ item ] = AppStorage.getItem( item );
    } );

    return all;
  },

  /**
   * Gets an item from localStorage using a key
   * @param  {String} key The key corresponding to the object/value to b retrieved
   * @memberOf module:AppStorage
   * @return {Object}      The Object/Value to get
   */
  getItem: function( key ) {
    if ( typeof( key.toString( ) ) !== "string" ) {
      console.error( 'AppStorage.getItem requires one string parameter. Invalid parameter passed' );
      return;
    }
    var object = JSON.parse( localStorage.getItem( key ) );
    if ( object ) {
      return object;
    } else {
      console.warn( key + ' not found in AppStorage' );
      return null;
    }
  },

  init: function (){
    var expiries = this.getItem('AppStorage') ? this.getItem('AppStorage')._expiryItems : null;

    if(!expiries){
      return;
    }

    var _this = this;

    Object.getOwnPropertyNames(expiries).forEach(function(v,i){

      if(_this.getItem(v)) {
        clearTimeout(expiries[v].timeoutId);
        clearTimeout(expiries[v].expiryWarningId);
        var ttl = new Date(expiries[v].expiresAt).getTime() - new Date().getTime();
        ttl /=1000;
        expiries[v].options.ttl = ttl;
        _this.setItem(v,_this.getItem(v),expiries[v].options);
      } else {
        delete expiries[v];
      }

    });

    this.setItem('AppStorage',this);
  },

  /**
   * Retunrs an item with a specified key from localStorage and DELETES it. Gives a console warning if the object is not found
   * @param  {String} item The key to be removed from localStorage
   * @memberOf module:AppStorage
   * @return {Object}      Object/Value to remove from localStorage
   */
  removeItem: function( item ) {

    if ( typeof( item.toString( ) ) !== "string" ) {
      console.error( 'AppStorage.removeItem requires one string parameter. Invalid parameter passed' );
      return;
    }

    var object = JSON.parse( localStorage.getItem( item ) );

    localStorage.removeItem( item );

    if ( object ) {
      console.warn('[' + new Date().toLocaleString() + ']', '[' + item + '] removed from AppStorage' );
      if(this._expiryItems[item]){
        clearTimeout(this._expiryItems[item].timeoutId);
        if(this._expiryItems[item].expiryWarningId)
          clearTimeout(this._expiryItems[item].expiryWarningId);
      }
      delete this._expiryItems[item];
      this.keys.delete(item);
      this.init();
      return object;
    } else {
      console.info( item + ' not found in AppStorage' );
    }
  },

  /**
   * Add an item into localStorage under a key. Updates the value of the key if the key already exists
   * @param {String} key    The key to set on the value to add, or the key whose value is to be updated
   * @param {Object} item    The Object/Value to save in localStorage
   * @param {Object} options JSON Object with options for saving to localStorage
   * @memberOf module:AppStorage
   */
  setItem: function( key, item, options ) {
    try {
      item = JSON.stringify( item );
      localStorage.setItem( key, item );
      this.keys.add(key);
      if(options && options.ttl && typeof(Number(options.ttl)) == "number"){

        var expires = new Date(
          new Date().getTime() + (options.ttl * 1000)
        );
        console.info(
          '[' + new Date().toLocaleString() + ']', 
          '[' + key + '] in AppStorage will expire at ' + expires.toLocaleString()
        );


        var timeoutID = setTimeout(function(){

          var dataExpiredEvent = new CustomEvent('data-expiry',{
            'detail': {
              'data': AppStorage.getItem(key),
              'name': options.notiName,
              'type': 'expiry'
            }
          });

          document.dispatchEvent(dataExpiredEvent);

          console.warn('[' + new Date().toLocaleString() + ']', '[' + key + '] in AppStorage expired');

          AppStorage.removeItem(key);
        },Number(options.ttl) * 1000);

        if( options.expiryWarning ){
          var warn = Number(options.ttl) - Number(options.expiryWarning);
          if( Number(options.ttl) < Number(options.expiryWarning) ){
            console.info('Expiry warning is set to be triggered AFTER actual expiry, skipping expiry warning setting');
          } else {
            var expiryWarningId = setTimeout(function(){
              var dataExpiredEvent = new CustomEvent('data-expiry',{
                'detail': {
                  'data': key,
                  'name': options.notiName,
                  'type': 'expiry-warning'
                }
              });

              document.dispatchEvent(dataExpiredEvent);

              console.info('[' + new Date().toLocaleString() + ']', '[' + key + '] in AppStorage expires in ' + (options.expiryWarning) + ' seconds');
            },Number(warn * 1000));
          }
        }
        this._expiryItems[key]= {
          'timeoutId': timeoutID,
          'expiryWarningId':expiryWarningId,
          'expiresAt': expires,
          'options' : options
        };

        this.setItem('AppStorage',this);
      }
    } catch ( e ) {
      throw ("Invalid JSON object", e);
    }
  },

  /**
   * List of objects representing keys and timestamps when the data associated with those keys expire 
   * @type {Array}
   */
  _expiryItems: {},

  keys: new Set(),

};

AppStorage.init();

window.AppStorage = AppStorage;

export default AppStorage;