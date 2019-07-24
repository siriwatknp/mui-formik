import React from 'react';
import { Field } from 'formik';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useDetectErrorKey } from '../logics';

const Component = ({ tabs, value, setValue, field, form, ...props }) => {
  useDetectErrorKey({
    keys: tabs.map(({ value: tabValue }) => tabValue),
    value,
    setValue,
    field,
    form,
  });
  return (
    <Tabs value={value} {...props} onChange={(_, tabKey) => setValue(tabKey)}>
      {tabs.map(tabProps => (
        <Tab key={tabProps.value} {...tabProps} />
      ))}
    </Tabs>
  );
};

const TabsForm = ({ initialTab, name, tabs, children }) => {
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
          />
        )}
      </Field>
      {children(tab, setTab)}
    </>
  );
};

TabsForm.propTypes = {};
TabsForm.defaultProps = {};

export default TabsForm;
