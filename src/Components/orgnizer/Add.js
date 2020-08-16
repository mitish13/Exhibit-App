import React,{ Component} from 'react';
import {Text,View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker'
class Add extends Component{

   
    
     openImagePicker=()=>{
         console.log('in fun')
        ImagePicker.openPicker({
            multiple:true,
            cropping: true,
          }).then(image => {
              image.map((item,index)=>{
                  console.log(item)
              })
          }).catch(e=>console.log(e));
     }

    render(){
        console.log('hi')
        return(
            <View><TouchableOpacity onPress={()=>this.openImagePicker()}>
                <Text>Choose Images</Text>
                </TouchableOpacity>
            </View>
        )
    }   
}


export default Add;