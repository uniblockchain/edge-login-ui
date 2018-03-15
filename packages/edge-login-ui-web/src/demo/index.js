import { makeContext } from 'edge-core-js'
import React, { Component } from 'react'
import { render } from 'react-dom'

import { AccountScreen, LoginScreen } from '../../lib/edge-login-ui-index.js'

const vendorName = 'Edge React Dev'
const vendorImageUrl =
  'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'

/**
 * Hacking around incorrect environment detection in the core.
 */
function makeEdgeContext (opts) {
  return Promise.resolve(makeContext(opts))
}

class Root extends Component {
  constructor (props) {
    super(props)
    makeEdgeContext({
      apiKey: '3ad0717b3eb31f745aba7bd9d51e7fd1b2926431',
      appId: 'com.mydomain.myapp'
    }).then(context => this.setState({ context }))

    this.logout = () => this.setState({ account: null })
    this.onClose = () => this.setState({ closed: true })
    this.onError = () => {}
    this.onLogin = account => this.setState({ account })
    this.onOpen = () => this.setState({ closed: false })

    this.state = {
      account: null,
      closed: false,
      context: null
    }
  }

  render () {
    if (!this.state.context) {
      return <p>Loading...</p>
    }
    if (this.state.account) {
      if (this.state.closed) {
        return (
          <p>
            Currently logged in.<br />
            <button onClick={this.onOpen}>Show Account UI</button>
            <br />
            <button onClick={this.logout}>Logout</button>
          </p>
        )
      }
      return (
        <AccountScreen
          context={this.state.context}
          account={this.state.account}
          onClose={this.onClose}
          onError={this.onError}
          vendorName={vendorName}
          vendorImageUrl={vendorImageUrl}
        />
      )
    }

    if (this.state.closed) {
      return (
        <p>
          Currently logged out.<br />
          <button onClick={this.onOpen}>Show Login UI</button>
        </p>
      )
    }
    return (
      <LoginScreen
        accountOptions={{}}
        context={this.state.context}
        onClose={this.onClose}
        onError={this.onError}
        onLogin={this.onLogin}
        vendorName={vendorName}
        vendorImageUrl={vendorImageUrl}
      />
    )
  }
}

const root = document.getElementById('app')
if (!root) throw new Error('HTML app element missing')

render(<Root />, root)
