import Downshift from 'downshift';

export const createStateReducer = ({
  menuClosedAfterClicked,
  multipleSelect,
}) => (state, changes) => {
  switch (changes.type) {
    case Downshift.stateChangeTypes.changeInput:
      return {
        ...changes,
        highlightedIndex: 0,
      };
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return multipleSelect
        ? {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            isOpen: true,
            inputValue: '',
          }
        : {
            ...changes,
            isOpen: !menuClosedAfterClicked,
            highlightedIndex: menuClosedAfterClicked
              ? null
              : state.highlightedIndex,
          };
    default:
      return changes;
  }
};
