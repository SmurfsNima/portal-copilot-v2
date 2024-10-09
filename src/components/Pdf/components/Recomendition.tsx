/* eslint-disable @typescript-eslint/no-explicit-any */
import { View ,Text,StyleSheet} from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  header1: {
    fontSize: 16,
    marginBottom:12,
    textAlign: 'left',
    color:'#0e005e',
    fontFamily: 'Helvetica'
  },  
  header: {
    fontSize: 15,
    marginBottom:12,
    textAlign: 'left',
    fontFamily: 'Helvetica'
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft:12,
    color:'#333333',
    fontFamily: 'Helvetica'
  },
  text: {
    fontSize:12,
    marginLeft:12,
    fontFamily: 'Helvetica',  
    marginBottom: 5,
  },
  listItem: {
    marginLeft: 10,
  },
});

const Recomendition =({data}:{data:any}) => {
    return (
        <>
        {data != undefined ?
            <>
            <Text style={styles.header1}>Recommendation</Text>
            <View style={styles.section}>
            <Text style={styles.header}>Diet Recommendations</Text>
            <Text style={styles.subHeader}>Do's</Text>
            <Text style={styles.text}>{data.recommendation.diet["Diet:Do's"]}</Text>
            <Text style={styles.subHeader}>Don't</Text>
            <Text style={styles.text}>{data.recommendation.diet["Diet:Don't"]}</Text>
            </View>

            <View style={styles.section}>
            <Text style={styles.header}>Exercise Recommendations</Text>
            {Object.entries(data.recommendation.exercise).map(([key, value]:[any,any]) => (
                <View key={key} style={styles.section}>
                <Text style={styles.subHeader}>{key}</Text>
                <Text style={styles.text}>{value.Recommendations}</Text>
                </View>
            ))}
            </View>

            <View style={styles.section}>
            <Text style={styles.header}>General Advice</Text>
            <Text style={styles.subHeader}>Hydration</Text>
            <Text style={styles.text}>{data.recommendation.advice["Advice:General Advice"].Recommendations.Hydration}</Text>

            <Text style={styles.subHeader}>Supplements and Minerals</Text>
            <Text style={styles.text}>
                {data.recommendation.advice["Advice:General Advice"].Recommendations['Supplements and Minerals']}
            </Text>

            <Text style={styles.subHeader}>Regular Monitoring</Text>
            <Text style={styles.text}>
                {data.recommendation.advice["Advice:General Advice"].Recommendations['Regular Monitoring']}
            </Text>

            <Text style={styles.header}>Potential Risk Factors</Text>
            {data.recommendation.advice["Advice:General Advice"]['Potential Risk Factors'].map((risk:any, index:number) => (
                <View key={index} style={styles.section}>
                <Text style={styles.subHeader}>{risk['Risk Factor']}</Text>
                <Text style={styles.text}>{risk.Recommendation}</Text>
                </View>
            ))}

            <Text style={styles.header}>Condition-Specific Considerations</Text>
            <Text style={styles.subHeader}>Diabetes</Text>
            <Text style={styles.text}>
                {data.recommendation.advice["Advice:General Advice"]['Condition-Specific Considerations'].Diabetes}
            </Text>
            <Text style={styles.subHeader}>Hypertension</Text>
            <Text style={styles.text}>
                {data.recommendation.advice["Advice:General Advice"]['Condition-Specific Considerations'].Hypertension}
            </Text>

            <Text style={styles.header}>General Tips</Text>
            {data.recommendation.advice["Advice:General Advice"]['General Tips'].map((tip:any, index:number) => (
                <View key={index} style={styles.section}>
                <Text style={styles.subHeader}>{tip.Tip}</Text>
                <Text style={styles.text}>{tip.Description}</Text>
                </View>
            ))}
            </View>
            </>
            :undefined
        } 
        </>
    )
}

export default Recomendition