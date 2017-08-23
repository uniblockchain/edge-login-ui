import { vs, fontSize } from '../../util'
import { BasicCheckBoxWithLabel } from '../'
import * as Colors from '../../constants/Colors'

const PasswordStatusStyle = {
  container: {
    height: vs(129),
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.GRAY_4
  },
  instructions: {
    fontSize: fontSize(14),
    textAlign: 'center',
    width: '80%'
  },
  checkboxContainer: {
    width: '80%',
    height: 20,
    backgroundColor: '#ffffff',
    top: 20
  },
  checkboxes: BasicCheckBoxWithLabel,
  text: {
    textAlign: 'center',
    width: '100%'
  }
}

export { PasswordStatusStyle }