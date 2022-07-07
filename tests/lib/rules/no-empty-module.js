/**
 * @fileoverview prevent empty import
 * @author hungry
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-empty-module'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2020, sourceType: 'module' } });
ruleTester.run('no-empty-module', rule, {
  valid: ["import { useRequest } from 'umi';", "import umi from 'umi';", "import * as umi from 'umi';"],

  invalid: [
    {
      code: "import { } from 'umi';",
      errors: [{ message: 'remove this empty import please' }],
      output: ''
    }
  ]
});
