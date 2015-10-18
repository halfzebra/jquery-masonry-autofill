;(function ($, window, document, undefined) {
  'use strict';

  // Create the defaults once.
  var pluginName = 'masonryAutoFill',
      defaults = {

        // String to use for filler elements as HTML template.
        fillerHtml      : '<div></div>',

        // Optional class name for a filler element.
        fillerClassName : 'filler',

        // Initial amount of elements with content.
        initialItemCount: null
      };

  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this.$element = $(this.element);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts.
  $.extend(Plugin.prototype, {
    init: function () {

      // Extract Masonry Object.
      this.masonry = this.$element.data('masonry');

      if (typeof this.masonry === 'undefined') {
        throw new Error('Element does not have a masonry object attached');
      }

      // Generate a string with required classes for Masonry.
      this._fillerClassName = this.masonry.options.itemSelector.replace('.', '') + ' ' + this.settings.fillerClassName;

      this.$element.masonry('on', 'layoutComplete', $.proxy(this.toggleFillers, this));
      this.masonry.layout();
    },
    toggleFillers: function () {

      // Initialize private variables.
      var currentItemCount = this.masonry.items.length,
          items = this.masonry.items,
          cols = this.masonry.cols,
          expectedItemCount = 0,
          lastRowItemCount = 0,
          lastRowFillerCount = 0,
          fillersToRemove = [],
          fillersToAddCount = 0,
          fillersToAdd = [];

      // Assign initial amount once, during first 'layoutComplete' event.
      if (this.settings.initialItemCount === null) {
        this.settings.initialItemCount = currentItemCount;
      }

      lastRowItemCount = this.settings.initialItemCount % cols;
      lastRowFillerCount = (lastRowItemCount !== 0) ? cols - lastRowItemCount : 0;
      expectedItemCount = this.settings.initialItemCount + lastRowFillerCount;

      if (expectedItemCount !== currentItemCount) {

        if (currentItemCount > expectedItemCount) {

          // Too many filler items, plugin will remove fillers, starting from the last one.
          var itemsToRemove = items.slice(this.settings.initialItemCount + lastRowFillerCount);

          $.each(itemsToRemove, function (index, item) {
            fillersToRemove.push(item.element);
          });

          this.masonry.remove(fillersToRemove);
          this.masonry.layout();
        } else {

          // Add more filler items.
          fillersToAddCount = expectedItemCount - currentItemCount;

          while (fillersToAddCount) {
            var $el = $(this.settings.fillerHtml).addClass(this._fillerClassName);
            this.$element.append($el);
            fillersToAddCount = fillersToAddCount - 1;
          }

          this.masonry.reloadItems();
          this.masonry.layout();
        }
      }
    }
  });

  // Preventing against multiple instantiations.
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);