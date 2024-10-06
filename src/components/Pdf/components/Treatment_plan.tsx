/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, View } from '@react-pdf/renderer';

const Treatment_plan = ({item,title,styles}:{item:any,title:string,styles:any}) => {
    return (
        <>
            <Text style={styles.title} >{title}</Text>
            <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Category</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Benchmark area</Text>
                </View>      
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Priority 1: First 12 Weeks</Text>
                </View>    
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Priority 2: Beyond 12 Weeks</Text>
                </View>                                         
                </View>

                {/* Table Rows */}
                {item.map((el:any,index:number) => {
                    return (
                    <>
                        <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{el.subCategory}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{el.area}</Text>
                        </View>

                        <View style={styles.tableCol}>
                            {el.first12Weeks["dos"].map((val:any) => {
                                return(
                                    <>
                                        <Text style={styles.tableCell}>{val+"(dos)"}</Text>
                                    </>
                                )
                            })}
                            {el.first12Weeks["donts"].map((val:any) => {
                                return(
                                    <>
                                        <Text style={styles.tableCell}>{val+"(donts)"}</Text>
                                    </>
                                )
                            })}                            
                        </View>
                        <View style={styles.tableCol}>      
                            {el.second12Weeks["dos"].map((val:any) => {
                                return(
                                    <>
                                        <Text style={styles.tableCell}>{val+"(dos)"}</Text>
                                    </>
                                )
                            })}
                            {el.second12Weeks["donts"].map((val:any) => {
                                return(
                                    <>
                                        <Text style={styles.tableCell}>{val+"(donts)"}</Text>
                                    </>
                                )
                            })}                            
                        </View>                                                                        
                        </View>
                    </>
                    )
                })}
            </View>              
        </>
    )
}

export default Treatment_plan