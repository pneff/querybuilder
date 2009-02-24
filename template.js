/**
 * Loads the template.html file and provides access to it.
 */
(function() {
    var t = YAHOO.namespace('querybuilder.template');
    var cache = {};

    /**
     * Template function by John Resig:
     * http://ejohn.org/blog/javascript-micro-templating/
     */
    function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +
                    // Convert the template into pure JavaScript
                    str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");
        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };
    
    /**
     * Returns the template with the given ID.
     */
    t.get = function(id) {
        var data = {'config': YAHOO.namespace('querybuilder.config')}
        return tmpl(id + '_tmpl', data);
    };
    
    /**
     * Apply a template and insert it as a new node with the "target" id.
     */
    t.apply = function(id, target) {
        var res = t.get(id);
        var node = document.createElement('div');
        node.setAttribute('id', target);
        node.innerHTML = res;
        document.body.appendChild(node);
    }

    /**
     * Load the template using XMLHttpRequest.
     */
    function loadTemplate() {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "querybuilder/template.html", false);
        xmlhttp.send(null);
        var el = document.createElement('div');
        el.setAttribute('id', 'templates');
        el.setAttribute('style', 'display:none;visibility:hidden;');
        el.innerHTML = xmlhttp.responseText;
        document.body.appendChild(el);
    }
    
    /**
     * Event triggered by onDOMReady event of the document.
     */
    function initEvent(ev) {
        loadTemplate();
    }
    
    YAHOO.util.Event.onDOMReady(initEvent);
})();
