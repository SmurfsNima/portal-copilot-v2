/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, Document, StyleSheet, View } from '@react-pdf/renderer';
// import data from './data.json';
import Patient_benchmark from './components/patient_benchmark';
import Header from './components/Header';
import Footer from './components/Footer';
import TableInfoRender from './components/TableRender';
import Treatment_plan from './components/Treatment_plan';
import ReadMorePage from './components/ReadMorePage';
// import CoachReminder from './components/Coach-reminder';

// Create styles
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
// const values :any = data 




// Create Document Component
const ClientReport = ({values}:{values:any}) => (
  <Document>
    <Page style={styles.body} >
        <Header logo={values["logo"]}></Header>
        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
          <TableInfoRender title='Client Information' styles={styles}  item={values["client_info"]} ></TableInfoRender>
        </View>

        <Footer pageNumber={1}></Footer>
    </Page>
    <ReadMorePage values={values} styles={styles}></ReadMorePage>
    <Patient_benchmark logo={values["logo"]} styles={styles} data={values["patient_benchmark"]}></Patient_benchmark>
    <Page style={styles.body} >
        <Header logo={values["logo"]}></Header>
        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
          <TableInfoRender title='Client Goals' styles={styles}  item={values["client_goal"]} ></TableInfoRender>
        </View>

        <Footer pageNumber={6}></Footer>
    </Page>  

    <Page style={styles.body} >
        <Header logo={values["logo"]}></Header>
        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
          <Treatment_plan item={values["treatment_plan"]} styles={styles} title='Recommended Action Areas'></Treatment_plan>
        </View>

        <Footer pageNumber={7}></Footer>
    </Page>    
    {/* <Page style={styles.body} >
        <Header logo={values["logo"]}></Header>
        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
          <CoachReminder item={values["coach_reminders"]} styles={styles} title='Recommended Action Areas'></CoachReminder>
        </View>

        <Footer pageNumber={8}></Footer>
    </Page>      */}
  </Document>
);

// Font.register({
//   family: 'Roboto',
//   src: "./fonts/Roboto-Regular.ttf"
// });

export default ClientReport