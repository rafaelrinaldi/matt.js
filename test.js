var assert = require('assert'),
    matt = require('./index'),
    input,
    output;

it('should format string', function() {
  input = '%s';
  output = matt(input, 'John');
  assert(output, 'John');
});

it('should format integer', function() {
  input = '%i';
  output = matt(input, 10);
  assert(output, 10);
});

it('should format decimal', function() {
  input = '%d';
  output = matt(input, 100);
  assert(output, 100);
});

it('should format float', function() {
  input = '%f';
  output = matt(input, 25.5);
  assert(output, 25.5);
});

it('should format named argument', function() {
  input = '%(name)s';
  output = matt(input, {name: 'John'});
  assert(output, 'John');
});

it('should keep placeholder if no named argument is found', function() {
  input = '%(name)s';
  output = matt(input, {});
  assert(output, input);
});

it('should keep placeholder if no substitution is found', function() {
  input = '%s';
  output = matt(input);
  assert(output, input);
})
