/**
 * Set up the basic UI
 */
(function() {
    // The configuration provided by the user.
    var config = YAHOO.namespace('querybuilder.config');
    
    // Other modules
    var template = YAHOO.namespace('querybuilder.template');
    
    /**
     * Event triggered by onDOMReady event of the document.
     */
    function initEvent(ev) {
        template.apply('homescreen', 'homescreen');
    }
    
    /**
     * Event triggered by the resize event of the window.
     */
    function resizeEvent(ev) {
        
    }


    YAHOO.util.Event.onDOMReady(initEvent);
    YAHOO.util.Event.on(window, 'resize', resizeEvent);
})();
