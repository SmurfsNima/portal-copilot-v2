/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, Text, Document, StyleSheet, Font, View, Image } from '@react-pdf/renderer';
import data from './data.json';

// Create styles
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
const values :any = data 
// Header Component
const Header = () => (
  <View style={styles.header}>
    <Image src={values.logo} style={{width:'35px',height:'35px'}}></Image>
    <View style={styles.line} /> {/* Horizontal line */}
  </View>
);

// Footer Component
const Footer = ({ pageNumber}:{pageNumber:number}) => (
  <View style={styles.footer}>
    <Text>Page {pageNumber}</Text>
  </View>
);

const ReadMorePage = () => {
  return (
    <>
    <Page style={styles.body}>
      <Header></Header>
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

// Create Document Component
const ClinicReport = () => (
  <Document>
    <Page style={styles.body} >
        <Header></Header>
        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
            {Object.keys(values).map((el,index) =>{
                return (
                    <>
                        {
                            el == 'client_info' &&
                            <TableInfoRender key={index} item={el} ></TableInfoRender>
                        }
                        return <View></View>
                    </>
                )
            })}

        </View>

        <Footer pageNumber={1}></Footer>
    </Page>
    <ReadMorePage></ReadMorePage>
    <Page style={styles.body} >
        <Header></Header>
        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
            {Object.keys(values).map((el,index) =>{
                return (
                    <>
                        {
                            el == 'patient_benchmark' &&
                            <TableBenchMarkRender key={index} item={el} ></TableBenchMarkRender>
                        }
                        return <View></View>
                    </>
                )
            })}

        </View>

        <Footer pageNumber={3}></Footer>
    </Page>    
  </Document>
);

const TableInfoRender= ({item}:{item:any}) => {
    return (
        <>
          <Text style={styles.title} >Client Information:</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>key</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>value</Text>
              </View>
            </View>

            {/* Table Rows */}
            {Object.keys(values[item]).map((el:any,index) => {
                return (
                  <>
                  {values[item][el]["0"]!=null &&
                    <View style={styles.tableRow} key={index}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{el}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{values[item][el]["0"]}</Text>
                      </View>
                    </View>
                  }
                  </>
                )
            })}
          </View>        
        </>
    )
}

const TableBenchMarkRender= ({item}:{item:any}) => {
    return (
        <>
          <Text style={styles.title} >Physiological Test Results</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>Area</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>Test L1</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>Test L2</Text>
              </View>    
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>Result</Text>
              </View>    
              <View style={styles.tableCol2}>
                <Text style={styles.tableCell}>Benchmark Performance</Text>
              </View>                                    
            </View>

            {/* Table Rows */}
            {Object.keys(values[item]).map((el:any,index) => {
                return (
                  <>
                    <View style={styles.tableRow} key={index}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{values[item][el]["Benchmark areas"]}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{values[item][el]["Test L1"]}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{values[item][el]["Test L2"]}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{values[item][el]["Result"]}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={{...styles.tableCell,color:values[item][el]["Benchmark performance"]=='Needs Focus'?'#fc9803':'#2e2e2e'}}>{values[item][el]["Benchmark performance"]}</Text>
                      </View>                                          
                    </View>
                  </>
                )
            })}
          </View>        
        </>
    )
}


Font.register({
  family: 'Roboto',
  src: "http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf"
});

export default ClinicReport