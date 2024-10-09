/* eslint-disable @typescript-eslint/no-explicit-any */
import { View ,Text} from "@react-pdf/renderer";

// const styles= StyleSheet.create({
//     footer: {
//     position: 'absolute',
//     bottom: 10,
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//     fontSize: 10,
//   },  
// })

const Footer = ({ pageNumber,styles,reportName}:{pageNumber:number,styles:any,reportName:string}) => (
    <View style={styles.footerContainer}>
        <View style={styles.footerLine}></View>
        <View style={styles.footerTextContainer}>
          <Text style={styles.reportName}>{reportName}</Text>
          <Text style={styles.pageNumber} >{pageNumber}</Text>
      </View>  
    </View>
);

export default Footer