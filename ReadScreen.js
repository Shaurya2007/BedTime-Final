import React,{Component} from 'react'
import {View,Text,TouchableOpacity,TextInput} from 'react-native'
import { SearchBar , FlatList } from 'react-native-elements'
import WriteScreen from './WriteScreen'
import db from '../config'

export default class ReadScreen extends Component{
constructor(props){
    super(props)
    this.state={
    allStories:[],
    search:'',
    lastVisibleTransaction:''
    }
}

componentDidMount(){
const query= await db.collection("allStories").get()
query.docs.map((doc)=>{
    this.setState({
    allStories:[...this.state.allStories,doc.data()]
    })
})
}

    render(){
    return(
        <View style={styles.container} >
            <View style={styles.container}>
            <SearchBar
            style={styles.bar}
            placeholder="Search Here"
            onChangeText={(text)=>{
                this.setState({search:text})
            }}
            />
            <TouchableOpacity
            style={styles.searchButton}
            onPress={()=>{
                this.searchFilter(this.state.search)
            }}
            >
              <Text>Search</Text>
            </TouchableOpacity>

            </View>
            <FlatList

            data={this.state.allStories}
            renderItem={({item})=>(
            <View style={{borderBottomWidth:2}}>
             <Text>{"author id:"+ item.author}</Text>
             <Text>{"Date:" + item.date.toDate()}</Text>
             <Text>{"Title:" + item.title}</Text>
             <Text>{"Story :" + item.storyText}</Text>
            </View>
            )}

            keyExtractor={(item,index)=>index.toString()}
            
            />
        </View>
    )
}

retriveStories=async()=>{
    const allStories = await db.collection("storyText").where("storyText","==",this.state.storyText).get()
}

searchFilter=async(text)=>{
    var enteredText = text.split("")
    var text = text.toUpperCase()

    if(enteredText[0].toUpperCase()==='B'){
        const filter = await db.collection("allStories").where('storyText','==',text).get()
        filter.docs.map((doc)=>{
        this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleTransaction:doc
        })
        })
    }
    if(enteredText[0].toUpperCase()==='S'){
        const filter = await db.collection("allStories").where('author','==',text).get()
        filter.docs.map((doc)=>{
        this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleTransaction:doc
        })
        })
    }
}

fetchMoreStories=async()=>{
    var enteredText = text.split("")
    var text = text.toUpperCase()

    if(enteredText[0].toUpperCase()==='B'){
        const filter = await db.collection("allStories").where('storyText','==',text).startAfter(this.state.allStories)
        query.docs.map((doc)=>{
        this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleTransaction:doc
        })
        })
    }
 else if(enteredText[0].toUpperCase()==='S'){
    const filter = await db.collection("allStories").where('storyText','==',text).startAfter(this.state.allStories)
    query.docs.map((doc)=>{
    this.setState({
        allStories:[...this.state.allStories,doc.data()],
        lastVisibleTransaction:doc
    })
    })
}
}


}

const style = StyleSheet.create({
    container:{

        flex:1,
        marginTop:10

    },

    searchBar:{

    flexDirection:'row',
    height:40,
    width:'auto',
    borderWidth:0.5,
    alignItems:'center',
    backgroundColor:'grey'

    },

    bar:{

    borderWidth:2,
    height:30,
    width:300,
    paddingLeft:10

    },

    searchButton:{

    borderWidth:1,
    height:30,
    width:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green'

    }
})