import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDetectErrorKey } from '../logics';

const Component = ({
  tabs,
  value,
  setValue,
  field,
  form,
  TabsProps,
  SingleTabProps,
}) => {
  useDetectErrorKey({
    keys: tabs.map(({ value: tabValue }) => tabValue),
    value,
    setValue,
    field,
    form,
  });
  return (
    <Tabs
      value={value}
      {...TabsProps}
      onChange={(_, tabKey) => setValue(tabKey)}
    >
      {tabs.map(tabProps => (
        <Tab key={tabProps.value} {...SingleTabProps} {...tabProps} />
      ))}
    </Tabs>
  );
};

const TabsField = ({
  initialTab,
  name,
  tabs,
  TabsProps,
  SingleTabProps,
  children,
}) => {
  if (!tabs || !tabs.length) return null;
  const [tab, setTab] = React.useState(initialTab || tabs[0].value);
  return (
    <>
      <Field name={name}>
        {({ field, form }) => (
          <Component
            tabs={tabs}
            value={tab}
            field={field}
            form={form}
            setValue={setTab}
            TabsProps={TabsProps}
            SingleTabProps={SingleTabProps}
          />
        )}
      </Field>
      {children(tab, setTab)}
    </>
  );
};

TabsField.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  initialTab: PropTypes.string,
  TabsProps: PropTypes.shape({}),
  SingleTabProps: PropTypes.shape({}),
};
TabsField.defaultProps = {
  initialTab: undefined,
  TabsProps: {},
  SingleTabProps: {},
};

export default TabsField;
