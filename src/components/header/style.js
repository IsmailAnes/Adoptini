import { StyleSheet } from "react-native";
export default StyleSheet.create({
    headerContainer:{
        width: '100%',
        height: 100,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        shadowOpacity: 0.2,
        marginTop:50,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    headerText:{
        color:'#ECD8E9',
        fontSize:18,
        fontFamily:'Montserrat-ExtraBold',
        marginLeft:20,
        margin:5
    },
    headerSubText:{
        color:'#ECD8E9',
        fontSize:14,
        fontFamily:'Montserrat-Medium',
        marginLeft:20,
        margin:5
    },
    pin:{
        height:30,
        width:30,
        marginBottom:5
    }
});