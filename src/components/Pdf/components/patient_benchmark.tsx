/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page, View,Text } from "@react-pdf/renderer"
import Header from "./Header"
import Footer from "./Footer"

const Patient_benchmark = ({data,styles,logo}:{data:any,styles:any,logo:string}) => {
    return (
        <>
            <Page style={styles.body} >
                <Header logo={logo}></Header>
                <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
                    <>
                        <TableBenchMarkRender styles={styles} title='Physiological Test Results' category='Physiological'  item={data} ></TableBenchMarkRender>
                    </>
                </View>

                <Footer pageNumber={3}></Footer>
            </Page>   
            <Page style={styles.body} >
                <Header logo={logo}></Header>
                <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
                    <TableBenchMarkRender styles={styles} title='Fitness Test Results'  category='Fitness' item={data} ></TableBenchMarkRender>
                </View>

                <Footer pageNumber={4}></Footer>
            </Page>      
            <Page style={styles.body} >
                <Header logo={logo}></Header>
                <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>

                    <TableBenchMarkRender styles={styles} title='Emotional Test Results'  category='Emotional'  item={data} ></TableBenchMarkRender>

                </View>

                <Footer pageNumber={5}></Footer>
            </Page>              
        </>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
const TableBenchMarkRender= ({item,category,title,styles}:{item:any,category:string,title:string,styles:any}) => {
    return (
        <>
          <Text style={styles.title} >{title}</Text>
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
            {item.filter((val:any) =>val.Category == category ).map((el:any,index:number) => {
                return (
                  <>
                    <View style={styles.tableRow} key={index}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{el["Benchmark areas"]}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{el["Test L1"]}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{el["Test L2"]}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{el["Result"]}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={{...styles.tableCell,color:el["Benchmark performance"]=='Needs Focus'?'#fc9803':'#2e2e2e'}}>{el["Benchmark performance"]}</Text>
                      </View>                                          
                    </View>
                  </>
                )
            })}
          </View>        
        </>
    )
}


export default Patient_benchmark