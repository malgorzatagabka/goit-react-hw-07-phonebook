import PropTypes from 'prop-types';
import style from './Contacts.module.css';
import { getFilterValue } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { useContactsQuery, useDeleteContactMutation } from 'redux/services/contactsApi';
import Loader from 'components/Loader/Loader';

export const ContactList = () => {
  const { data, isLoading } = useContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  const filterValue = useSelector(getFilterValue);
console.log(data)

  if (isLoading) {
    return <Loader/>;
  }

  if (!data) {
    return <div>No contacts</div>;
  }

  const filteredContacts = () => {
    const normalizedFilter = filterValue.toLowerCase();
    return (
      data &&
      data.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    );
  };

  const contactsFilter = filteredContacts();

  return (
    <div>
      <ul className={style.contactsList}>
        {contactsFilter.map(({ id, name, phone }) => (
          <li key={id} className={style.contactsItem}>
            <span className={style.contactsName}>{`${name}`}</span><span className={style.contactsPhone}>{`${phone}`}</span>
            <button
              type="button"
              className={style.contactBtn}
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
