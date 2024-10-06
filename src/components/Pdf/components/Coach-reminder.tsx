/* eslint-disable @typescript-eslint/no-explicit-any */
import { View ,Text} from "@react-pdf/renderer"

const CoachReminder = ({item,title,styles}:{item:any,title:string,styles:any})  => {
    console.log(item)
    return (
        <>
        {item != undefined ?
            <>
                <Text style={styles.title} >{title}</Text>
                <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>condition</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>recommendations</Text>
                    </View>      
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>contraindications</Text>
                    </View>                                          
                    </View>

                    {/* Table Rows */}
                    {item.map((el:any,index:number) => {
                        return (
                        <>
                            <View style={styles.tableRow} key={index}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{el.condition}</Text>
                            </View>
                            <View style={styles.tableCol}>
                            {el.recommendations.map((val:any) => {
                                    return(
                                        <>
                                            <Text style={styles.tableCell}>{val}</Text>
                                        </>
                                    )
                                })}
                            </View>

                            <View style={styles.tableCol}>
                            {el.contraindications.map((val:any) => {
                                    return(
                                        <>
                                            <Text style={styles.tableCell}>{val}</Text>
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
        :<></>}
        </>
    )
}

export default CoachReminder