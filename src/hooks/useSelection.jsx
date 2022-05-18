import { useState, useRef, useEffect } from 'react'
import useDetectShift from "./useDetectShift";

const useSelection = (rows = [], rowKey) => {

  const rowKeysRef = useRef(rows.map(item => item[rowKey]));
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [sliceRange, setSliceRange] = useState();
  const [lastClick, setLastClick] = useState();

  const onShiftUp = () => {
    setSliceRange();
    setLastClick();
  };

  const shifted = useDetectShift(onShiftUp);

  const handleLastClick = (controlAll, newInfo) => {
    if (controlAll)
      setLastClick();
    else
      setLastClick(newInfo);
  };

  const handleShift = index => {
    const newSlice = [lastClick.index, index].sort((a, b) => a - b);
    setSliceRange(newSlice);
  };

  const handleCheck = (controlAll, keyValue, checked) => {
    if (checked || allChecked) {
      if (controlAll)
        return setSelectedKeys([]);
      const newKeys = selectedKeys.filter(item => item !== keyValue);
      return setSelectedKeys(newKeys);
    }

    if (controlAll)
      return setSelectedKeys(rowKeysRef.current);
    setSelectedKeys([...selectedKeys, keyValue]);
  };

  const handleSelect = (e, controlAll, rowData = {}) => {
    const keyValue = rowData[rowKey];
    const checked = selectedKeys.includes(keyValue);
    const index = rows.indexOf(rowData);
    if (controlAll)
      onShiftUp();
    if (shifted && lastClick && !controlAll)
      handleShift(index);
    else {
      handleLastClick(controlAll, { index, keyValue, checked: !checked, oldKeys: selectedKeys });
      handleCheck(controlAll, keyValue, checked);
    }
  };

  useEffect(() => {
    if (selectedKeys.length === rows.length)
      return setAllChecked(true);
    setAllChecked(false);
  }, [selectedKeys]);

  useEffect(() => {
    if (!sliceRange || !lastClick)
      return;
    const { checked, oldKeys: keysInMoment } = lastClick;
    const [start, end] = sliceRange;

    let newStateSet = new Set([]);

    const newKeys = rowKeysRef.current.slice(start, end + 1) || [];
    const newKeysSet = new Set(newKeys);
    const oldKeysSet = new Set(selectedKeys);
    if (checked)
      newStateSet = new Set([...keysInMoment].concat(newKeys));
    else
      newStateSet = new Set([...oldKeysSet].filter(x => !newKeysSet.has(x)));

    setSelectedKeys(Array.from(newStateSet));
  }, [sliceRange]);

  return {
    handleSelect,
    selectedKeys,
    allChecked
  };
};

export default useSelection

