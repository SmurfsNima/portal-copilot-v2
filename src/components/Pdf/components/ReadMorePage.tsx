/* eslint-disable @typescript-eslint/no-explicit-any */
import { Page,Text } from "@react-pdf/renderer"
import Header from "./Header"
import Footer from "./Footer"

const ReadMorePage = ({values,styles}:{values:any,styles:any}) => {
  return (
    <>
    <Page style={styles.body}>
      <Header logo={values["logo"]}></Header>
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

export default ReadMorePage