import React,{ Component} from 'react';

import firebase from 'firebase';


import {View,Text, StyleSheet,TextInput,Picker,Image,ScrollView,Keyboard, Dimensions} from 'react-native';
import Card from '../common/Card';
import CardSection from '../common/CardSection';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
    import { YellowBox } from 'react-native';
import _ from 'lodash';
import moment from 'moment';


class CreateExh extends Component{
    componentDidMount(){

        YellowBox.ignoreWarnings(['Setting a timer']);
            const _console = _.clone(console);
            console.warn = message => {
            if (message.indexOf('Setting a timer') <= -1) {
                _console.warn(message);
            }
            };

        }

    //     this.getPermissionAsync().catch(()=>{console.log("reject")});
    // 
    // getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          
    //       if (status !== 'granted') {
    //         alert('Sorry, we need camera roll permissions to make this work!');
    //       }
    //     }
    // }

    
      pickImage = async () => {

      
    try {
          let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1,1],
            
            
          });
          if (!result.cancelled) {
                this.setState({ image: result.uri ,imageSelect:'Picked',imageHW:1});
                this.uploadIMG(this.state.image)

              
          
          }
    
        } catch (E) {
          console.log('error');
        }
      };
    


      uploadIMG=async (imageUri)=> {
        const uid=firebase.auth().currentUser.uid;

          const response=await fetch(imageUri);
          const blob=await response.blob();
          const ref=firebase.storage().ref(`user/${uid}/`)
         const addToStorage= await firebase.storage().ref(`user/${uid}/`).put(blob).then(()=>this.fetchURL(ref.getDownloadURL()))
        
                                  
      }
    
      fetchURL(url){
          
          this.setState({imageFile:url})
          
          }
      
  showIMG(){
      return(
    <Image source={{uri:this.state.image}} style={{aspectRatio:this.state.imageHW,flex:1}}></Image>
      )
  }
        
      validateForm(){
          Keyboard.dismiss();
          if(this.state.name==''){
              alert("Enter title:")
          }
          else if(this.state.dateIsSelect!=='Selected'){
                alert("Enter Date")
          }
          else if(this.state.timeIsSelect!=='Selected'){
              alert("Enter Time")
          }
          else if(this.state.location==''){
              alert('Enter Location of Exhibition')
          }
          else if(this.state.mobile=='' || this.state.mobile.length!=10){
              alert("Enter Valid Mobile Number")
          }
          else if(this.state.imageFile.length==0){
              alert("Pick one image")
          }
          else{
           this.fireStore();   
          }   

        }
        

        fireStore(){
            console.log("Everything is perfect to submit");
            const uid=firebase.auth().currentUser.uid;
            
// BloB support
            const Time=moment(this.state.time).format('LT'); //6:00 PM
            const Date=moment(this.state.date).format('LL'); //may 10, 2020

            firebase.database().ref(`users/${uid}/`)
            .push({Title:this.state.name,
                   Category:this.state.type,  
                   City:this.state.city,
                   Date:JSON.stringify(Date),
                   Time:JSON.stringify(Time),
                   Location:this.state.location,
                   Mobile_Num:this.state.mobile, 
                   Details:this.state.details ,
                   image:this.state.imageFile
            }).then(()=>{this.props.navigation.pop(),console.log(this.state.image)})
            
           
            

        }

      

      



   state={
       name:'',
        type:'Imitation',
        city:'Vadodara',
        dateVisibility:false,
        date:'',
        dateIsSelect:'Select Date',
        timeVisibility:false,
        time:'',
        timeIsSelect:'Select Time',
        location:'',
        
        
        details:'',
        mobile:'',
        image:null,
        imageSelect:'Pick One Image ',
        imageHW:null,
        imageFile:[],
        
    } 




    render(){
        console.disableYellowBox = true;
        return(    
            <ScrollView style={{flex:1}}>
                
                    <Card>
                        <CardSection>
         {/* name */}

                        <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>Title:</Text>
                        <TextInput
                                autoCapitalize='words'
                                autoCorrect={true}
                                 
                                style={styles.nameInput}
                                value={this.state.name}
                                onChangeText={(newname)=>this.setState({name:newname})}
                                placeholder="Name of Exhibtion"
                         ></TextInput>
                         </View>
 
        

                        </CardSection>
                        <CardSection>
         {/* type */}
                            <View style={styles.typeContainer}>
                            <Text style={styles.typeText}>Category:</Text>
                            
                            <Picker
                                selectedValue={this.state.type}
                                style={{ flex:2 }}
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
                            </View>  
                        </CardSection>
                        <CardSection>
         {/* city */}
                            <View style={styles.cityContainer}>
                            <Text style={styles.cityText}>City:</Text>
                            
                            <Picker
                                selectedValue={this.state.city}
                                style={{ flex:2 }}
                                onValueChange={(Value) => this.setState({ city: Value })}>
                                <Picker.Item label="Vadodara" value="Vadodara" />
                                <Picker.Item label="Surat" value="Surat" />
                                <Picker.Item label="Rajkot" value="Rajkot" />
                                <Picker.Item label="Ahmedabad" value="Ahmedabad" />
                                <Picker.Item label="Porbandar" value="Porbandar" />
                                <Picker.Item label="Junagadh" value="Junagadh" />
                                <Picker.Item label="Vapi" value="Vapi" />
                                <Picker.Item label="Nadiad" value="Nadiad" />
                                
                            </Picker> 
                            
                            </View>

                        </CardSection>
                        <CardSection>
         {/* date */}       
                            <View style={styles.cityContainer}>
                            <Text style={styles.cityText}>Date:</Text>
                           <View style={styles.dateContainer}>
                            <TouchableOpacity onPress={()=>this.setState({dateVisibility:true})}>
                             <Text style={styles.datePicker}>{this.state.dateIsSelect}</Text>
                            <DateTimePickerModal
                                isVisible={this.state.dateVisibility}
                                onCancel={()=>this.setState({dateVisibility:false,date:'',dateIsSelect:'Select date'})}
                                mode={'date'}
                                onConfirm={(Date)=>this.setState({dateVisibility:false,date:Date,dateIsSelect:'Selected'})}
                            /></TouchableOpacity>
                            </View> 
                            </View>

                        </CardSection>
                        <CardSection>
         {/* time */}
                            <View style={styles.cityContainer}>
                                <Text style={styles.cityText}>Time:</Text>
                                 <View style={styles.dateContainer}>
                                <TouchableOpacity onPress={()=>this.setState({timeVisibility:true})}>
                                <Text style={styles.datePicker}>{this.state.timeIsSelect}</Text>
                                <DateTimePickerModal
                                isVisible={this.state.timeVisibility}
                                onCancel={()=>this.setState({timeVisibility:false,time:'',timeIsSelect:'Select Time'})}
                                mode={'time'}
                                onConfirm={(Time)=>this.setState({timeVisibility:false,time:Time,timeIsSelect:'Selected'})}
                            /></TouchableOpacity>
                            </View> 
                            </View>
        
                        </CardSection>
                        <CardSection>
        {/* location */}

                        <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>Location:</Text>
                        <TextInput
                                autoCapitalize='sentences'
                                autoCorrect={true}
                                //onEndEditing={()=>this.validate()}
                                style={styles.nameInput}
                                value={this.state.location}
                                onChangeText={(newadd)=>this.setState({location:newadd})}
                                placeholder="Location of Exhibition">
                         </TextInput>
                         </View>


 
                        </CardSection>

                        <CardSection> 
        {/* images   */}
                     
                        <View style={styles.cityContainer}>
                                <Text style={styles.cityText}>Image:</Text>
 
                        <View style={styles.dateContainer}>
                            <TouchableOpacity onPress={()=>this.pickImage()}>
                             <Text style={styles.datePicker}>{this.state.imageSelect}</Text>
                        </TouchableOpacity>
                        
                        </View></View>
                                   
                        
                        
                        </CardSection>
                        <CardSection>
                        {/* {console.log(this.state.imageFile)}     */}
                        {this.showIMG()}
                        </CardSection>
                       


        {/* discription */}
                        <CardSection>
                        <View style={styles.detailsContainer}>
                        <Text style={styles.nameText}>Details:</Text>
                        <TextInput
                                autoCapitalize='sentences'
                                autoCorrect={true}
                                 
                                style={styles.nameInput}
                                value={this.state.details}
                                onChangeText={(newdis)=>this.setState({details:newdis})}
                                placeholder="Add any other details">
                         </TextInput>
                         </View>

                        </CardSection>
                        <CardSection>
        {/* contact num */}
                            
        <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>Mobile No:</Text>
                        <TextInput
                                autoCapitalize="none"
                                autoCorrect={true}
                                keyboardType={'numeric'}
                                style={styles.nameInput}
                                value={this.state.mobile}
                                onChangeText={(newmob)=>this.setState({mobile:newmob})}
                                placeholder="Add your mobile no">
                         </TextInput>
                         </View>                    
                        </CardSection>
                        <CardSection>
        {/*Add button  */}
                    <View style={styles.buttonView}>   
                    <TouchableOpacity style={styles.buttonContainer} 
                                    onPress={()=>this.validateForm()}              
                                      
                                                        >                                           
                                

                    <Text style={styles.buttonText} >Add</Text></TouchableOpacity>
                    </View>  
                        </CardSection>                    

                    </Card>

                </ScrollView>
            
                
            
        )
    }

}


CreateExh.navigationOptions=()=>{
    return{
        title:"Create Exhibition"
        

 
    }
}

const styles=StyleSheet.create({
    nameContainer:{
        flexDirection:"row",
        height:40,
        flex:1,
        alignItems:"center"

    },
    nameText:{
        fontSize:18,
        paddingLeft:20,
        flex:1,
        fontWeight:"bold"

    },
    nameInput:{
        color:"#000",
        paddingHorizontal:0,
        fontSize:18,
        lineHeight:23,
        flex:2

    },
    typeContainer:{
        flexDirection:"row",
        height:40,
        flex:1,
        alignItems:"center"

    },
    typeText:{
        fontSize:18,
        paddingLeft:20,
        flex:1,
        fontWeight:"bold"
    },
    cityContainer:{
        flexDirection:"row",
        height:40,
        flex:1,
        alignItems:"center"

    },
    cityText:{
        fontSize:18,
        paddingLeft:20,
        flex:1,
        fontWeight:"bold"
    },
    datePicker:{
        color:"black",
        fontWeight:'700',
        opacity:0.7,
        lineHeight:20,
        alignSelf:'center'
    
    },
    dateContainer:{
        flexDirection:"row",
        height:40,
        flex:2,
        alignItems:"center"

    },
    detailsContainer:{
        flexDirection:"row",
        height:100,
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-start',
    
    },
    buttonContainer:{
        backgroundColor:"rgb(235,235,235)",
        borderRadius:5,
        borderWidth:1,
        borderColor:"black",
        alignSelf:'center',
        
        
        
    },
    buttonText:{
        fontSize:18,
        color:"black",
        alignSelf:'center',
        justifyContent:'center',
        fontWeight:"bold",
        paddingVertical:10,
        
        paddingHorizontal:Dimensions.get('window').width/5
    },
    buttonView:{
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        flex:1
    }
}

)

export default CreateExh;
