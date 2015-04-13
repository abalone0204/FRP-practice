(function(window) {

    // ===========================
    // Callback-way infrastructure
    // ===========================

    window.registerCallback = function(node, callback) {
        node.on("input", function() {
            var txt = $(this).val();
            callback(txt);
        });
    };

    window.requestSearch = function(text, callback) {
        if (text.replace(/\s/, '')) {
            var comparedText = text.toLowerCase().replace(/\s/, '-');
            var result = FILE_NAMES.filter(function(name) {
                if (name.match(comparedText)) {
                    return true;
                } else {
                    return false;
                }
            });
            callback(result);
        } else {
            callback(null);
        }

    };

    window.buildImages = function(answer) {
        var elements = answer.map(function(file) {
            return "<img src='./images/" + file + ".jpg'/>"
        });
        return elements;
    };

    window.swapChildren = function(selector, nodes) {
        selector.html("");
        if (nodes !== null) {
            nodes.forEach(function(node) {
                selector.append(node);
            });
        }
    };

    // ======================
    // FRP-way infrastructure
    // ======================

    Object.prototype.extractValueE = function(searchInput) {
        var text = $(searchInput).val().toLowerCase().replace(/\s/, '-');
        return text;
    };
    Object.prototype.mapE = function(reactiveFunc) {
        var result = reactiveFunc(this);
        return result;
    };
    Object.prototype.searchRequest = function(text) {
        var result = FILE_NAMES.filter(function(name) {
            console.log(name.match(text));
            if (name.match(text)) {
                return true;
            } else {
                return false;
            }
        });
        return result;
    };
    Object.prototype.getServiceObjectE = function(req) {
        var result = req.map(function(hero){
            if(hero){
                return "./images/"+hero+".jpg";
            }
        });
        return result;
    };

    Object.prototype.createImageNodes = function(nodes) {
        var imgNodes = nodes.map(function(node){
            if (node) {
                return "<img src='"+node+"'/>";
            }
        });
        return imgNodes;
    };

    window.insertDomE = function(imgNodes, selector){
        if(imgNodes.length !== 0){
            selector.html("");
            imgNodes.forEach(function(imgNode){
                selector.append(imgNode);
            });
        } else {
            selector.html("");
        }
    };









})(window);