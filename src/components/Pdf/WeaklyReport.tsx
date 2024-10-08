/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, Document, StyleSheet, Font, View } from '@react-pdf/renderer';
// import Header from './components/Header';
import TableInfoRender from './components/TableRender';
import Footer from './components/Footer';

const styles = StyleSheet.create({
  body: {
    width:'100%',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  line: {
    borderBottomWidth: 1, // Line thickness
    borderColor: '#96aaff', // Line color
    width: '100%', // Full width of the header
    marginBottom: 8, // Space below the line
    marginTop:8
  },  
  title: {
    fontSize: 16,
    marginBottom:12,
    textAlign: 'left',
    color:'#0e005e',
    fontFamily: 'Roboto'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    margin: 10,
    fontFamily: 'Roboto'
  },
  text: {
    margin:6,
    fontSize: 14,
    textAlign: 'justify',
    color:'#242424',
    fontFamily: 'Times-Roman'
  },
  text2: {
    margin: 10,
    marginLeft:24,
    fontSize: 14,
    marginBottom:0,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },  
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 5,
  },
  bulletPoint: {
    marginLeft: 10,
  },  
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  table: {
    display: 'flex', // Use Flexbox layout
    flexDirection: 'column', // Table rows stack vertically
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    display: 'flex', // Use Flexbox layout
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#000',
  },
  tableCol2: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: '#000',
  },  
  tableCell: {
    margin: 5,
    
    fontSize: 10,
  },    
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },  
});
const WeaklyReport = ({values}:{values:any}) => {
    // const values:any = Data
    return (
        <>
          <Document>
             <Page  wrap={true} size="A4" style={styles.body} >
                 {/* <Header logo={values["logo"]}></Header> */}
                <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
                <TableInfoRender title='Client Information' styles={styles}  item={values["client_info"]} ></TableInfoRender>
                </View>

                <Footer pageNumber={1}></Footer>                 
             </Page>
          </Document>
        </>
    )
}
Font.register({
  family: 'Roboto',
  src: "https://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf"
});
export default WeaklyReport