/* eslint-disable @typescript-eslint/no-explicit-any */
import { View ,Text, Page } from "@react-pdf/renderer"
import Header from "./Header"
import Footer from "./Footer"

const WeaklyData =({styles,title,items,logo}:{styles:any,title:string,items:any,logo:string}) => {
    const rowSize = items["Goal"].length
    const step = 6
    // const stastIndex = 1
    const pageSizes:number =Math.floor(rowSize / step)+1
    console.log(pageSizes)
    return (
        <>
        
        {
            Array(pageSizes).fill(1).map((_val,pageIndex:number) => {
                // setStartIndex(stastIndex+step)
                return (
                    <Page style={styles.body}  wrap>
                        <Header logo={logo}></Header>
                        <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
                                {pageIndex == 0 &&<Text style={styles.title} >{title}</Text>}
                                <View style={styles.table}>
                                    <MyTableHeader styles={styles}></MyTableHeader>

                                    {Array(step).fill(1).map((_el:any,index) => {
                                        return (
                                        <>
                                            <View style={styles.tableRow} key={index}>
                                            <View style={{...styles.tableCol,width:'20%'}}>
                                                <Text style={styles.tableCell}>{items["Goal"][index+(pageIndex*step)]}</Text>
                                            </View>
                                            <View style={{...styles.tableCol,width:'13%'}}>
                                                <Text style={styles.tableCell}>{items["Status"][index+(pageIndex*step)]}</Text>
                                            </View>
                                            <View style={{...styles.tableCol,width:'13%'}}>
                                                <Text style={styles.tableCell}>{items["Target goal"][index+(pageIndex*step)]}</Text>
                                            </View>
                                            <View style={{...styles.tableCol,width:'13%'}}>
                                                <Text style={styles.tableCell}>{items["Current value"][index+(pageIndex*step)]}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{items["Recommendation"][index+(pageIndex*step)]}</Text>
                                            </View>
                                            <View style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{items["Type of progress"][index+(pageIndex*step)]}</Text>
                                            </View>                                                                                        
                                            </View>
                                        </>
                                        )
                                    })}            
                                </View>            
                        </View>

                        <Footer reportName={`Client's Weekly Report`} styles={styles} pageNumber={pageIndex+3}></Footer>
                    </Page> 
                )    
            })
        }
        {/* <Page style={styles.body}  wrap>
              <Header logo={logo}></Header>
              <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
                    
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'20%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Goal"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'13%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Status"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'13%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Target goal"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'13%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Current value"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Recommendation"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Type of progress"}</Text>
                            </View>                                                                                
                        </View>          

                        {Object.keys(items["Goal"].slice(0,7)).map((el:any,index) => {
                            return (
                            <>
                                <View style={styles.tableRow} key={index}>
                                <View style={{...styles.tableCol,width:'20%'}}>
                                    <Text style={styles.tableCell}>{items["Goal"][0]}</Text>
                                </View>
                                <View style={{...styles.tableCol,width:'13%'}}>
                                    <Text style={styles.tableCell}>{items["Status"][index]}</Text>
                                </View>
                                <View style={{...styles.tableCol,width:'13%'}}>
                                    <Text style={styles.tableCell}>{items["Target goal"][index]}</Text>
                                </View>
                                <View style={{...styles.tableCol,width:'13%'}}>
                                    <Text style={styles.tableCell}>{items["Current value"][index]}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{items["Recommendation"][index]}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{items["Type of progress"][index]}</Text>
                                </View>                                                                                        
                                </View>
                            </>
                            )
                        })}            
                    </View>            
              </View>

              <Footer reportName={`Client's Weekly Report`} styles={styles} pageNumber={3}></Footer>
        </Page> 
        <Page style={styles.body}  wrap>
              <Header logo={logo}></Header>
              <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
                    <Text style={styles.title} >{title}</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'20%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Goal"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'13%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Status"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'13%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Target goal"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'13%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Current value"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Recommendation"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Type of progress"}</Text>
                            </View>                                                                                
                        </View>          

                        {Object.keys(items["Goal"].slice(7,13)).map((el:any,index) => {
                            return (
                            <>
                                <View style={styles.tableRow} key={index}>
                                <View style={{...styles.tableCol,width:'20%'}}>
                                    <Text style={styles.tableCell}>{items["Goal"][index+7]}</Text>
                                </View>
                                <View style={{...styles.tableCol,width:'13%'}}>
                                    <Text style={styles.tableCell}>{items["Status"][index+7]}</Text>
                                </View>
                                <View style={{...styles.tableCol,width:'13%'}}>
                                    <Text style={styles.tableCell}>{items["Target goal"][index+7]}</Text>
                                </View>
                                <View style={{...styles.tableCol,width:'13%'}}>
                                    <Text style={styles.tableCell}>{items["Current value"][index+7]}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{items["Recommendation"][index+7]}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{items["Type of progress"][index+7]}</Text>
                                </View>                                                                                        
                                </View>
                            </>
                            )
                        })}            
                    </View>            
              </View>

              <Footer reportName={`Client's Weekly Report`} styles={styles} pageNumber={3}></Footer>
        </Page>        

        <Page style={styles.body}  wrap>
              <Header logo={logo}></Header>
              <View style={{display:'flex',justifyContent:'center',width:'100%',marginTop:'8px'}}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'20%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Goal"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'13%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Status"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'13%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Target goal"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    width:'13%',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Current value"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Recommendation"}</Text>
                            </View>
                            <View style={{
                                    ...styles.tableCol,
                                    color:'#cc4100',
                                    borderColor: '#782600',
                                }}>
                                    <Text style={styles.tableCell}>{"Type of progress"}</Text>
                            </View>                                                                                
                        </View>          

                        {Object.keys(items["Goal"].slice(13,20)).map((el:any,index) => {
                            return (
                            <>
                                <View style={styles.tableRow} key={index}>
                                <View style={{...styles.tableCol,width:'20%'}}>
                                    <Text style={styles.tableCell}>{items["Goal"][index+7]}</Text>
                                </View>
                                <View style={{...styles.tableCol,width:'13%'}}>
                                    <Text style={styles.tableCell}>{items["Status"][index+7]}</Text>
                                </View>
                                <View style={{...styles.tableCol,width:'13%'}}>
                                    <Text style={styles.tableCell}>{items["Target goal"][index+7]}</Text>
                                </View>
                                <View style={{...styles.tableCol,width:'13%'}}>
                                    <Text style={styles.tableCell}>{items["Current value"][index+7]}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{items["Recommendation"][index+7]}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{items["Type of progress"][index+7]}</Text>
                                </View>                                                                                        
                                </View>
                            </>
                            )
                        })}            
                    </View>            
              </View>

              <Footer reportName={`Client's Weekly Report`} styles={styles} pageNumber={3}></Footer>
        </Page>  */}
        </>
    )
}

const MyTableHeader =({styles}:{styles:any}) => {
    return (
        <View style={styles.tableRow}>
            <View style={{
                    ...styles.tableCol,
                    color:'#cc4100',
                    width:'20%',
                    borderColor: '#782600',
                }}>
                    <Text style={styles.tableCell}>{"Goal"}</Text>
            </View>
            <View style={{
                    ...styles.tableCol,
                    color:'#cc4100',
                    width:'13%',
                    borderColor: '#782600',
                }}>
                    <Text style={styles.tableCell}>{"Status"}</Text>
            </View>
            <View style={{
                    ...styles.tableCol,
                    color:'#cc4100',
                    width:'13%',
                    borderColor: '#782600',
                }}>
                    <Text style={styles.tableCell}>{"Target goal"}</Text>
            </View>
            <View style={{
                    ...styles.tableCol,
                    color:'#cc4100',
                    width:'13%',
                    borderColor: '#782600',
                }}>
                    <Text style={styles.tableCell}>{"Current value"}</Text>
            </View>
            <View style={{
                    ...styles.tableCol,
                    color:'#cc4100',
                    borderColor: '#782600',
                }}>
                    <Text style={styles.tableCell}>{"Recommendation"}</Text>
            </View>
            <View style={{
                    ...styles.tableCol,
                    color:'#cc4100',
                    borderColor: '#782600',
                }}>
                    <Text style={styles.tableCell}>{"Type of progress"}</Text>
            </View>                                                                                
        </View>           
    )
}

export default WeaklyData