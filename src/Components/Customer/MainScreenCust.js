import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Fontisto } from '@expo/vector-icons'; 
import {Text, Button,View, BackHandler,TouchableOpacity,Dimensions,StyleSheet, Picker} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../common/Card'
class MainScreenCust extends Component{
  
    

    state={City:'Vadodara',type:'Imitation'}

    logout(){
        BackHandler.exitApp();
    }


    render(){

        
       //console.log(this.state.Key)
        return(
            
        <ScrollView>
            <Card>
            
                <View style={{height:Dimensions.get('window').height,width:Dimensions.get('window').width,flexDirection:'column'}}>
                <View style={{flexDirection:'row'}}>           
                <Text style={styles.cityText} >Select Your City</Text>
                     
                     
                    

                    
                    
                    </View>
                    <Text style={{marginHorizontal:20,opacity:0.6}}>Tap below to select</Text>
                     <Picker    
                                style={styles.picker}

                                selectedValue={this.state.City}
                                onValueChange={(Value) => this.setState({ City: Value })}>
                                <Picker.Item  label="Vadodara" value="Vadodara" />
                                <Picker.Item label="Surat" value="Surat" />
                                <Picker.Item label="Rajkot" value="Rajkot" />
                                <Picker.Item label="Ahmedabad" value="Ahmedabad" />
                                <Picker.Item label="Porbandar" value="Porbandar" />
                                <Picker.Item label="Junagadh" value="Junagadh" />
                                <Picker.Item label="Vapi" value="Vapi" />
                                <Picker.Item label="Nadiad" value="Nadiad" />
                                
                    </Picker>   

                    
                            <Text style={styles.typeText}>Category</Text>
                            <Text style={{marginHorizontal:20,opacity:0.6}}>Tap below to select</Text>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.type}
                                onValueChange={(itemValue) => this.setState({ type: itemValue })}>
                                <Picker.Item label="Imitation" value="Imitation" />
                                <Picker.Item label="Clothes" value="Clothes" />
                                <Picker.Item label="Book" value="Book" />
                                <Picker.Item label="Crockery" value="Crockery" />
                                <Picker.Item label="Footware" value="Footware" />
                                <Picker.Item label="Antiques" value="Antiques" />
                                <Picker.Item label="Food" value="Food" />
                                <Picker.Item label="Watch" value="Watch" />
                                <Picker.Item label="Project" value="Project" />
                                <Picker.Item label="Furniture" value="Furniture" />
                                <Picker.Item label="Painting" value="Painting" />
                                <Picker.Item label="Home decor" value="Home decor" />

                                <Picker.Item label="Other" value="Other" />


                            </Picker> 

                    <TouchableOpacity style={{width:Dimensions.get('screen').width/3}} onPress={()=>this.props.navigation.navigate('ListCustomer',{City:this.state.City,Category:this.state.type})}>     
                            <Text style={styles.contact}>
                                    Done
                                    </Text>
                                </TouchableOpacity>
                        
                </View>


                    <TouchableOpacity style={{alignSelf:'stretch',alignContent:'center',marginBottom:5}} onPress={()=>{firebase.auth().signOut(),
                        this.props.navigation.navigate("Home"),this.logout()}}>
                                             
                            <Text style={styles.logout}>
                                    Log Out
                                    </Text>
                                </TouchableOpacity>
               
                                                
                                </Card>   

        
            </ScrollView>
        );
    }
}

const styles=StyleSheet.create({
    cityText:{
        margin:20,
        marginBottom:20,
        marginLeft:20, 
        fontSize:30,
        fontWeight:'600',
        fontFamily:(Platform.OS=='android')?'serif':null,
        alignSelf:'flex-start'
        
    },
    typeText:{
        margin:20,
        marginBottom:20,
        marginTop:50,
        marginLeft:20, 
        fontSize:25,
        fontWeight:'600',
        fontFamily:(Platform.OS=='android')?'serif':null,

        
    },
    picker:{
        color:'rgb(0,0,0)',
    
        margin:20,
        marginTop:5,
        backgroundColor:'rgb(230,230,230)',
        
        marginRight:100
        },
        contact:{
            margin:20,
            marginTop:10,
            width:Dimensions.get('window').width/3,
            fontWeight:'700',
            marginRight:200,
            textAlign:'center',
            fontSize:16,
            color:'black',
            fontFamily:(Platform.OS=='android')?'monospace':null,
            borderWidth:1,
            borderColor:'black',
            padding:8,
            
            borderRadius:7,
            
        },
        logout:{
            
            width:Dimensions.get('screen').width,
            fontWeight:'700',
            alignSelf:'center',
            textAlign:'center',
            fontSize:16,
            color:"black",
            fontFamily:(Platform.OS=='android')?'monospace':null,
            borderWidth:1,
            borderColor:'black',
            paddingVertical:10,
            backgroundColor:"rgb(220,220,220)",
            borderRadius:5
           
        }
  
})

MainScreenCust.navigationOptions=(props)=>{
    return{
      headerRight:()=> <TouchableOpacity onPress={()=>props.navigation.navigate('Fav')} >
        <Fontisto name="favorite" size={40} color="black" style={{marginRight:8}} /></TouchableOpacity>,
         headerLeft:()=>false,
         headerBackTitleVisible:()=>false,
       //gestureEnabled:()=>false

     title:"Customer"
 
    }
}




export default MainScreenCust;  