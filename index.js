(function(exports) {

  'use strict';

  /**
   * @return {String} "kind" of value.
   */
  function getKindOf(value) {
        // Borrowed from mout: https://github.com/mout/mout/blob/master/src/lang/kindOf.js#L3
    var KIND_OF_REGEX = /^\[object (.*)\]$/,
        toString = Object.prototype.toString;

    return KIND_OF_REGEX.exec(toString.call(value))[1];
  }

  /**
   * @return {Boolean} `true` if value is an `Object`, `false` otherwise.
   */
  function isObject(value) {
    return getKindOf(value) === 'Object';
  }

  /**
   * Format substitution.
   * @param {String} formatter Type of formatter.
   * @param {*} value Substitution value.
   * @return {*} Formatted substitution value.
   */
  function formatSubstitution(formatter, value) {
    switch(formatter) {
      case 'd' :
      case 'i' :
        return formatInteger(value);
      break;

      case 'f' :
        return formatFloat(value);
      break;

      default :
        return value + '';
    }
  }

  /**
   * @return {Number} Format value to integer.
   */
  function formatInteger(value) {
    return parseInt(value, 10);
  }

  /**
   * @return {Number} Format value to float.
   */
  function formatFloat(value) {
    return parseFloat(value);
  }

  /**
   * Process arguments (%s, %d, %i and %f).
   */
  function processArguments(input, substitutions) {
    var ARGUMENTS_REGEX = /%(d|i|s|f)/gm,
        formatter,
        substitution,
        matches = input.match(ARGUMENTS_REGEX),
        buffer = input;

    matches.forEach(function(match, index) {
      formatter = match.slice(1);
      substitution = formatSubstitution(formatter, substitutions[index]);
      buffer = buffer.replace(match, substitution);
    });

    return buffer;
  }

  /**
   * Process named arguments (%(name)s).
   */
  function processNamedArguments(input, substitutions) {
    var NAMED_ARGUMENT_REGEX = /%\((.*?)\)s/gm,
        match,
        placeholder,
        key,
        substitution,
        buffer = input;

    while((match = NAMED_ARGUMENT_REGEX.exec(input))) {
      placeholder = match[0];
      key = match[1];
      substitution = substitutions[key] || placeholder;
      buffer = buffer.replace(placeholder, substitution);
    }

    return buffer;
  }

  /**
   * @param {String} input String to be formatted.
   * @param {Object|String|Number} substitutions String substitutions.
   */
  function matt(input, substitutions) {
    // If substitutions are an object, will format output as named arguments
    if(isObject(substitutions)) {
      return processNamedArguments(input, substitutions);
    }

    // By default will format output as simple arguments
    substitutions = Array.prototype.slice.call(arguments, 1);

    return processArguments(input, substitutions);
  }

  // Exports to multiple environments
  // Borrowed from Crossroads.js: https://github.com/millermedeiros/crossroads.js/blob/master/dev/lib/signals.js#L421-L430
  if(typeof define === 'function' && define.amd) { // AMD
    define(function() { return matt; });
  } else if (typeof module !== 'undefined' && module.exports) { // Node
    module.exports = matt;
  } else { // Browser
    exports.matt = matt;
  }

})(this);
