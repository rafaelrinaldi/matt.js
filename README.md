> # Deprecation notice :rotating_light:
> This project is no longer being maintened by me. If you want to take ownership over it, just [ping me](https://github.com/rafaelrinaldi/contact).  
>
> Since I'm now using ES6 on my projects (thanks to [Babel](http://babeljs.io)), I left `sprintf`-like approaches and fully embraced [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings). If you still want this, [`sprintf-js`](https://npmjs.org/package/sprintf-js) seem to cover all your needs (I personally have never used it tho).

# matt.js [![Build Status](https://travis-ci.org/rafaelrinaldi/matt.js.svg?branch=master)](https://travis-ci.org/rafaelrinaldi/matt.js)

Simple string for<strong><u>matt</u></strong>er based on the [`sprintf`](http://en.cppreference.com/w/c/io/fprintf) implementation.

## Motivation

I've always been a huge fan of `sprintf` since the old ActionScript days ([I even wrote an AS3 implementation of it](https://github.com/arthur-debert/printf-as3)). I really like its simplicity. [Even the native `console` object has basic support for it](https://developer.mozilla.org/en-US/docs/Web/API/console?redirectlocale=en-US&redirectslug=DOM%2Fconsole#Using_string_substitutions).
I just wanted a way to mix `console`'s formatting support with named arguments.

## Environment support

Works well with AMD, Node.js and the browser.

## Install

### For Node.js via NPM

`$ npm install matt.js --save`

### For the browser via Bower

`$ bower install matt.js --save`

## Usage

### Basic substitution

```js
var message = 'Hello %s! \
You\'re our visitor number %d! \
That means you just won %f pounds of Nutella!';

console.log(matt(message, 'John', 1000, 780.35));
// Hello John! You're our visitor number 1000! That means you just won 780.35 pounds of Nutella!
```

### Named arguments

```js
var message = 'Hello user! This is %(name)s %(surname)s. Check %(website)s for more info.',
    data = {
      name: 'John',
      surname: 'Doe',
      website: 'http://johndoe.com'
  };

console.log(matt(message, data));
// "Hello user! This is John Doe. Check http://johndoe.com for more info."
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Rafael Rinaldi](http://rinaldi.io)
