import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { App } from 'components/App'
import store from 'store/store'

/*--- START Bootstrap imports ---*/
import jQuery from 'jquery'
global.$ = jQuery
global.jQuery = jQuery
require('vendor/bootstrap/dropdown')
require('vendor/bootstrap/modal')
/*--- END Bootstrap imports ---*/

const issueTableContainer =
    document.getElementById('issue-container')

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    issueTableContainer
)