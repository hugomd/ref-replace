# Ref Replace [![npm version](https://badge.fury.io/js/ref-replace.svg)](https://www.npmjs.com/package/ref-replace)
A module that converts `$ref` in JSON objects and replaces it with `_ref` so that it can be stored in Mongo, and vice versa.

I made this module because `$ref` is a standard in [JSON](http://json-schema.org/latest/json-schema-core.html#rfc.section.7) and in [Mongo](https://docs.mongodb.com/manual/reference/database-references/#dbrefs).

# Usage
```JavaScript
import {replaceRefsJSON, replaceRefsMongo} from 'ref-replace';

const someJSON = {
  $ref: 'test',
  test: {
    $ref: 'test',
    test: {
      $ref: 'test'
    }
  }
};

console.log(replaceRefsJSON(someJSON))
/**
Output:
{
  _ref: 'test',
  test: {
    _ref: 'test',
    test: {
      _ref: 'test'
    }
  }
}
 */

```

# License
MIT &copy; [Hugo Müller-Downing](http://hu.md/)
