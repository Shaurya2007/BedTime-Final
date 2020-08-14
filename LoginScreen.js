import React,{Component} from 'react'
import { View,TouchableOpacity,Text , StyleSheet,TextInput} from "react-native";
import db from '../config'
import firebase from 'firebase'

export default class LoginScreen extends Component{
    constructor(){
        super()
        this.state={
         emailId:'',
         password:''
        }
    }
    render(){
        return(
            <View style={styles.container}>
            <TextInput
            style={styles.input1}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text)=>{
                this.setState({
                emailId:text
                })
            }}
            />

            <TextInput
            style={styles.input2}
            placeholder="Password"
            secureTextEntry = {true}
            onPress={(text)=>{
            this.setState({
                password:text
            })
            }}
            />

            <TouchableOpacity
            style={styles.button}
            onPress={()=>{
                this.login(this.state.emailId,this.state.password)
            }}
            >

            <Text style={{alignItems:'center'}}>
                Login
            </Text>

            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    input1:{
        flexDirection:'row',
        height:40,
        width:'auto',
        borderWidth:0.5,
        alignItems:'center',
        backgroundColor:'grey'
    },
    input2:{
        flexDirection:'row',
        height:40,
        width:'auto',
        borderWidth:0.5,
        alignItems:'center',
        backgroundColor:'grey'
    },
    button:{
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:2
    }
})