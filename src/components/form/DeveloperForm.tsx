import * as React from 'react';
import styles from './developerForm.module.css';
import Select, { SelectOption } from '../select/Select';
import { stackOptions, titleOptions } from '../../mocks/mockOptions';

type FormData = {
  title: string;
  name: string;
  email: string;
  stack: string[];
};

const initialFormValues: FormData = {
  title: '',
  name: '',
  email: '',
  stack: [],
};

const DeveloperForm = () => {
  const [formData, setFormData] = React.useState<FormData>(initialFormValues);
  const [selectedTitle, setSelectedTitle] = React.useState<
    SelectOption | undefined
  >(undefined);
  const [selectedStack, setSelectedStack] = React.useState<SelectOption[]>([]);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onTitleChange = (selected: SelectOption | undefined) => {
    setSelectedTitle(selected);
    setFormData((prevData) => ({
      ...prevData,
      title: (selected?.value as string) || '',
    }));
  };

  const onStackChange = (selected: SelectOption[]) => {
    setSelectedStack(selected);
    setFormData((prevData) => ({
      ...prevData,
      stack: selected.map((s) => s.value as string),
    }));
  };

  const resetForm = () => {
    setFormData(initialFormValues);
    setSelectedTitle(undefined);
    setSelectedStack([]);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    resetForm();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor='title' className={styles.label}>
          Title
        </label>
        <Select
          options={titleOptions}
          isMultiple={false}
          onChange={onTitleChange}
          placeholder='Select title'
          selected={selectedTitle}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='name' className={styles.label}>
          Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='John Doe'
          value={formData.name}
          onChange={onInputChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='email' className={styles.label}>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='example@example.com'
          value={formData.email}
          onChange={onInputChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor='stack' className={styles.label}>
          Stack
        </label>
        <Select
          options={stackOptions}
          isMultiple={true}
          onChange={onStackChange}
          placeholder='Select your stack'
          selected={selectedStack}
        />
      </div>
      <button type='submit' className={styles['submit-btn']}>
        Submit
      </button>
    </form>
  );
};

export default DeveloperForm;
