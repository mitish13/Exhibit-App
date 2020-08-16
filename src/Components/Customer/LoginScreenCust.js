import  * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

import React,{Component} from 'react';
import Card from '../common/Card';
import CardSection from '../common/CardSection';
import {Text,TextInput,View, StyleSheet,TouchableOpacity} from 'react-native';
import Header from '../common/Header';
import Spinner from '../common/Spinner';


class LoginScreenCust extends Component{
    state={email:'',password:'',error:'',loading:false};
    
    

    onButtonPress(){
        this.setState({error:''});
        this.setState({loading:true});

        
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onLoginSucces.bind(this))
        .catch(()=>{
            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(this.onLoginSucces.bind(this))
            .catch(this.onLoginFail.bind(this));
        });}

        onLoginSucces(){
            this.setState({loading:false,email:'',password:''});
            this.props.navigation.navigate("MainCust");
            this.setState({error:''});
            //firebase.auth().tenantId='customer';
           // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        }
         
        onLoginFail(){
            this.setState({loading:false,error:"Authentication Failed"})
        } 


     renderButton(){
            if(this.state.loading){
                return <Spinner size="small"></Spinner>
            }
            else{
                return(
                    <TouchableOpacity
                    style={{backgroundColor:"#fff",flex:1,borderRadius:5,borderWidth:1,borderColor:"#dd0031",marginHorizontal:5}} 
                    onPress={this.onButtonPress.bind(this)}
                ><Text style={{fontSize:16,color:"black",alignSelf:'center',fontWeight:"bold",paddingVertical:10}}>Log In</Text></TouchableOpacity>
                    
                )
            }
        }   
        forgetPass(){
            return firebase.auth().sendPasswordResetEmail(this.state.email).then(()=>alert("The reset password link has been sent to your email")).catch(
                ()=>alert("The entered email is either invalid or not registered")
            )
        }

    

    

    render(){
        return(<View>
            <View style={{marginBottom:5}}>
            <Header headerName="Customer Authentication"></Header></View>
            <Card>
                <CardSection>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textStyle}>Email:</Text>
                        <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                 
                                style={styles.inputStyle}
                                value={this.state.text}
                                onChangeText={(newtext)=>this.setState({email:newtext})}
                                placeholder="user@gmail.com"
                         ></TextInput>
                    </View>
                 </CardSection>
                    
                <CardSection>
                    <View style={styles.inputContainer}>
                        <Text style={styles.textStyle}>Password:</Text>
                        <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={true}

                                style={styles.inputStyle}
                                value={this.state.password}
                                onChangeText={(newpass)=>this.setState({password:newpass})}
                                placeholder="*******"
                         ></TextInput>
                    </View>

                </CardSection>
            {/* error handling with AUTHENTICATION using firebase */}
                <Text style={{color:"red",fontSize:20,alignSelf:"center",fontWeight:'700'}}>{this.state.error}</Text>  

                <CardSection>
                  
                    {this.renderButton()}
                </CardSection>
                <CardSection>
                    <TouchableOpacity
                            onPress={()=>this.forgetPass()}
                            
                            ><Text style={{color:"#007aff",fontWeight:"700",fontSize:15}}>Forgot Password</Text></TouchableOpacity>
                </CardSection>
                
                
            </Card>
        <Text style={{alignSelf:'flex-start',fontSize:17,color:'gray',marginTop:5,marginLeft:8,marginBottom:0}}>New user?</Text>
        <Text style={{alignSelf:'flex-start',fontSize:17,color:'gray',marginTop:5,marginLeft:8}}>then simply login with your own Email and Password.</Text>
        <Text style={{alignSelf:'flex-start',fontSize:17,color:'black',margin:15,marginLeft:8}}>Password must be atleast 6 characters long</Text>
   
</View>
            
        );
    }
}

const styles=StyleSheet.create({
    inputContainer:{
        flexDirection:"row",
        height:40,
        flex:1,
        alignItems:"center"

    },
    textStyle:{
        fontSize:18,
        paddingLeft:20,
        flex:1,
        fontWeight:"bold",
        color:'black'

    },
    inputStyle:{
        color:"#000",
        paddingHorizontal:5,
        fontSize:18,
        lineHeight:23,
        flex:2

    }

})

export default LoginScreenCust;