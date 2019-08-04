const styles = ({ palette, spacing }) => ({
  menuContainer: {
    position: 'absolute',
    width: '100%',
    transform: 'translateY(4px)',
    maxHeight: 256,
    overflow: 'auto',
    zIndex: 5,
  },
  emptyRoot: {
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.text.hint,
  },
  emptyIcon: {
    fontSize: 48,
    color: 'inherit',
    marginBottom: spacing(1),
  },
  emptyText: {},
});

styles.traits = ['menuContainer', 'emptyRoot', 'emptyIcon', 'emptyText'];

export default styles;
