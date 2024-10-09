import { View ,Text } from "@react-pdf/renderer"

/* eslint-disable @typescript-eslint/no-explicit-any */
const TableInfoRender= ({item,styles,title}:{item:any,styles:any,title:string}) => {
    return (
        <>
          <Text style={styles.title} >{title}</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <View style={{
                    width: '50%',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    color:'#cc4100',
                    borderColor: '#782600',
              }}>
                <Text style={styles.tableCell}>key</Text>
              </View>
              <View style={{
                    width: '50%',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderTopWidth: 0,
                    color:'#cc4100',
                    borderColor: '#782600',
              }}>
                <Text style={styles.tableCell}>value</Text>
              </View>
            </View>

            {/* Table Rows */}
            {Object.keys(item).map((el:any,index) => {
                return (
                  <>
                  {item[el]["0"]!=null &&
                    <View style={styles.tableRow} key={index}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{el}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item[el]["0"]}</Text>
                      </View>
                    </View>
                  }
                  </>
                )
            })}
          </View>        
        </>
    )
}

export default TableInfoRender