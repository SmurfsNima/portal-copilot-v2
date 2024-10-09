/* eslint-disable @typescript-eslint/no-unused-vars */
import { View ,Image, StyleSheet} from "@react-pdf/renderer";

const styles =StyleSheet.create({
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
  },
  line: {
    borderBottomWidth: 1, // Line thickness
    borderColor: '#96aaff', // Line color
    width: '100%', // Full width of the header
    marginBottom: 8, // Space below the line
    marginTop:8
  },  
    footerLine: {
      height: 5,
      backgroundColor: '#97B2C6',  // Light blue color for the line
      marginBottom: 10,
    },    
})

// eslint-disable-next-line no-empty-pattern
const Header = ({logo}:{logo:string}) => (
  <View style={styles.header}>
      {logo!= '' &&
        <Image src={logo} style={{width:150,height:50,marginBottom:5}}></Image> 
      }

    <View style={styles.footerLine} /> {/* Horizontal line */}
  </View>
);

export default Header