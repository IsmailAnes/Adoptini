import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#10203C',
  },
  headerContainer: {
    backgroundColor: 'red',
  },
  headerCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTitleText: {
    color: '#ECD8E9',
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 20,
    marginTop: 10,
  },
  distanceText: {
    color: '#ECD8E9',
    fontFamily: 'Montserrat-Regular',
  },
  addedByText: {
    color: '#ECD8E9',
    fontFamily: 'Montserrat-Regular',
  },
  PostTimeText: {
    color: '#ECD8E9',
    fontFamily: 'Montserrat-Bold',
    marginTop: 15,
    marginLeft: 5,
    marginBottom:20,
    fontSize: 12,
  },
  sexeText: {
    color: '#2855AD',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  sexeTextFemale: {
    color: '#994556',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 15,
  },
  sexeContainerFemale: {
    backgroundColor: '#4B3051',
    width: '35%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
  },
  sexeContainer: {
    backgroundColor: '#1B2F56',
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
  },
  aboutMeHeaderText: {
    color: '#ECD8E9',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    marginTop: 30,
  },
  aboutMeText: {
    color: '#ECD8E9',
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    marginTop: 20,
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: '#192845',
    width: '27%',
    height: 80,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  infoBoxTitle: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  infoBoxSubTitle: {
    color: 'grey',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    marginTop: 5,
  },
  phoneNumberText: {
    color: '#ECD8E9',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 5,
    fontSize: 12,
  },
  contactBox:{
    backgroundColor: '#192845',
    width: '100%',
    height: 60,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection:'row'
  },
  modalStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    width:'95%',
    marginBottom:Platform.OS === "ios" ? 20: "1%",
    alignSelf:'center',
  },
  modalContentStyle: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalizeContainer: {
    padding: 16,
    height: "100%",
  },
  locationContainer:{
    backgroundColor: '#0d1c38',
    height: 40,
    width:'80%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent:'center',
    marginBottom:10,
    alignSelf:'center',
    alignItems:'center'
  },
  locationContainerDanger:{
    backgroundColor: '#4B3051',
    height: 40,
    width:'80%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent:'center',
    marginBottom:10,
    alignSelf:'center',
    alignItems:'center'
  },
  locationText:{
    color:'white',
    fontFamily:'Montserrat-SemiBold'

  },
  locationTextDanger:{
    color:'#4B3051',
    fontFamily:'Montserrat-SemiBold'

  }
});
