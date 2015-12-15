Glizy.oop.declare("glizy.FormEdit.CmsPagePicker", {
    $element: null,
    controllerName: null,

    initialize: function (element) {
        element.data('instance', this);
        this.$element = element;

        element.removeAttr('value');

        this.controllerName = element.data('controllername');
        var filterType = element.data('filtertype') || '';
        var protocol = element.data('protocol') || '';

        element.select2({
            placeholder: '',
            allowClear: true,
            minimumInputLength: 3,
            ajax: {
                url: Glizy.ajaxUrl + "&controllerName="+this.controllerName+"&filterType="+filterType+"&protocol="+protocol,
                dataType: 'json',
                quietMillis: 100,
                data: function(term) {
                    return {
                        term: term
                    };
                },
                results: function(data, page ) {
                    return { results: data }
                }
            },
            formatResult: function(data) {
                return data.text+'<br><small>'+data.path+'</small>';
            },
            formatSelection: function(data) {
                return data.text+' <small>'+data.path+'</small>';
            }
        });
    },

    getValue: function () {
        return this.$element.val();
    },

    setValue: function (value) {
        if (value) {
            $.ajax({
                url: Glizy.ajaxUrl + "&controllerName="+this.controllerName,
                dataType: 'json',
                data: {id: value},
                success: function(data) {
                    this.$element.select2('data', data[0]);
                }
            });
        }
    },

    getName: function () {
        return this.$element.attr('name');
    },

    focus: function()
    {
        this.$element.focus();
    },

    destroy: function () {
        //this.$element.data('origValue', $(this).val());
        this.$element.select2('destroy');
    },

    isDisabled: function() {
        return this.$element.attr('disabled') == 'disabled';
    },

    addClass: function(className) {
        this.$element.addClass(className);
    },

    removeClass: function(className) {
        this.$element.removeClass(className);
    }
});