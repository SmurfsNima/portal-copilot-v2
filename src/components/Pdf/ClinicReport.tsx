/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';
// import data from './data.json';
import Patient_benchmark from './components/patient_benchmark';
import Header from './components/Header';
import Footer from './components/Footer';
import TableInfoRender from './components/TableRender';
import Treatment_plan from './components/Treatment_plan';
import CoachReminder from './components/Coach-reminder';
// import Recomendition from './components/Recomendition';
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
    fontSize: 14,
    margin: 10,
    fontFamily: 'Helvetica'
  },
  text: {
    margin:6,
    fontSize: 14,
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


const ReadMorePage = ({values}:{values:any}) => {
  return (
    <>
    <Page style={styles.body}>
      <Header logo={values["logo"]}></Header>
      <Text style={styles.title} >Please read before reviewing this report</Text>
      <Text style={styles.subtitle} >WHY WE USE EXPERIENCE LEVELS</Text>
      <Text style={styles.text}>
        Scoring is recommended standards backed by reputable academic sources and normative data. The benchmarks
        have experience levels so the score will be against the relevant experience level benchmark for you. Experience
        levels used are stated on the client overview page of this report.
      </Text>
      <Text style={styles.subtitle} >EXPERIENCE LEVELS:</Text>
      <Text style={styles.text}>
        • Novice – a client with some experience in training, nutrition and lifestyle management but with no structured
        programme
      </Text>  
      <Text style={styles.text}>
        • Committed – a client working on structured programmes covering fitness, nutrition and lifestyle
      </Text>
      <Text style={styles.text}>
        • Elite – a client who has been working on structured longevity programmes and exceeds benchmark performance
        in their age/gender group
      </Text>
      <Text style={styles.subtitle} >WHAT THE BENCHMARKS MEAN:</Text>
      <Text style={styles.text}>
        • Novice – a good level for your age/gender of physiological, fitness and emotional health. This will mean meeting or
        exceeding UK healthy guidelines.
      </Text>  
      <Text style={styles.text}>
        • Committed – excellent level typically top 10% in age/gender group for physiological, fitness and emotional health.
        This level of performance in studies suggests a reduction in the probability of all cause mortality by 47%.
      </Text>
      <Text style={styles.text}>
        • Elite – good or excellent in age/gender group 10 years younger than you. For the people who want to maintain a
        high level of capability as they age.
      </Text>    

      <Text style={styles.subtitle} >SCORING EXPLAINED:</Text>
      <Text style={styles.text}>
      • Needs focus – no activity in this area or a low test performance
      </Text>  
      <Text style={styles.text}>
      • OK – performance is 25-75% of benchmark
      </Text>
      <Text style={styles.text}>
• Good - performance is 76% to 99% of benchmark
      </Text>       
      <Footer pageNumber={2}></Footer>
    </Page>    
    </>
  )
}

const renderSection = (data:any, level = 0) => {
  return Object.entries(data).map(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      // If the value is a nested object, recursively render it
      return (
        <View key={key} style={{ marginLeft: level * 10, marginBottom: 5 }}>
          <Text style={styles.subHeader}>{key}</Text>
          {renderSection(value, level + 1)}
        </View>
      );
    } else if (Array.isArray(value)) {
      // If it's an array, render each item
      return (
        <View key={key} style={{ marginLeft: level * 10 }}>
          <Text style={styles.subHeader}>{key}</Text>
          {value.map((item, index) => (
            <View key={index} style={styles.listItem}>
              {typeof item === 'object' ? renderSection(item, level + 1) : <Text>{item}</Text>}
            </View>
          ))}
        </View>
      );
    } else {
      // Otherwise, just render the key-value pair
      return (
        <View key={key} style={{ marginLeft: level * 10, marginBottom: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>{key}: </Text>
          <Text style={styles.text}>
            {value+''}
          </Text>
        </View>
      );
    }
  });
};
// Create Document Component
const ClinicReport = ({values}:{values:any}) => (
  <Document>
    <Page style={styles.body} >
        <Header logo={values["logo"]}></Header>
        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
          <TableInfoRender title='Client Information' styles={styles}  item={values["client_info"]} ></TableInfoRender>
        </View>

        <Footer pageNumber={1}></Footer>
    </Page>
    <ReadMorePage values={values}></ReadMorePage>
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
    <Page style={styles.body} >
        <Header logo={values["logo"]}></Header>
        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
          <CoachReminder item={values["coach_reminders"]} styles={styles} title='Coach Reminders'></CoachReminder>
        </View>

        <Footer pageNumber={8}></Footer>
    </Page>     
   <Page style={styles.body} >
        <Header logo={values["logo"]}></Header>
        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
          {/* <Recomendition data={values} ></Recomendition> */}
          {renderSection(values["recommendation"])}
        </View>

        <Footer pageNumber={8}></Footer>
    </Page>         
  </Document>
);

// Font.register({
//   family: 'Roboto',
//   src: "./fonts/Roboto-Regular.ttf"
// });

export default ClinicReport