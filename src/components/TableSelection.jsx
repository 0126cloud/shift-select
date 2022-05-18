import Checkbox from "./Checkbox";
import useSelection from "../hooks/useSelection";

const TableSelection = ({ data = [], rowKey }) => {
  const { handleSelect, selectedKeys, allChecked } = useSelection(data.filter(item => !item.hidden), rowKey);

  return (
    <table>
      <thead>
        <tr>
          <th>
            <Checkbox
              controlAll
              checked={allChecked}
              onChange={e => handleSelect(e, true)} />
          </th>
          <th></th>
          <th>狀態</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const { hidden, status } = row;
          const checked = selectedKeys.includes(row[rowKey]);
          return (
            <tr key={`row-${index}`} className={checked ? 'selected' : ''}>
              <td>
                <Checkbox
                  hidden={hidden}
                  checked={checked}
                  onChange={e => handleSelect(e, false, row)} />
              </td>
              <td></td>
              <td>{status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default TableSelection;
