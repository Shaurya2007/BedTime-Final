import React,{Component} from 'react'
import {View,Text,TouchableOpacity,TextInput,KeyboardAvoidingView,KeyboardAvoidingViewComponent} from 'react-native'

export default class WriteScreen extends Component{

constructor(){

super()

this.state={
    author='',
    title='',
    storyText=''
}

}

    render(){
    return(

        <KeyboardAvoidingView>
        <View>
           <TextInput
           style={{height:100,borderWidth:1.5,fontSize:20,margin:10,paddingLeft:10}}
           placeholder="Type Here"
           multiline={true}
           />
           <TouchableOpacity
           style={{height=50,width=20}}
           onPress={()=>{
               this.state.sumbitStory(),
               ToastAndroid.show("Your Story Have Been Submitted",ToastAndroid.SHORT)
           }}
           >
             <Text>
                 Sumbit
             </Text>
           </TouchableOpacity>

        <TextInput style={{height:100,width:40,borderWidth:1.5,fontSize:20,margin:10,paddingLeft:10}}
        placeholder="Story Title"
        onChangeText={text=>this.setState({
        title:text
        })}
        />

<TextInput style={{height:100,width:40,borderWidth:1.5,fontSize:20,margin:10,paddingLeft:10}}
        placeholder="Author Name"
        onChangeText={text=>this.setState({
        author:text
        })}
        />
        </View>
        
        </KeyboardAvoidingView>
    )
}

sumbitStory=async()=>{
    db.collection("transaction").add({
        author=this.state.author,
        title=this.state.title,
        storyText=this.state.storyText
      })
      this.setState({
        author='',
        title='',
        storyText=''
      })
}

}