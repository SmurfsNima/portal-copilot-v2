/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, Document, StyleSheet, View } from '@react-pdf/renderer';
// import Header from './components/Header';
import TableInfoRender from './components/TableRender';
import Footer from './components/Footer';
import Header from './components/Header';
import WeaklyData from './components/WeaklyData';

const styles = StyleSheet.create({
  body: {
    width:'100%',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
    subHeader: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft:12,
    color:'#333333',
    fontFamily: 'Helvetica'
  },
      footerContainer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      paddingHorizontal: 40,
    },
    footerLine: {
      height: 5,
      backgroundColor: '#97B2C6',  // Light blue color for the line
      marginBottom: 10,
    },
    footerTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize: 10,
      color: '#b0b0b0',  // Light gray color for the text
    },
    reportName: {
      fontSize: 10,
    },
    pageNumber: {
      fontSize: 10,
    },  
    listItem: {
    marginLeft: 10,
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
    fontFamily: 'Helvetica'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 12,
    margin: 10,
    fontFamily: 'Helvetica'
  },
  text: {
    margin:12,
    fontSize: 10,
    textAlign: 'justify',
    color:'#242424',
    fontFamily: 'Helvetica'
  },
  text2: {
    margin: 10,
    marginLeft:24,
    fontSize: 14,
    marginBottom:0,
    textAlign: 'justify',
    fontFamily: 'Helvetica'
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
        <Page style={styles.body}  wrap>
            <Header logo={values["logo"]}></Header>
            <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
              <TableInfoRender title='Client Information' styles={styles}  item={Object.fromEntries(Object.entries(values["client_info"]).slice(0, 20))} ></TableInfoRender>
            </View>

            <Footer reportName={`Client's Weekly Report`} styles={styles} pageNumber={1}></Footer>
        </Page>
        <Page style={styles.body}  wrap>
            <Header logo={values["logo"]}></Header>
            <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
              <TableInfoRender title='' styles={styles}  item={Object.fromEntries(Object.entries(values["client_info"]).slice(20, 40))} ></TableInfoRender>
            </View>

            <Footer reportName={`Client's Weekly Report`} styles={styles} pageNumber={2}></Footer>
        </Page>  
        <WeaklyData logo={values["logo"]} styles={styles} title='Weekly report data' items={values["weekly_report_data"]}></WeaklyData>
         
        </Document>
        </>
    )
}
// Font.register({
//   family: 'Roboto',
//   src: "./fonts/Roboto-Regular.ttf"
// });
export default WeaklyReport