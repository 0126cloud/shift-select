import TableSelection from "./components/TableSelection"
import './App.css'

const hiddenIndex = [1, 8, 11]
const rows = [...Array(13)].map((e,i) => ({ id: i + 1, status: '00-未派車', hidden: hiddenIndex.includes(i) })) 

const App = () => {
  return (
    <>
      <div>
        <ol><strong>使用 React Hook 完成，按住 Shift 可多選清單 Checkboxes (其中有不可選的須跳過) 提示:</strong>
          <li>圖片上有的都要有</li>
          <li>左上角的全勾選跟全不勾選都要能用</li>
          <li>底下全部可以勾選的，都被勾選的時候，左上角的全勾選要自動跳起</li>
          <li>這是一個多選清單</li>
          <li>先勾選第3列資料，按住shift在勾選最後一列資料時， 第三列資料到最後一列資料 之間全部可勾選的都要被勾選， 反之亦然 (反選跟從下面點上去都要能動)</li>
        </ol>
      </div>
      <TableSelection data={rows} rowKey='id' />
    </>
  )
}

export default App