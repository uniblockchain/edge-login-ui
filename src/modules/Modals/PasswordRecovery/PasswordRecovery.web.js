import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../BaseModal.web.js'
import styles from './PasswordRecovery.webStyle.scss'

import { closePasswordRecoveryModal } from './PasswordRecovery.action.js'

class PasswordRecovery extends Component {
  render () {
    return (
      <Modal
        active={this.props.view}
        close={ e => this.props.dispatch(closePasswordRecoveryModal()) }
        icon='../../../../assets/modals/recovery-W.png'
      >
        <p className={styles.header}>Password Recovery</p>
        <p className={styles.text}>
          If recovery was setup, you should have emailed yourself a recovery token with a link.
          To recover your account, install the Airbitz Mobile App on iOS or Android at: <br />
          <a target="_blank" href="https://airbitz.co/app" className={styles.linked}>https://airbitz.co/app</a>
        </p>
        <p className={styles.text}>
         Then click one of the links in the recovery email from a device with Airbitz installed.
        </p>
        <button className={styles.close} onClick={ e => this.props.dispatch(closePasswordRecoveryModal()) }>Ok</button>
      </Modal>
    )
  }
}

export default connect(state => ({
  view: state.modal.passwordRecovery
}))(PasswordRecovery)