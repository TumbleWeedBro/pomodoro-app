import { KeyboardAvoidingView, Modal, ModalProps, View} from 'react-native'
import { StyleSheet, Platform } from 'react-native'

type PROPS = ModalProps & {
    isOpen:boolean
    withInput?: boolean
}

export const CreateModal = ({ isOpen, withInput, children, ...rest}: PROPS) => {

    const content = withInput? (
        <KeyboardAvoidingView 
            style = {styles.container}
            behavior={ Platform.OS  === 'ios'? 'padding' :'height'}>
            {children}
        </KeyboardAvoidingView>
    )   :(
        <View style = {styles.container}> {children}</View>
    )

    return (
        <Modal
            visible={isOpen}
            transparent
            animationType='fade'
            statusBarTranslucent
            {...rest}>
                {children}
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent:'center',
        flex: 1,
    }
})