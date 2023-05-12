import { Pressable, StyleSheet, View } from "react-native";
import {Ionicons} from '@expo/vector-icons';

function IconButton({icon, size, color, onPress}){

    return(
        <Pressable  style={({pressed}) => pressed && styles.pressed} 
                    onPress={onPress}
        >
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color} />            
            </View>
        </Pressable>
    )
    
}

export default IconButton;

styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed:{
        opacity: 0.75
    }
})