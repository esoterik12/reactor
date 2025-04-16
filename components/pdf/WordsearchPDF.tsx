// import { Document, Page, Text, View } from '@react-pdf/renderer'
// import { WordsearchPDFStyles as styles } from './WordsearchPDF.styles'
// import { EditMetaDataProps } from '@/types/input.types'
// import { EditWordsearchFormValues } from '@/lib/zod/edit/editWordsearch.schema'
// import { WordSearch } from '@aydee-app/word-search'

// interface WordsearchPDFProps {
//   data: EditWordsearchFormValues
//   metaData: EditMetaDataProps
// }

// const WordsearchPDF: React.FC<WordsearchPDFProps> = ({ data, metaData }) => {
//   // Ensure at least one version is generated
//   const numberOfVersions = metaData.numberOfContent || 1

//   // This will store one or more wordsearch grids.
//   const wordsearchBoards: string[][][] = []

//   const wordSearch = new WordSearch({
//     words: data.wordsearchWords.map(word => word.word),
//     size: 12,
//     allowDiagonal: true,
//     fillBlanks: false
//   })

//   // Generate the defined number of wordsearch boards.
//   for (let i = 0; i < numberOfVersions; i++) {
//     const grid = wordSearch.generate()
//     wordsearchBoards.push(grid)
//   }

//   console.log('wordsearchBoards', wordsearchBoards)

//   return (
//     <Document>
//       {wordsearchBoards.map((grid, pageIndex) => (
//         <Page
//           key={`wordsearchPage-${pageIndex}`}
//           size='A4'
//           orientation='landscape'
//           style={styles.page}
//         >
//           <View style={styles.gridContainer}>
//             {grid.map((row, rowIndex) => (
//               <View style={styles.row} key={`row-${rowIndex}`}>
//                 {row.map((cell, cellIndex) => (
//                   <View style={styles.cell} key={`cell-${cellIndex}`}>
//                     <Text style={styles.cellText}>{cell}</Text>
//                   </View>
//                 ))}
//               </View>
//             ))}
//           </View>
//         </Page>
//       ))}
//     </Document>
//   )
// }

// export default WordsearchPDF
