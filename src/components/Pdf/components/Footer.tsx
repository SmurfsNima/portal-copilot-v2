import { View ,Text, StyleSheet} from "@react-pdf/renderer";

const styles= StyleSheet.create({
    footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },  
})

const Footer = ({ pageNumber}:{pageNumber:number}) => (
  <View style={styles.footer}>
    <Text>Page {pageNumber}</Text>
  </View>
);

export default Footer