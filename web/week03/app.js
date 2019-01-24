//Holds event handlers wired up in the HTML
var uiOptions = {

};

//Copied this solution for formatting money from StackOverflow
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

(function () {

    /* ----------------------------------------------------------------------
     Private member variables
     ---------------------------------------------------------------------- */
    var highlightedProducts = [];
    var catalog = [];
    var shoppingCart = [];
    var sliderIndex = 0;

    validationState = {
        nameInvalid: false,
        addressInvalid: false,
    };

    function initializeForm() {
        //Make a network request to get the catalog
        var calalogRequest = new XMLHttpRequest();
        calalogRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                catalog = JSON.parse(this.responseText).items;

                for (var i = 0; i < catalog.length; i++) {
                    catalog[i].id = i;

                    if (catalog[i].highlight)
                        highlightedProducts.push(catalog[i]);

                    var item = catalog[i];

                    cloneTemplate('catalogItem', 'productCatalog', function (template) {

                        template = template.replace('{{item.bgImage}}', item.bgImage);
                        template = template.replace('$index', i);
                        template = template.replace('{{item.sku}}', item.sku);
                        template = template.replace('{{item.name}}', item.name);
                        template = template.replace('{{item.description}}', item.description);
                        template = template.replace('{{item.sku}}', item.sku);
                        template = template.replace('{{item.price}}', item.price);

                        return template;
                    }, item);
                }

                for (var i = 0; i < highlightedProducts.length; i++) {
                    var item = highlightedProducts[i];
                    cloneTemplate('sliderTemplate', 'highlightedSliderContainer', function (template) {

                        template = template.replace('{{item.bgImage}}', item.bgImage);
                        template = template.replace('$index', i);
                        template = template.replace('{{item.sku}}', item.sku);
                        template = template.replace('{{item.name}}', item.name);
                        template = template.replace('{{item.description}}', item.description);
                        template = template.replace('{{item.sku}}', item.sku);
                        template = template.replace('{{item.price}}', item.price);

                        return template;
                    }, item);
                }

                recalcTotal();
            };
        };
        calalogRequest.open('GET', 'catalog.json', true);
        calalogRequest.send();

        //Load up states into the select control
        var states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
    'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
    'WY').split(' ').map(function (state) {
        return { abbrev: state };
    });

        var selectSelect = document.getElementById('states');
        for (var i = 0; i < states.length; i++) {
            var option = document.createElement('option');
            option.value = states[i].abbrev;
            option.innerText = states[i].abbrev;
            selectSelect.appendChild(option);
        }
    }

    //Get everything all setup for the user once the document has loaded.
    uiOptions.initializeForm = initializeForm;


    /* ----------------------------------------------------------------------
     Navigation between steps methods
     ---------------------------------------------------------------------- */
    window.onhashchange = function () {
        if (document.location.hash == '#select')
            advanceWizard(0);
        else if (document.location.hash == '#cart')
            advanceWizard(1);
        else if (document.location.hash == '#checkout')
            advanceWizard(2);

    };

    function advanceWizard(index) {
        var slides = document.getElementsByClassName('order-slider-container');

        for (var i = 0; i < slides.length; i++) {
            slides[i].style.marginLeft = '-' + (index * 1160) + 'px';
        }

        if (index == 0)
            document.location.hash = 'select';
        else if (index == 1)
            document.location.hash = 'cart';
        else if (index == 2)
            document.location.hash = 'checkout';
        else if (index == 3) {
            clearShoppingCart();
        }

        window.scroll(0, 0);

        var slides = document.getElementsByClassName('wizard-slide');
        for (var i = 0; i < slides.length; i++) {
            if (i == index) {
                slides[i].className = 'slide wizard-slide';
            }
            else
                slides[i].className = 'slide wizard-slide no-show';
        }

        document.getElementById('leftSliderButton').style.display = index == 0 ? 'inline-block' : 'none';
    };

    uiOptions.advanceWizard = advanceWizard;


    /* ----------------------------------------------------------------------
     Featured products slider methods
     ---------------------------------------------------------------------- */
    var sliderInterval = null;

    function resetSlider() {
        if (sliderInterval)
            clearInterval(sliderInterval);

        sliderInterval = setInterval(function () {
            advanceSlider();
        }, 10000);
    }

    function advanceSliderToIndex(index) {
        sliderIndex = index;
        var slides = document.getElementsByClassName('slider-container');

        for (var i = 0; i < slides.length; i++) {
            slides[i].style.marginLeft = '-' + (sliderIndex * 1240) + 'px';
        }

        resetSlider();
    };

    resetSlider();

    function advanceSlider() {
        sliderIndex++;
        if (sliderIndex > 2)
            sliderIndex = 0;

        var slides = document.getElementsByClassName('slider-container');

        for (var i = 0; i < slides.length; i++) {
            slides[i].style.marginLeft = '-' + (sliderIndex * 1240) + 'px';
        }
        resetSlider();
    }

    function retreatSlider() {
        sliderIndex--;
        if (sliderIndex < 0)
            sliderIndex = 2;

        var slides = document.getElementsByClassName('slider-container');

        for (var i = 0; i < slides.length; i++) {
            slides[i].style.marginLeft = '-' + (sliderIndex * 1240) + 'px';
        }
        resetSlider();
    }

    uiOptions.advanceToIndex = advanceSliderToIndex;
    uiOptions.advanceSlider = advanceSlider;
    uiOptions.retreatSlider = retreatSlider;

    /*----------------------------------------------------------------------
     Shopping cart methods
     ----------------------------------------------------------------------*/
    uiOptions.removeItem = function (evt) {
        var target = evt.target || evt.srcElement;
        var item = target['data-model'];
        while (!item) {
            target = target.parentNode;
            item = target['data-model'];
        }

        target.className += ' removing-item';

        //Give time for the css animation to occur before removing from the DOM
        setTimeout(function () {
            shoppingCart.splice(shoppingCart.indexOf(item), 1);
            recalcTotal();
            updateCartItems();
        }, 500);

    }

    function clearShoppingCart() {
        var list = document.getElementById('shoppingCartList');
        for (var i = 0; i < list.childNodes.length; i++) {
            list.childNodes[i].className += ' removing-item';

        }

        //Give time for the css animation to occur before removing from the DOM
        setTimeout(function () {

            shoppingCart = [];
            recalcTotal();
            updateCartItems();
        }, 500);
    }

    uiOptions.addItemToCart = function (evt) {
        var target = evt.target || evt.srcElement;
        var item = target['data-model'];
        while (!item) {
            target = target.parentNode;
            item = target['data-model'];

        }

        //Make the item 'fly' into the shopping cart.
        item.addingToCatalog = true;
        var target = evt.target || evt.srcElement;
        var parent = target.parentNode;
        while (parent.tagName != 'MD-CARD-ACTIONS' && parent.tagName != 'DIV')
            parent = parent.parentNode;

        var img = document.createElement('img');
        img.src = parent.children[0].src;

        var position = getElementOffset(target);

        img.style.top = position.top + 'px';
        img.style.left = position.left + 'px';
        img.style.display = 'inline';
        img.style.zIndex = 1000;
        img.style.opacity = 1;


        document.body.appendChild(img);
        setTimeout(function () {
            var cartPosition = getElementOffset(document.getElementById('cart-icon'));

            img.style.top = cartPosition.top + 'px';
            img.style.left = cartPosition.left - 50 + 'px';
            img.style.opacity = .25;
            img.className = 'item-adding animate-picture';

            setTimeout(function () {
                document.body.removeChild(img);
            }, 700);
        }, 50);

        //clone the item and put it into the cart
        shoppingCart.push(JSON.parse(JSON.stringify(item)));

        recalcTotal();
        updateCartItems();
    }

    function updateCartItems() {
        //Clear the lists
        clearChildren(document.getElementById('shoppingCartList'));
        clearChildren(document.getElementById('finalStepCartList'));

        for (var i = 0; i < shoppingCart.length; i++) {
            var cartItem = shoppingCart[i];

            //Add item to the shopping cart list
            cloneTemplate('shoppingCartItemTemplate', 'shoppingCartList', function (htmlTemplate) {
                htmlTemplate = htmlTemplate.replace('{{cartItem.sku}}', cartItem.sku);
                htmlTemplate = htmlTemplate.replace('{{cartItem.name}}', cartItem.name);
                htmlTemplate = htmlTemplate.replace('{{cartItem.price}}', formatCurrency(cartItem.price));

                return htmlTemplate;

            }, cartItem);

            //Add item to the list on the final screen
            cloneTemplate('finalStepShoppingCartTemplate', 'finalStepCartList', function (htmlTemplate) {
                htmlTemplate = htmlTemplate.replace('{{cartItem.sku}}', cartItem.sku);
                htmlTemplate = htmlTemplate.replace('{{cartItem.name}}', cartItem.name);
                htmlTemplate = htmlTemplate.replace('{{cartItem.price}}', formatCurrency(cartItem.price));

                return htmlTemplate;

            }, cartItem);
        }

        if (shoppingCart.length == 0)
            document.getElementById('noItemsInCart').removeAttribute('style');
        else
            document.getElementById('noItemsInCart').style.display = 'none';
    }

    function recalcTotal() {
        var subTotal = 0;
        var shipping = 0;
        for (var i = 0; i < shoppingCart.length; i++) {
            subTotal += shoppingCart[i].price;
            shipping += shoppingCart[i].shipping;
        }
        document.getElementById('subtotal').innerText = formatCurrency(subTotal);
        document.getElementById('shipping').innerText = formatCurrency(shipping);
        document.getElementById('tax').innerText = formatCurrency(subTotal * .075);
        document.getElementById('total').innerText = formatCurrency(subTotal + shipping + (subTotal * .075));

        document.getElementById('subtotal2').innerText = formatCurrency(subTotal);
        document.getElementById('shipping2').innerText = formatCurrency(shipping);
        document.getElementById('tax2').innerText = formatCurrency(subTotal * .075);
        document.getElementById('total2').innerText = formatCurrency(subTotal + shipping + (subTotal * .075));

        document.getElementById('cartCount').innerText = shoppingCart.length;

        document.getElementById('checkOutButton').style.display = shoppingCart.length ? 'block' : 'none';
    }



    uiOptions.clearShoppingCart = clearShoppingCart;

    /*----------------------------------------------------------------------
     Form Validation methods
     ----------------------------------------------------------------------*/

    document.forms[0].onsubmit = function () {
        //Can't submit if the form is not valid
        if (!uiOptions.validateName() | !uiOptions.validateLastName() | !uiOptions.validateAddress() | !uiOptions.validateCity() | !uiOptions.validatePostalCode()) {
            return false;
        }

        //Assignment 12 will actually submit the form to the server.  For now, it will just show a thank you page.
        uiOptions.advanceWizard(3);
        return false;
    };

    document.orderForm.onreset = function () {
        var visibleLabels = document.getElementsByClassName('visible');
        while (visibleLabels.length > 0) {
            visibleLabels[0].className = 'validation-error';
        }
    };


    function toggleValidationLabel(label, isShowing) {
        if (isShowing) {
            if (label.className == 'validation-error') {
                label.className = 'validation-error visible adding-item';
                setTimeout(function () {
                    label.className = 'validation-error visible';
                }, 500);
            }
        }
        else {
            if (label.className == 'validation-error visible') {
                label.className = 'validation-error visible removing-item';
                setTimeout(function () {
                    label.className = 'validation-error';
                }, 500);
            }
        }

        return isShowing;
    }

    uiOptions.validateName = function () {
        return !toggleValidationLabel(document.getElementById('customerNameValidationErrorLabel'), !document.getElementById('customerName').value);
    };

    uiOptions.validateLastName = function () {
        return !toggleValidationLabel(document.getElementById('customerLastNameValidationErrorLabel'), !document.getElementById('customerLastName').value);
    };

    uiOptions.validateAddress = function () {
        return !toggleValidationLabel(document.getElementById('addressValidationErrorLabel'), !document.getElementById('address1').value);
    };

    uiOptions.validateCity = function () {
        return !toggleValidationLabel(document.getElementById('cityValidationErrorLabel'), !document.getElementById('city').value);
    };


    function isValidPhoneNumber() {
        //Try to be as liberal as possible in accepting phone number formats
        var phoneNumberExp = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
        var testValue = document.getElementById('phone').value;
        return phoneNumberExp.test(testValue)
            || /^\d{10}$/.test(testValue);
    }

    uiOptions.validatePhone = function () {
        var isMatch = isValidPhoneNumber();

        if (isMatch) {
            //Clean up the formatting of the phone number for the user
            var phoneNumber = document.getElementById('phone').value;
            phoneNumber = phoneNumber.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');
            phoneNumber = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6, 4);

            document.getElementById('phone').value = phoneNumber;
        }
        return !toggleValidationLabel(document.getElementById('phoneValidationErrorLabel'), !isMatch);

    }

    uiOptions.preValidatePhoneNumber = function () {
        //Only clear the message if it is now valid, otherwise don't disrupt them while they are still inputing the 
        //Phone number
        if (isValidPhoneNumber())
            uiOptions.validatePhone();
    }

    uiOptions.validatePostalCode = function () {
        var zipCodeExpression = /^\d{5}$/;
        return !toggleValidationLabel(document.getElementById('postalCodeValidationErrorLabel'), !zipCodeExpression.test(document.getElementById('postalCode').value));
    };

    uiOptions.zipCodeInput = function () {
        //Lookup the city and state once a zip code has been entered using Google's api services

        var zipCode = document.getElementById('postalCode').value;
        if (zipCode && zipCode.length == 5) {
            var locationRequest = new XMLHttpRequest();
            locationRequest.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    if (data.status == 'OK' && data.results.length > 0) {
                        var result = data.results[0];

                        for (var i = 0; i < result.address_components.length; i++) {
                            var component = result.address_components[i];
                            if (component.types.indexOf('locality') > -1) {
                                document.getElementById('city').value = component.long_name;
                                uiOptions.validateCity();
                                uiOptions.validatePostalCode();
                            }
                            if (component.types.indexOf('administrative_area_level_1') > -1) {
                                document.getElementById('states').value = component.short_name;
                            }
                        }
                    }
                }
            };

            locationRequest.open('GET', 'http://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&sensor=true', true);
            locationRequest.send();
        }
    };


    uiOptions.resetForm = function () {
        //use the name rather than id to get the form
        document.orderForm.reset();


    }






    /* ----------------------------------------------------------------------
     Helper Methods
     ---------------------------------------------------------------------- */
    function clearChildren(element) {
        while (element.firstChild)
            element.removeChild(element.firstChild);
    }

    //Displays a number as currency
    function formatCurrency(number) {
        return '$' + number.formatMoney();
    }

    //Finds the physical location of an element on the screen
    function getElementOffset(element) {
        var de = document.documentElement;
        var box = element.getBoundingClientRect();
        var top = box.top + window.pageYOffset - de.clientTop;
        var left = box.left + window.pageXOffset - de.clientLeft;
        return { top: top, left: left };
    }

    //VERY simplified templating function since more advanced libraries like handlebars, angular, knockout etc can't be used
    function cloneTemplate(templateName, parentName, replaceFunction, dataModel) {
        var parentNode = document.getElementById(parentName);

        htmlTemplate = document.getElementById(templateName).childNodes[0].nodeValue ?
            document.getElementById(templateName).childNodes[0].nodeValue : document.getElementById(templateName).childNodes[0].outerHTML;
        htmlTemplate = htmlTemplate.replace('\n', '');
        htmlTemplate = htmlTemplate.replace('\t', '');

        if (replaceFunction)
            htmlTemplate = replaceFunction(htmlTemplate);

        var range = document.createRange();
        range.selectNode(parentNode);
        var documentFragment = range.createContextualFragment(htmlTemplate);

        var newElement = null;
        for (var i = 0; i < documentFragment.childNodes.length; i++) {
            if (documentFragment.childNodes[i].nodeName != "#text") {
                newElement = documentFragment.childNodes[i];
                break;
            }
        }
        newElement['data-model'] = dataModel;
        parentNode.appendChild(newElement);
    }
})();