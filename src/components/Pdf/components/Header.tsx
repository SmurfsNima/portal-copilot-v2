/* eslint-disable @typescript-eslint/no-unused-vars */
import { View , StyleSheet} from "@react-pdf/renderer";

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
})

const Header = ({logo}:{logo:string}) => (
  <View style={styles.header}>

      {/* <Image src={logo} style={{width:'35px',height:'35px'}}></Image> */}

    <View style={styles.line} /> {/* Horizontal line */}
  </View>
);

export default Header