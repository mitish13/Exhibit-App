import * as firebase from 'firebase';
import React, { Component } from 'react';
import {View,Text,TouchableOpacity,StyleSheet, Dimensions} from 'react-native';
import { AsyncStorage } from 'react-native';
import Spinner from './common/Spinner';

class Home extends Component{
    state={isLog:null,userActive:''};

            componentDidMount(){
                    
        

                   if(!firebase.apps.length){ 
                    firebase.initializeApp( {

                        apiKey: "AIzaSyDDMr8AoPu-GeOrvavzi91CpADfp2nVeOg",
                        authDomain: "auth-6f1bc.firebaseapp.com",
                        databaseURL: "https://auth-6f1bc.firebaseio.com",
                        projectId: "auth-6f1bc",
                        storageBucket: "auth-6f1bc.appspot.com",
                        messagingSenderId: "536328414333",
                        appId: "1:536328414333:web:2fef538ce0cf4a31cebd14",
                        measurementId: "G-MH764SKYED",
                        
                      })}

                      this.getstate();

                    firebase.auth().onAuthStateChanged((user)=>{
                        if(user){
                            //firebase.auth().signOut();
                            this.setState({isLog:true});
                            
                        }
                        else{
                            this.setState({isLog:false});
                            AsyncStorage.setItem('active','');
                        
                        }
                    })   

                } 

    //    saveState(){
    //        AsyncStorage.setItem('state',this.state.userAct)
    //    }     
       
       getstate=async()=>{
        try{
          const active=await AsyncStorage.getItem('active');
          this.setState({userActive:active})
          console.log(this.state.userActive);  
      }
        catch(error){
              console.log(error);
              
        }
    } 
   renderSpinner(){
       if(this.state.isLog==null){
        return <Spinner size="large"></Spinner>
       }
       else{
        this.renderHome();
       }
   }
           
    renderHome(props){
       
        if(this.state.isLog==false){
               return(
                    <View style={{height:Dimensions.get('window').height,marginTop:Dimensions.get('window').height/5,backgroundColor:'rgb(230,230,230)'}}>
                    <View style={styles.viewStyle}>

                    <Text style={styles.textStyle}>I WANT TO SIGN IN AS:</Text>
                    <View style={{flexDirection:"row",paddingHorizontal:10}}>
                  
                    <TouchableOpacity style={styles.buttonContainer} 
                                      onPress={()=>{this.props.navigation.navigate('LoginOrg'),AsyncStorage.setItem('active','organizer')}}>                                           
                                

                    <Text style={styles.buttonText}>Organizer</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} 
                                    onPress={()=>{this.props.navigation.navigate("LoginCust"),AsyncStorage.setItem('active','customer')}}>
                                    
                    <Text style={styles.buttonText}>Customer</Text></TouchableOpacity>
        
                    </View>
                </View>
                </View>
                );
            }
            
            
        
        else if(this.state.isLog==true){
            
                if(this.state.userActive=='customer'){
                 return   this.props.navigation.navigate('MainCust');
               }
               else if(this.state.userActive=='organizer'){
                  return  this.props.navigation.navigate('MainOrg');
               }

        }}
            
        
            
            
        
render(){

    return(
        <View>
        {this.renderSpinner()}  
        {this.renderHome()}
        
        </View>
    );}
    }

    Home.navigationOptions=(props)=>{
        return{
          
           headerLeft:()=>false,
           headerBackTitleVisible:()=>false,
   
   
     
        }
   }
        
const styles=StyleSheet.create({
    viewStyle:{
    
        backgroundColor:'rgb(230,230,230)'
    },
    textStyle:{
        marginTop:10,
        fontSize:30,
        paddingHorizontal:15,
        color:"black",
        fontWeight:"600",
        marginBottom:10,
        fontFamily:(Platform.OS=='android')?'serif':null,


    },
    buttonContainer:{
        backgroundColor:"#fff",
        borderRadius:5,
        borderWidth:1,
        borderColor:"black",
        marginHorizontal:5,
        marginTop:10
    },
    buttonText:{
        fontSize:16,
        color:"#dd0031",
        alignSelf:"flex-start",
        fontWeight:"bold",
        paddingVertical:10,
        paddingHorizontal:10
    }

    
});

export default Home;